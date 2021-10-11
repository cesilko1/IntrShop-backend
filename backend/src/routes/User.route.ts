import express, { Router } from 'express'; 
import controller from '../controllers/User.controller';
import verifyToken from '../middleware/verifyToken';
import privileges from '../middleware/privileges';

const router: Router = express.Router();

router.post('/login', controller.login);
router.post('/register', verifyToken, controller.register);
router.put('/email', verifyToken, controller.updateEmail);
router.put('/password', verifyToken, controller.updatePassword);
router.get('/', verifyToken, controller.getUserInfo);
router.get('/users', verifyToken, privileges.admin, controller.getUsers);

export default router;
