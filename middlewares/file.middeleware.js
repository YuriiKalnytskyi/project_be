const { ErrorHandler, statusCode, errorMess } = require('../errors');
const { filepEnum } = require('../constants');

function sortFile(mimetypesArr, maxSize, mimetype, filesArr, file, size, name) {
  if (mimetypesArr.includes(mimetype)) {
    if (size > maxSize) {
      throw new ErrorHandler(statusCode.DAD_REQUEST,
        errorMess.FILE_TOO_BIG.customCode, `${name}: ${errorMess.FILE_TOO_BIG.message}`);
    }
    filesArr.push(file);
  }
}

module.exports = {
  checkFiles: (req, res, next) => {
    try {
      if (!req.files) {
        next();
      } else {
        const files = Object.values(req.files);
        const photos = [];

        for (const file of files) {
          const {
            mimetype,
            size,
            name
          } = file;

          sortFile(filepEnum.PHOTOS_MIMETYPES, filepEnum.PHOTO_MAX_SIZE,
              mimetype, photos, file, size, name);
        }

        req.photos = photos;
        next();
      }
    } catch (e) {
      console.log('checkFiles', e);
      next(e);
    }
  },
  checkAvatar: (req, res, next) => {
    try {
      if (!req.photos) {
        return next();
      }
      if (req.photos.length > 1) {
        throw new ErrorHandler(statusCode.DAD_REQUEST,
          errorMess.AVATAR.customCode, errorMess.AVATAR.message);
      }
      const [avatar] = req.photos;
      req.avatar = avatar;
      next();
    } catch (e) {
      next(e);
    }
  }
};
