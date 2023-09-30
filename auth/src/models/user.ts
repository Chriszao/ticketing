import mongoose from 'mongoose';
import { Password } from '../services';

/**
 * An interface that describes the properties
 * that are required to create a new User
 */
interface UserAttributes {
	email: string;
	password: string;
}

/**
 * Interface that describes the properties
 * that a User Document has
 */
interface UserDocument extends mongoose.Document {
	email: string;
	password: string;
}

/**
 * An interface that describes the properties
 * that a User Model has
 */
interface UserModel extends mongoose.Model<UserDocument> {
	build(attributes: UserAttributes): UserDocument;
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

userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}

	done();
});

userSchema.statics.build = (attributes: UserAttributes) => new User(attributes);

export const User = mongoose.model<UserDocument, UserModel>('User', userSchema);
