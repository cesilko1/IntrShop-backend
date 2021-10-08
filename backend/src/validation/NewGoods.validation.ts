import joi from 'joi';

const newGoodsValidation = (data: any) => {
	const schema = joi.object({
		name: joi.string()
			.min(1)
			.required(),
		sellPrice: joi.number()
			.min(0)
			.required(),
		buyPrice: joi.number()
			.min(0)
			.required(),
		inStock: joi.number()
			.min(0)
			.optional()
			.allow(''),
		lost: joi.number()
			.min(0)
			.optional()
			.allow(''),
		sold: joi.number()
			.min(0)
			.optional()
			.allow('')
	});

	return schema.validate(data);
}

export default newGoodsValidation;