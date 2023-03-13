import { COMMON_STATUS } from 'src/common/enum';
import { CarModel } from 'src/modules/car-model/entities/car-model.entity';
import { Color } from 'src/modules/color/entities/color.entity';
import { CustomerCar } from 'src/modules/customer-car/entities/customer-car.entity';
import { Photo } from 'src/modules/photo/entities/photo.entity';
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
export class CarColor {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Color, (Color) => Color.carColors, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  color: Color;
  @ManyToOne(() => CarModel, (carModel) => carModel.carYears, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  carModel: CarModel;
  @OneToMany(() => CustomerCar, (CustomerCar) => CustomerCar.carColor, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  customerCars: CustomerCar[];
  @OneToMany(() => Photo, (photo) => photo.carColor, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  photos: Photo[];
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
