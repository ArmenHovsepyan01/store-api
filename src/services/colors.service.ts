import { Colors } from '../database/models/models';

async function getAllColors() {
  try {
    return await Colors.findAll();
  } catch (e) {
    throw new Error(e);
  }
}

async function createColor(color: string) {
  try {
    return await Colors.create({ color });
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteColor(id: number) {
  try {
    await Colors.destroy({
      where: {
        id
      }
    });

    return `Color with id ${id} successfully deleted.`;
  } catch (e) {
    throw new Error(e);
  }
}

async function getColorByName(color: string) {
  try {
    return await Colors.findAll({
      where: {
        color
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}
export default {
  getAllColors,
  deleteColor,
  createColor,
  getColorByName
};
