import joi from "joi";

const newSaleValidation = (data: any) => {
	const schema = joi.object({
		price: joi.number()
			.min(0)
			.optional(),
		card: joi.boolean()
			.optional(),
		items: joi.array().items(joi.object({
			item: joi.string()
				.length(24)
				.required(),
			count: joi.number()
				.required()
				.min(1),
			price: joi.number()
				.min(0)
				.optional()
		}))
	});

	return schema.validate(data);
}

export default newSaleValidation;