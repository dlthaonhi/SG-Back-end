import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { DateTimeEntity } from './base/dateTimeEntity';
import { Ticket } from './ticket.entity';
import { City } from './city.entity';

@Entity('theaters')
export class Theater extends DateTimeEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({ type: 'varchar', length: 255 })
  theaterName: string;

  @Column('text')
  discribe: string;

  @OneToMany((type) => Ticket, (ticket) => ticket.theater)
  tickets: Ticket[]

  @ManyToOne((type) => City, (city) => city.theaters)
  city: City
}
