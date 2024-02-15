import { Sizes } from '../database/models/models';
import { SizesOutput } from '../database/models/sizes';

async function getAllSizes(): Promise<SizesOutput[]> {
  try {
    return await Sizes.findAll();
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  getAllSizes
};
