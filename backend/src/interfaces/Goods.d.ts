import mongoose, { Model } from 'mongoose';
import { ISaleItem } from './Sales';

export default interface IGoods {
	name: string;
	sellPrice: number;
	buyPrice: number;
	inStock: number;
	lost: number;
	sold: number;
	bought: number;
}

export interface IGoodsDocument extends IGoods, mongoose.Document {
	sell(count: number): Promise<boolean>;
	lose(count: number): Promise<boolean>;
	checkStock(count: number): boolean;
	buyNew(count: number, price: number): Promise<boolean>;
	cancelSell(count: number): Promise<boolean>;
}

export interface IGoodsModel extends Model<IGoodsDocument> { }