import joi from 'joi';

const looseGoodsValidation = (data: any) => {
	const schema = joi.object({
		count: joi.number()
			.min(0)
			.required()
	});

	return schema.validate(data);
}

export default looseGoodsValidation;