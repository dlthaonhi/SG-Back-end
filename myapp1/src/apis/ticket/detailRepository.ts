import { Detail } from '../../models/detail.entity';
import dataSource from '../../config/typeorm.config';

export const detailRepository = dataSource.getRepository(Detail).extend({
  async findAllAsync(): Promise<Detail[]> {
    return this.find();
  },
});
