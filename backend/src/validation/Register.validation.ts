import joi from 'joi';

const registerValidation = (data: any) => {
	const schema = joi.object({
		email: joi.string()
			.min(5)
			.required(),
		password: joi.string()
			.min(1)
			.required(),
		privileges: joi.number()
			.optional()
	});

	return schema.validate(data);
}

export default registerValidation;