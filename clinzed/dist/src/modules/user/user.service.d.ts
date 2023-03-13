import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Query } from 'typeorm/driver/Query';
import { UserSettingsService } from '../user-settings/user-settings.service';
import Stripe from 'stripe';
import { PayLoad } from '../auth/dto/payload.dto';
export declare class UsersService {
    private readonly usersRepository;
    private readonly userSettingsService;
    private readonly stripeClient;
    constructor(usersRepository: Repository<User>, userSettingsService: UserSettingsService, stripeClient: Stripe);
    create(createUserDto: CreateUserDto): Promise<User>;
    hashPassword(password: any): Promise<any>;
    updatePassword(user: User): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    loginAs(inhostVeiw: boolean, loginuser: User): Promise<void>;
    findOneFacebookId(facebookId: string): Promise<User>;
    comparePassword(enteredPassword: any, dbPassword: any): Promise<any>;
    findOneById(id: number): Promise<User>;
    findAll(queryParams: Query, user: PayLoad): Promise<any>;
    activateAccount(user: User): Promise<User>;
    findOne(id: number, loginUser: PayLoad): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto, loginUser: PayLoad): Promise<User>;
    remove(id: number, loginUser: PayLoad): Promise<User>;
    socialLogin(createUserInput: CreateUserDto): Promise<User>;
}
