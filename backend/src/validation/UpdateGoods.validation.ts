import joi from 'joi';

const updateGoodsValidation = (data: any) => {
	const schema = joi.object({
		name: joi.string()
			.min(1)
			.optional(),
		sellPrice: joi.number()
			.min(0)
			.optional(),
		buyPrice: joi.number()
			.min(0)
			.optional(),
		inStock: joi.number()
			.min(0)
			.optional(),
		lost: joi.number()
			.min(0)
			.optional(),
		sold: joi.number()
			.min(0)
			.optional(),
		bought: joi.number()
			.min(0)
			.optional()
	});

	return schema.validate(data);
}

export default updateGoodsValidation;