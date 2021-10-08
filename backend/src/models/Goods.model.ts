import { Schema, model } from 'mongoose';
import { IGoodsDocument, IGoodsModel } from '../interfaces/Goods';

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
	sold: {
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

goodsSchema.methods.checkStock = function(count: number): boolean {
	const goodsObject = this as IGoodsDocument;

	if(count > goodsObject.inStock) return false;
	return true;
}

goodsSchema.methods.sell = async function(count: number): Promise<boolean> {
	const goodsObject = this as IGoodsDocument;
	if(count > goodsObject.inStock) return false;
	
	goodsObject.inStock -= count;
	goodsObject.sold += count;
	
	return saveDocument(goodsObject);
}

goodsSchema.methods.lose = async function(count: number): Promise<boolean> {
	const goodsObject = this as IGoodsDocument;

	if(count > goodsObject.inStock) return false;

	goodsObject.inStock -= count;
	goodsObject.lost -= count;
	

	return saveDocument(goodsObject);
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