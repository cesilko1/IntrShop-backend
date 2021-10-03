import { Request, Response } from 'express';
import sale from '../models/Sale.model';
import goods from '../models/Goods.model';
import newSaleValidation from '../validation/NewSale.validation'; 

const createSale = async (req: Request, res: Response) => {
	if(newSaleValidation(req.body).error) return res.status(400).send('Nastala chyba při validaci dat.');

	const errorItems = await goods.sellItems(req.body.items);
	console.log(errorItems);
	res.sendStatus(200);
}

const deleteSaleById = async (req: Request, res: Response) => {
	try {
		await sale.findByIdAndDelete(req.params.id);
		res.sendStatus(200);
	}
	catch(error) {
		console.error(error);
		res.sendStatus(500);
	}
}

export default { createSale, deleteSaleById }