import joi from 'joi';

const loginValidation = (data: {email: string, password: string}) => {
	const schema = joi.object({
		email: joi.string()
			.min(5)
			.required(),
		password: joi.string()
			.min(1)
			.required()
	});

	return schema.validate(data);
}

export default loginValidation;