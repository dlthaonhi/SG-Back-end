import { Ticket } from '../../models/ticket.entity';
import dataSource from '../../config/typeorm.config';

export const ticketRepository = dataSource.getRepository(Ticket).extend({
  async findAllAsync(): Promise<Ticket[]> {
    return this.find();
  },
});
