import joi from "joi";

const newSaleValidation = (data: any) => {
	const schema = joi.object({
		card: joi.boolean()
			.optional(),
		items: joi.array().min(1).items(joi.object({
			item: joi.string()
				.length(24)
				.required(),
			count: joi.number()
				.required()
				.min(1),
			price: joi.number()
				.min(0)
				.optional()
		})
		)
	});

	return schema.validate(data);
}

export default newSaleValidation;