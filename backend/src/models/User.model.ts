import {Schema, model, Model, HookNextFunction} from 'mongoose';
import bcrypt from 'bcryptjs';
import Config from '../config';
import { IUserDocument } from '../interfaces/User';

const userSchema: Schema = new Schema({
	email: {
		type: String,
		required: true,
		min: 5,
		max: 255,
	},
	password: {
		type: String,
		required: true,
		min: 1
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	privileges: {
		type: Number,
		default: 0
	}
});

userSchema.pre("save", async function (next: HookNextFunction) {
	console.log("presave");
	const user = this as IUserDocument;

	if(!user.isModified("password")) return next();

	const salt = await bcrypt.genSalt(Config.saltFactor);

	const hash = await bcrypt.hash(user.password, salt);

	user.password = hash;

	return next();
});

userSchema.methods.comparePassword = async function(password: string) {
	const user = this as IUserDocument;

	return await bcrypt.compare(password, user.password).catch((e)=>false);
}

export default model<IUserDocument>("users", userSchema);