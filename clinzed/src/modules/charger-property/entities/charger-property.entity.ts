import { ChargerType } from 'src/modules/charger-type/entities/charger-type.entity';
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
export class ChargerProperty {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => ChargerType, (chargerType) => chargerType.chargerProperty, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  chargerType: ChargerType;
  @ManyToOne(() => Property, (property) => property.chargerProperty, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  property: Property;
  @Column({ nullable: false })
  quantity: number;
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
