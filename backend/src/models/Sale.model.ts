import { Schema, model } from 'mongoose';
import { ISalesDocument, ISalesModel, ISaleItem, ISellItemResponse } from '../interfaces/Sales';
import goodsModel from './Goods.model';

const saleSchema: Schema = new Schema({
	price: {
		type: Number,
		required: true,
		min: 0
	},
	date: {
		type: Date,
		default: Date.now
	},
	card: {
		type: Boolean,
		default: false
	},
	items: [{
		item: {
			type: Schema.Types.ObjectId,
			ref: 'goods',
			required: true
		},
		count: {
			type: Number,
			required: true
		},
		price: {
			type: Number,
			required: false
		}
	}]
});

saleSchema.statics.sellItems = async function(items: ISaleItem[]): Promise<ISellItemResponse> {
	const response: ISellItemResponse = {
		soldItems: [],
		price: 0
	}

	for(var i = 0; i < items.length; i+=1) {
		const itemForSale = await goodsModel.findById(items[i].item);
		if(itemForSale && !itemForSale.checkStock(items[i].count)) response.soldItems.push(items[i].item);
	}

	if(response.soldItems.length !== 0) return response;

	for(var j = 0; j < items.length; j+=1) {
		const itemForSale = await goodsModel.findById(items[j].item);

		if(itemForSale) {
			await itemForSale.sell(items[j].count);

			response.price += (items[j].price || itemForSale.sellPrice) * items[j].count;
		}
	}

	return response;
}

export default model<ISalesDocument, ISalesModel>('sales', saleSchema);