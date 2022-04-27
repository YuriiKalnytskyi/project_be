const router = require('express').Router();

const {
  authController: {
    register, login, getUserByID, refreshToken, logout, update
  }
} = require('../controllers');
const {
  fileMiddleware: { checkFiles, checkAvatar },
  userMiddleware: { registerMiddleware, loginMiddleware, updateMiddleware },
  idMiddleware: { idValid },
  authMiddleware: { checkAccessToken, checkRefreshToken }

} = require('../middlewares');

router.post('/login', loginMiddleware, login);
router.post('/refresh', checkRefreshToken, refreshToken);
router.post('/logout', checkAccessToken, logout);

router.post('/register', registerMiddleware, checkFiles, checkAvatar, register);
router.get('/:userId', idValid, getUserByID);
router.put('/update', checkAccessToken, checkFiles, checkAvatar, updateMiddleware, update);

module.exports = router;
