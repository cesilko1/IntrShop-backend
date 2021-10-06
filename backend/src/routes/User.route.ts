import express, { Router } from 'express'; 
import controller from '../controllers/User.controller';
import verifyToken from '../middleware/verifyToken';

const router: Router = express.Router();

router.post('/login', controller.login);
router.post('/register', verifyToken, controller.register);
router.put('/email', verifyToken, controller.updateEmail);
router.put('/password', verifyToken, controller.updatePassword);
router.get('/', verifyToken, controller.getUserInfo);

export default router;
