import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DateTimeEntity } from './base/dateTimeEntity';
import { Theater } from './theater.entity';

@Entity('cities')
export class City extends DateTimeEntity {  //because the datetime is one of the normal thing when coding => ke thua
  @PrimaryGeneratedColumn()
    public id: string;

  @Column({ type: 'varchar', length: 255 })
    cityName: string;

  @OneToMany((type) => Theater, (theater) => theater.city)
  theaters: Theater[]
}