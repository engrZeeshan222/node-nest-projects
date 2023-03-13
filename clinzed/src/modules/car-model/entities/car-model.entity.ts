import { COMMON_STATUS } from 'src/common/enum';
import { CarColor } from 'src/modules/car-color/entities/car-color.entity';
import { CarMake } from 'src/modules/car-make/entities/car-make.entity';
import { CarYear } from 'src/modules/car-year/entities/car-year.entity';
import { CustomerCar } from 'src/modules/customer-car/entities/customer-car.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CarModel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: true })
  model: string;
  @Column({
    type: 'enum',
    enum: COMMON_STATUS,
    default: COMMON_STATUS.ACTIVE,
  })
  status: string;
  @ManyToOne(() => CarMake, (carMake) => carMake.carModels, {
    onDelete: 'SET NULL',
    nullable: false,
  })
  carMake: CarMake;
  @OneToMany(() => CarYear, (carYear) => carYear.carModel, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  carYears: CarYear[];
  @OneToMany(() => CarColor, (carColor) => carColor.carModel, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  carColors: CarColor[];
  @OneToMany(() => CustomerCar, (CustomerCar) => CustomerCar.carModel, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  customerCars: CustomerCar[];
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
