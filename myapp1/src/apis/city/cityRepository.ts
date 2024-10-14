import { City } from '../../models/city.entity';
import dataSource from '../../config/typeorm.config';

export const cityRepository = dataSource.getRepository(City).extend({
  async findAllAsync(): Promise<any> {
    return await this.findOneBy({id: "1"});
  },
});
