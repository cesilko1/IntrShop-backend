import { Request, Response } from 'express';
import goods from '../models/Goods.model';
import newGoodsValidation from '../validation/NewGoods.validation';
import updateGoodsValidation from '../validation/UpdateGoods.validation';
import looseGoodsValidation from '../validation/LooseGoods.validation';
import buyNewValidation from '../validation/BuyNew.validation';


const getGoods = async (req: Request, res: Response) => {
	try {
		const selectedGoods = await goods.find();
		res.status(200).json(selectedGoods);
	}
	catch(error) {
		console.error(error);
		res.sendStatus(500);
	}
}

const addNewGoods = async (req: Request, res: Response) => {
	if(newGoodsValidation(req.body).error) return res.status(400).send('Nastala chyba při validaci dat.xxx');

	try {
		await new goods(req.body).save();
		res.status(201).send('Zboží úspěšně přidáno');
	}
	catch(error) {
		console.error(error);
		res.sendStatus(500);
	}
}

const updateGoodsById = async (req: Request, res: Response) => {
	if(updateGoodsValidation(req.body).error) return res.status(400).send('Nastala chyba při validaci dat.');

	try {
		await goods.findByIdAndUpdate(req.params.id, { $set: req.body });
		res.sendStatus(200);
	}
	catch(error) {
		console.error(error);
		res.sendStatus(500);
	}
}

const looseGoodsById = async (req: Request, res: Response) => {
	if(looseGoodsValidation(req.body).error) return res.status(400).send('Nastala chyba při validaci dat.');

	try {
		const item = await goods.findById(req.params.id);
		if(item && !(await item.lose(req.body.count))) return res.sendStatus(404);
		res.sendStatus(200);
	}
	catch(error) {
		console.error(error);
		res.sendStatus(500);
	}
}

const getGoodsById = async (req: Request, res: Response) => {
	try {
		const selectedGoods = await goods.findById(req.params.id);
		res.status(200).json(selectedGoods);
	}
	catch(error) {
		console.error(error);
		res.sendStatus(500);
	}
}

const buyNewById = async (req: Request, res: Response) => {
	if(buyNewValidation(req.body).error) return res.status(400).send('Nastala chyba při validaci dat.');

	try {
		const item = await goods.findById(req.params.id);
		if(!item) return res.sendStatus(404);
		await item.buyNew(req.body.count, req.body.price);
		res.status(200).send('Zboží bylo úspěšně doplněno');
	}
	catch(error) {
		console.error(error);
		res.sendStatus(500);
	}
}

const deleteGoodsById = async (req: Request, res: Response) => {
	try {
		await goods.findByIdAndDelete(req.params.id);
		res.status(200).send('Zboží úspěšně odstraněno');
	}
	catch(error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export default { addNewGoods, getGoodsById, updateGoodsById, deleteGoodsById, getGoods, looseGoodsById, buyNewById }