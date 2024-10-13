import { Entity, PrimaryGeneratedColumn, Column, OneToOne, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DateTimeEntity } from './base/dateTimeEntity';
import { User } from './user.entity';
import { Ticket } from './ticket.entity';

@Entity('details')
export class Detail extends DateTimeEntity {
  
    @PrimaryColumn()
        userId: string

    @PrimaryColumn()
        ticketId: string

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ name: "userId" })
    public user!: User;

    @ManyToOne(type => Ticket, ticket => ticket.id)
    @JoinColumn({ name: "ticketId" })
    public ticket!: Ticket;
  
  
}
