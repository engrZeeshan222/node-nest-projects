import { COMMON_STATUS } from 'src/common/enum';
import { CarModel } from 'src/modules/car-model/entities/car-model.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CarMake {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: true })
  make: string;
  @OneToMany(() => CarModel, (carModel) => carModel.carMake, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  carModels: CarModel[];
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
