import { COMMON_STATUS } from 'src/common/enum';
import { ChargerProperty } from 'src/modules/charger-property/entities/charger-property.entity';
import { YearChargerType } from 'src/modules/year-charger-type/entities/year-charger-type.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ChargerType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  title: string;

  @OneToMany(
    () => YearChargerType,
    (yearChargerType) => yearChargerType.chargerType,
    {
      onDelete: 'CASCADE',
      nullable: true,
    },
  )
  yearChargerTypes: YearChargerType[];
  @OneToMany(
    () => ChargerProperty,
    (chargerProperty) => chargerProperty.chargerType,
    {
      onDelete: 'CASCADE',
      nullable: true,
    },
  )
  chargerProperty: ChargerProperty[];

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
