import express, { Router } from 'express'; 
import controller from '../controllers/Sale.controller';
import checkId from '../middleware/checkId';
import verifyToken from '../middleware/verifyToken';
import privileges from '../middleware/privileges';

const router: Router = express.Router();

router.get('/', verifyToken, privileges.guest, controller.getSales);
router.post('/new', verifyToken, privileges.guest, controller.createSale);
router.get('/:id', verifyToken, checkId, privileges.guest, controller.getSaleById);
router.get('/:id/items', verifyToken, checkId, privileges.guest, controller.getSaleItemsById);
router.delete('/:id', verifyToken, checkId, privileges.admin, controller.deleteSaleById);

export default router;