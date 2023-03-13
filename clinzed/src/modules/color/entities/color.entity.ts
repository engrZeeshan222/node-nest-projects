import { CarColor } from 'src/modules/car-color/entities/car-color.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: true })
  color: string;
  @OneToMany(() => CarColor, (carColor) => carColor.color, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  carColors: CarColor[];
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
