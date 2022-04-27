const { ErrorHandler, statusCode, errorMess } = require('../errors');
const { idValidator } = require('../validators');
const { USER } = require('../dataBase');

module.exports = {
  idValid: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { error } = await idValidator.id.validate(userId);
      const user = await USER.findById({ _id: userId });

      if (error) {
        throw new ErrorHandler(statusCode.NOT_FOUND, error.details[0].message, errorMess.RECORD_NOT_FOUND);
      }
      if (!user) {
        throw new ErrorHandler(statusCode.NOT_FOUND, errorMess.RECORD_NOT_FOUND);
      }
      req.user = user;
      // res.json(user);
      next();
    } catch (e) {
      next(e);
    }
  }
};
