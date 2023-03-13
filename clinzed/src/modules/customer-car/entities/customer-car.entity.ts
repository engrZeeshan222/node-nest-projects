import { CUSTOMER_CAR_STATUS } from 'src/common/enum';
import { CarColor } from 'src/modules/car-color/entities/car-color.entity';
import { CarModel } from 'src/modules/car-model/entities/car-model.entity';
import { CarYear } from 'src/modules/car-year/entities/car-year.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CustomerCar {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  title: string;
  @Column({ nullable: true })
  licensePlate: string;
  @Column({
    type: 'enum',
    enum: CUSTOMER_CAR_STATUS,
    default: CUSTOMER_CAR_STATUS.ACTIVE,
  })
  status: string;
  @ManyToOne(() => User, (user) => user.customerCar, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  user: User;
  @ManyToOne(() => CarModel, (CarModel) => CarModel.customerCars, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  carModel: CarModel;
  @ManyToOne(() => CarColor, (carColor) => carColor.customerCars, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  carColor: CarColor;
  @ManyToOne(() => CarYear, (carYear) => carYear.customerCars, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  carYear: CarYear;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
