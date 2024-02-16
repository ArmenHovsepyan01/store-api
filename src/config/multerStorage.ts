import path from 'node:path';
import multer from 'multer';

const imagesFolderPath = path.resolve(__dirname, '../../public/images');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesFolderPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${new Date().toISOString().replace(/[-:.]/g, '')}${file.originalname}`);
  }
});

export default storage;
