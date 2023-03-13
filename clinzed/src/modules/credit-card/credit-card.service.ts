import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectStripe } from 'nestjs-stripe';
import { CARD_STATUS, Role } from 'src/common/enum';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { User } from '../user/entities/user.entity';
import apiFeatures from '../utils/apiFeatures';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { CreditCard } from './entities/credit-card.entity';
const relationsArray = ['user'];

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(CreditCard)
    private readonly creditCardRepository: Repository<CreditCard>,
    @InjectStripe() private readonly stripeClient: Stripe,
  ) {}
  async create(
    createCreditCardDto: CreateCreditCardDto,
    loginUser: User,
  ): Promise<CreditCard> {
    try {
      const allCreditCardOfUser = await this.creditCardRepository.find({
        where: { user: loginUser },
      });
      if (allCreditCardOfUser.length == 0) {
        createCreditCardDto.isDefault = true;
      }
      let creditCard = this.creditCardRepository.create(createCreditCardDto);
      creditCard.user = loginUser;
      const card = await this.stripeClient.customers.createSource(
        loginUser.stripeAccountId,
        { source: createCreditCardDto.token },
      );
      creditCard.stripeCardId = card.id;
      creditCard = await this.creditCardRepository.save(creditCard);
      return creditCard;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(queryParams: Query, user: User): Promise<CreditCard[]> {
    try {
      const apiData = new apiFeatures(this.creditCardRepository, queryParams);
      apiData.paginate().includeFields(relationsArray);
      const filterData = apiData.filters(queryParams);

      if (user.role != Role.ADMIN) {
        filterData['status'] = CARD_STATUS.ACTIVE;
      }
      if (Object.keys(filterData).length > 0) {
        const where = [filterData];

        apiData.where(where);
      }
      const cars = await apiData.query();
      return cars;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number): Promise<CreditCard> {
    try {
      const creditCard = await this.creditCardRepository.findOne({
        where: { id: id },
        relations: relationsArray,
      });
      if (creditCard.status === CARD_STATUS.DELETED) {
        throw new HttpException('CARD IS DELETED', HttpStatus.FORBIDDEN);
      }
      return creditCard;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async defaultCard(id: number, loginUser: User): Promise<CreditCard> {
    try {
      let creditCard = await this.findOne(id);
      if (creditCard.status === CARD_STATUS.DELETED) {
        throw new HttpException('CARD IS DELETED', HttpStatus.FORBIDDEN);
      }
      if (creditCard.user.id == loginUser.id) {
        let alreadyDefaultCreditCard = await this.creditCardRepository.findOne({
          where: {
            user: loginUser,
            isDefault: true,
          },
        });
        if (alreadyDefaultCreditCard) {
          alreadyDefaultCreditCard.isDefault = false;
          alreadyDefaultCreditCard = await this.creditCardRepository.save({
            ...alreadyDefaultCreditCard,
          });
        }
        creditCard.isDefault = true;
        creditCard = await this.creditCardRepository.save({
          ...creditCard,
        });
        return creditCard;
      } else {
        throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number, loginUser: User): Promise<CreditCard> {
    try {
      let creditCard = await this.findOne(id);
      if (creditCard.user.id == loginUser.id) {
        creditCard.status = CARD_STATUS.DELETED;
        creditCard = await this.creditCardRepository.save({
          ...creditCard,
        });

        // as well as delete stripe card
        await this.stripeClient.customers.deleteSource(
          loginUser.stripeAccountId,
          creditCard.stripeCardId,
        );
        return creditCard;
      } else {
        throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
