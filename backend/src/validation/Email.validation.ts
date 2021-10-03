import validate from 'deep-email-validator-extended';

const emailValidation = async (email: string) => {
	return await validate({
		email: email,
		validateRegex: true,
		validateMx: true,
		validateDisposable: true,
		validateTypo: true,
		validateSMTP: false
	});
}

export default emailValidation;