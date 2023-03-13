import { InternalNote } from 'src/modules/internal-note/entities/internal-note.entity';
import { Property } from 'src/modules/property/entities/property.entity';
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
export class Address {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: false })
  address: string;
  @Column({ nullable: false, unique: false })
  city: string;
  @Column({ nullable: false, unique: false })
  state: string;
  @Column({ nullable: false, unique: false })
  zip: string;
  @ManyToOne(() => InternalNote, (InternalNote) => InternalNote.address, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  internalNote: InternalNote;
  @OneToMany(() => Property, (property) => property.address, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  property: Property[];
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
