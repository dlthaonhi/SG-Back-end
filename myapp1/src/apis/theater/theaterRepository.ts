import { Theater } from '../../models/theater.entity';
import dataSource from '../../config/typeorm.config';

export const theaterRepository = dataSource.getRepository(Theater).extend({
  async findAllAsync(): Promise<Theater[]> {
    return this.find();
  },
});
