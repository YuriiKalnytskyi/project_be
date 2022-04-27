const jwt = require('jsonwebtoken');

const { constant: { AUTHORIZATION, REFRESH, REFRESH_TOKEN_SECRET } } = require('../constants');
const { ErrorHandler, errorMess: { NO_TOKEN, WRONG_TOKEN }, statusCode } = require('../errors');
const { OAuth } = require('../dataBase');

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, 'You must send a token to access this page', NO_TOKEN.customCode);
      }

      // тут має бути accessToken але поки  не налаштований токенінтерсептор
      const tokenExist = await OAuth.findOne({ refreshToken: token });

      if (!tokenExist) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, 'Token not valid!', WRONG_TOKEN.code);
      }

      // тут має бути accessToken але поки  не налаштований токенінтерсептор
      // await authHelpers.verifyToken(token, REFRESH);
      await jwt.verify(token, REFRESH_TOKEN_SECRET, (error) => {
        if (error) {
          throw new ErrorHandler(statusCode.UNAUTHORIZED, 'Token not valid!', WRONG_TOKEN.customCode);
        }
      });

      req.access_token = token;
      req.user = tokenExist.user;
      next();
    } catch (e) {
      console.log('11111111111', e);
      next(e);
    }
  },
  checkRefreshToken: async (req, res, next) => {
    try {
      console.log(req.body);
      let { token } = req.body;

      if (!token) {
        token = req.get(AUTHORIZATION);
        console.log(token);
        if (!token) {
          throw new ErrorHandler(statusCode.FORBIDDEN, 'Token not valid!', NO_TOKEN.customCode);
        }
      }

      const tokenExist = await OAuth.findOne({ refreshToken: token });

      if (!tokenExist) {
        throw new ErrorHandler(statusCode.FORBIDDEN, 'Token not valid!', WRONG_TOKEN.customCode);
      }

      jwt.verify(token, REFRESH_TOKEN_SECRET, (error) => {
        if (error) {
          throw new ErrorHandler(statusCode.UNAUTHORIZED, 'Token not valid!', WRONG_TOKEN.customCode,);
        }
      });

      req.user = tokenExist.user;
      req.refresh_token = token;
      next();
    } catch (e) {
      next(e);
    }
  }

};
