import { Sizes } from '../database/models/models';
import { SizesOutput } from '../database/models/sizes';

async function getAllSizes(): Promise<SizesOutput[]> {
  try {
    return await Sizes.findAll();
  } catch (e) {
    throw new Error(e);
  }
}

async function createSize(size: string) {
  try {
    return await Sizes.create({ size });
  } catch (e) {
    throw new Error(e.message);
  }
}

async function deleteSize(id: number) {
  try {
    await Sizes.destroy({
      where: {
        id
      }
    });

    return `Size with id ${id} deleted successfully.`;
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  getAllSizes,
  createSize,
  deleteSize
};
