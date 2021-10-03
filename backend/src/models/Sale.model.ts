import { Schema, model } from 'mongoose';
import { ISalesDocument } from '../interfaces/Sales';

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

export default model<ISalesDocument>('sales', saleSchema);