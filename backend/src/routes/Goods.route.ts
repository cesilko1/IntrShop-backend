import express, { Router } from 'express';
import controller from '../controllers/Goods.controller';
import checkId from '../middleware/checkId';
import verifyToken from '../middleware/verifyToken';
import privileges from '../middleware/privileges';

const router: Router = express.Router();

router.get('/', verifyToken, privileges.guest, controller.getGoods);
router.post('/new', verifyToken, privileges.admin, controller.addNewGoods);
router.put('/:id/loose', verifyToken, privileges.guest, controller.looseGoodsById);
router.put('/:id/buy', verifyToken, privileges.admin, controller.buyNewById);
router.get('/:id', verifyToken, checkId, controller.getGoodsById);
router.put('/:id', verifyToken, checkId, privileges.admin, controller.updateGoodsById);
router.delete('/:id', verifyToken, checkId, privileges.admin, controller.deleteGoodsById);

export default router;