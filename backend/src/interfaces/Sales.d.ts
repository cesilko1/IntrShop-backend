import mongoose from 'mongoose';

export default interface ISales {
	price: number;
	date: Date;
	card: boolean;
	items: ISaleItem[];
}

export interface ISaleItem {
	item: string;
	count: number;
	price?: number;
}

export interface ISalesDocument extends ISales, mongoose.Document {
	cancelSale(): Promise<string[]>;
}

export interface ISalesModel extends Model<ISalesDocument> {
	sellItems(items: ISaleItem[]): Promise<string[]>;
}

export interface ISellItemResponse {
	soldItems: string[];
	price: number;
}