const { passwordHesher } = require('../helpers');
const { errorMess: { USER_EMAIL, USER_NOT_FOUND, }, ErrorHandler, statusCode } = require('../errors');
const { USER } = require('../dataBase');
const { userValidator } = require('../validators');

module.exports = {
  registerMiddleware: async (req, res, next) => {
    try {
      const { email } = req.body;
      console.log(req.body);

      const user = await USER.findOne({ email });

      const { error } = userValidator.createUser.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCode.CONFLICT, error.details[0].message, USER_EMAIL.code);
      }

      if (user) {
        throw new ErrorHandler(statusCode.CONFLICT, USER_EMAIL.message, USER_EMAIL.code);
      }

      const userObject = { ...req.body };
      req.user = userObject;
      next();
    } catch (e) {
      next(e);
    }
  },
  loginMiddleware: async (req, res, next) => {
    try {
      const { email } = req.body;

      const { error } = userValidator.login.validate(req.body);

      const newUser = await USER.findOne({ email });

      if (error) {
        throw new ErrorHandler(statusCode.CONFLICT, error.details[0].message, USER_EMAIL.code);
      }

      if (!newUser) {
        throw new ErrorHandler(statusCode.NOT_FOUND, USER_NOT_FOUND.message, USER_NOT_FOUND.code);
      }

      req.user = newUser;
      next();
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  updateMiddleware: async (req, res, next) => {
    try {
      const {
        user, body, body: {
          password, new_password, name, firstname, age, gender, phone
        },
        avatar
      } = req;
      if (new_password !== '') {
        const { error } = userValidator.password.validate({ password, new_password });
        if (error) {
          throw new ErrorHandler(statusCode.CONFLICT, error.details[0].message, USER_EMAIL.code);
        }
        await passwordHesher.compare(password, user.password);
        const newPs = await passwordHesher.hash(new_password);
        req.body = {
          ...body,
          password: newPs,
        };
      }
      const newUser = {
        name: name || user.name,
        firstname: firstname || user.firstname,
        age: age || user.age,
        gender: gender || user.gender,
        phone: phone || user.phone,
        password: req.body.password || user.password,
        email: user.email
      };

      const { error } = userValidator.updateUser.validate(newUser);
      if (error) {
        throw new ErrorHandler(statusCode.CONFLICT, error.details[0].message, USER_EMAIL.code);
      }
      req.user = user;
      req.avatar = avatar;
      req.newUser = newUser;
      next();
    } catch (e) {
      console.log('error', e);
      next(e);
    }
  }
};
