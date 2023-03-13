import { CarYear } from 'src/modules/car-year/entities/car-year.entity';
import { ChargerType } from 'src/modules/charger-type/entities/charger-type.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class YearChargerType {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => CarYear, (carYear) => carYear.yearChargerTypes, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  carYear: CarYear;
  @ManyToOne(() => ChargerType, (chargerType) => chargerType.yearChargerTypes, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  chargerType: ChargerType;
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
