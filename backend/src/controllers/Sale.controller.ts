import { Request, Response } from 'express';
import { ISellItemResponse } from '../interfaces/Sales';
import sale from '../models/Sale.model';
import goods from '../models/Goods.model';
import newSaleValidation from '../validation/NewSale.validation';

const createSale = async (req: Request, res: Response) => {
	if(newSaleValidation(req.body).error) return res.status(400).send('Nastala chyba při validaci dat.');

	// @ts-ignore
	const salesStatus: ISellItemResponse = await sale.sellItems(req.body.items);

	if(salesStatus.soldItems.length > 0) return res.status(410).json(salesStatus.soldItems);
	
	try {
		await new sale({price: salesStatus.price, ...req.body}).save();
		res.status(201).send('Nákup úspěšně proveden');
	}
	catch(error) {
		console.error(error);
		res.sendStatus(500);
	}
}

const getSales = async (req: Request, res: Response) => {
	try {
		const selectedSales = await sale.find();
		res.status(200).json(selectedSales);
	}
	catch(error) {
		console.error(error);
		res.sendStatus(500);
	}
}

const getSaleById = async (req: Request, res: Response) => {
	try {
		const selectedSale = await sale.findById(req.params.id);
		res.status(200).json(selectedSale);
	}
	catch(error) {
		console.error(error);
		res.sendStatus(500);
	}
}

const getSaleItemsById = async (req: Request, res: Response) => {
	const soldItems = [];

	try {
		const selectedSale = await sale.findById(req.params.id);

		if(!selectedSale) return res.sendStatus(404);

		for(var i = 0; i < selectedSale.items.length; i+=1) {
			const selectedGoods = await goods.findById(selectedSale.items[i].item);

			if(!selectedGoods) continue;

			const price = selectedSale.items[i].price || selectedGoods.sellPrice;

			soldItems.push({goods: selectedGoods, price: price, count: selectedSale.items[i].count});
		}
		res.status(200).json(soldItems);
	}
	catch(error) {
		console.error(error);
		res.sendStatus(500);
	}
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

export default { createSale, deleteSaleById, getSaleById, getSaleItemsById, getSales }