import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DateTimeEntity } from './base/dateTimeEntity';

@Entity('users')
export class User extends DateTimeEntity {  //because the datetime is one of the normal thing when coding => ke thua
  @PrimaryGeneratedColumn()
    public id: string;

  @Column({ type: 'varchar', unique: true, length: 255 })
    username: string;

  @Column()
    password: string;

  @Column()
    email: string;
}