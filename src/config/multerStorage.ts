import path from 'node:path';
import multer from 'multer';
import fs from 'fs';
import * as crypto from 'crypto';

const imagesFolderPath = path.resolve(__dirname, '../../public/images');

const checkFolderExistense = async () => {
  try {
    const exists = fs.existsSync(imagesFolderPath);
    if (!exists) {
      await fs.promises.mkdir(path.resolve('public'));
      await fs.promises.mkdir(path.resolve('public/images'));
    }
  } catch (error) {
    throw new Error(error);
  }
};

(async () => {
  try {
    await checkFolderExistense();
  } catch (error) {
    console.error(error);
  }
})();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesFolderPath);
  },
  filename: function (req, file, cb) {
    const randomFileName = crypto.randomBytes(7).toString('hex') + path.extname(file.originalname);
    cb(null, `${randomFileName}`);
  }
});

export default storage;
