import joi from 'joi';

const ChangePasswordValidation = (data: {password: string, new_password: string}) => {
	const schema = joi.object({
		password: joi.string()
			.min(1)
			.required(),
		new_password: joi.string()
			.min(1)
			.required()
	});

	return schema.validate(data);
}

export default ChangePasswordValidation;