import joi from 'joi';

const buyNewValidation = (data: any) => {
	const schema = joi.object({
		count: joi.number()
			.min(1)
			.required(),
		price: joi.number()
			.min(0)
			.required()
	});

	return schema.validate(data);
}

export default buyNewValidation;