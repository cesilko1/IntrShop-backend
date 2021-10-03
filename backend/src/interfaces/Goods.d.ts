import mongoose, { Model } from 'mongoose';
import { ISaleItem } from './Sales';

export default interface IGoods {
	name: string;
	sellPrice: number;
	buyPrice: number;
	inStock: number;
	lost: number;
}

export interface IGoodsDocument extends IGoods, mongoose.Document {
	sell(count: number): Promise<boolean>;
	lose(count: number): Promise<boolean>;
	checkStock(count: number): boolean;
}

export interface IGoodsModel extends Model<IGoodsDocument> { }