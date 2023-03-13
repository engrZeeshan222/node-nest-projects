import { Address } from 'src/modules/address/entities/address.entity';
import { Property } from 'src/modules/property/entities/property.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class InternalNote {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: String, nullable: false })
  messageBody: string;
  @OneToMany(() => Property, (property) => property.internalNote, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  property: Property[];
  @OneToMany(() => Address, (address) => address.internalNote, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  address: Address[];
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
