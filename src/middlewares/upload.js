const multer = require('multer');
const util = require('util');

const storage = multer.diskStorage({
  destination: (requset, file, callback) => {
    callback(null, './src/uploads/images');
  },

  filename: (requset, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadFiles = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  // eslint-disable-next-line consistent-return
  fileFilter: (requset, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
}).single('avatar');

const uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;
