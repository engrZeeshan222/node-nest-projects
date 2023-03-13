import { PHOTO_STATUS } from 'src/common/enum';
import { CarColor } from 'src/modules/car-color/entities/car-color.entity';
import { CustomerCar } from 'src/modules/customer-car/entities/customer-car.entity';
import { Property } from 'src/modules/property/entities/property.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: String, nullable: false })
  photoKey: string;
  @Column({ type: String, nullable: true })
  smallFilePath: string;
  @Column({ type: String, nullable: true })
  mediumFilePath: string;
  @Column({ type: String, nullable: true })
  largeFilePath: string;
  @Column({
    type: 'enum',
    enum: PHOTO_STATUS,
    default: PHOTO_STATUS.ACTIVE,
  })
  status: string;
  @Column({
    type: Boolean,
    default: false,
  })
  thumbnail: boolean;

  @ManyToOne(() => CarColor, (CarColor) => CarColor.photos, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  carColor: CarColor;
  @ManyToOne(() => Property, (property) => property.photos, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  property: Property;
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
