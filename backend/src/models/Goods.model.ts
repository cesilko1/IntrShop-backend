import { boolean } from 'joi';
import { Schema, model } from 'mongoose';
import { IGoodsDocument, IGoodsModel } from '../interfaces/Goods';
import { ISaleItem } from '../interfaces/Sales';

const goodsSchema = new Schema({
	name: {
		type: String,
		required: true,
		min: 1,
		max: 1000
	},
	sellPrice: {
		type: Number,
		required: true,
		min: 0
	},
	buyPrice: {
		type: Number,
		required: true,
		min: 0
	},
	inStock: {
		type: Number,
		required: true,
		min: 0
	},
	lost: {
		type: Number,
		required: false,
		min: 0
	}
});

goodsSchema.methods.sell = async function(count: number): Promise<boolean> {
	const goodsObject = this as IGoodsDocument;

	console.log("inStock: "+goodsObject.inStock);
	console.log("for sale: "+count);

	if(count > goodsObject.inStock) {console.log("x"); return false;}

	goodsObject.inStock -= count;

	return saveDocument(goodsObject);
}

goodsSchema.methods.lose = async function(count: number): Promise<boolean> {
	const goodsObject = this as IGoodsDocument;

	if(count > goodsObject.lost) return false;

	goodsObject.lost -= count;

	return saveDocument(goodsObject);
}

goodsSchema.statics.sellItems = async function(items: ISaleItem[]): Promise<string[]> {
	const goodsModel = this;
	const errorItems: string[] = [];

	for(var i = 0; i < items.length; i+=1) {
		const itemsForSale = await goodsModel.findById(items[i].item);

		if(!(await itemsForSale.sell(items[i].count))) errorItems.push(items[i].item);
	}

	return errorItems;
}

const saveDocument = async (document: IGoodsDocument): Promise<boolean> => {
	try {
		await document.save();
		return true;
	}
	catch(error) {
		console.error(error);
		return false;
	}
}

export default model<IGoodsDocument, IGoodsModel>('goods', goodsSchema);