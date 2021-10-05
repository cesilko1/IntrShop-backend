import express, { Router } from 'express';
import controller from '../controllers/Goods.controller';
import checkId from '../middleware/checkId';

const router: Router = express.Router();

router.get('/', controller.getGoods);
router.post('/new', controller.addNewGoods);
router.get('/:id', checkId, controller.getGoodsById);
router.put('/:id', checkId, controller.updateGoodsById);
router.delete('/:id', checkId, controller.deleteGoodsById);

export default router;