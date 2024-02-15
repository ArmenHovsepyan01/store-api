import { Colors } from '../database/models/models';

async function getAllColors() {
  try {
    return await Colors.findAll();
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  getAllColors
};
