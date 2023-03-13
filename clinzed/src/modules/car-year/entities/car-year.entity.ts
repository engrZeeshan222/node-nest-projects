import { COMMON_STATUS } from 'src/common/enum';
import { CarModel } from 'src/modules/car-model/entities/car-model.entity';
import { ChargerType } from 'src/modules/charger-type/entities/charger-type.entity';
import { CustomerCar } from 'src/modules/customer-car/entities/customer-car.entity';
import { YearChargerType } from 'src/modules/year-charger-type/entities/year-charger-type.entity';
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
export class CarYear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  year: string;
  @ManyToOne(() => CarModel, (carModel) => carModel.carYears, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  carModel: CarModel;

  @OneToMany(() => CustomerCar, (CustomerCar) => CustomerCar.carYear, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  customerCars: CustomerCar[];
  @OneToMany(
    () => YearChargerType,
    (yearChargerType) => yearChargerType.carYear,
    {
      onDelete: 'CASCADE',
      nullable: true,
    },
  )
  yearChargerTypes: YearChargerType[];
  @Column({
    type: 'enum',
    enum: COMMON_STATUS,
    default: COMMON_STATUS.ACTIVE,
  })
  status: string;

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
