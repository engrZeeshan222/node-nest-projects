import { PROPERTY_STATUS } from 'src/common/enum';
import { Address } from 'src/modules/address/entities/address.entity';
import { ChargerProperty } from 'src/modules/charger-property/entities/charger-property.entity';
import { InternalNote } from 'src/modules/internal-note/entities/internal-note.entity';
import { Photo } from 'src/modules/photo/entities/photo.entity';
import { User } from 'src/modules/user/entities/user.entity';
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
export class Property {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: String, nullable: false })
  title: string;
  @Column({ type: String, nullable: true })
  description: string;
  @Column({ type: String, nullable: true })
  guestInstructions: string;
  @Column({ type: 'float', nullable: true })
  costPerMinute: number;
  @Column({ type: 'float', nullable: false })
  lengthInch: number;
  @Column({ type: 'float', nullable: false })
  heightInch: number;
  @Column({ type: 'float', nullable: false })
  widthInch: number;
  @Column({ type: Number, nullable: false })
  carCount: number;
  @OneToMany(
    () => ChargerProperty,
    (chargerProperty) => chargerProperty.property,
    {
      onDelete: 'CASCADE',
      nullable: true,
    },
  )
  chargerProperty: ChargerProperty[];
  @Column({
    type: 'enum',
    enum: PROPERTY_STATUS,
    default: PROPERTY_STATUS.LISTED,
  })
  status: string;
  @OneToMany(() => Photo, (photo) => photo.property, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  photos: Photo[];
  @ManyToOne(() => InternalNote, (InternalNote) => InternalNote.property, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  internalNote: InternalNote;
  @ManyToOne(() => Address, (address) => address.property, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  address: Address;
  @ManyToOne(() => User, (user) => user.Property, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  host: User;
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
