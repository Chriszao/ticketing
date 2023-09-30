import mongoose from 'mongoose';

/**
 * An interface that describes the properties
 * that are required to create a new User
 */
interface UserAttributes {
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

export const User = mongoose.model('User', userSchema);

export function buildUser(attributes: UserAttributes) {
	return new User(attributes);
}
