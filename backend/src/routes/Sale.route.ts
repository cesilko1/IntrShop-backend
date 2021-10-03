import express, { Router } from 'express'; 
import controller from '../controllers/Sale.controller';
import checkId from '../middleware/checkId';

const router: Router = express.Router();

router.post('/new', controller.createSale);
router.delete('/:id', checkId, controller.deleteSaleById);	

export default router;