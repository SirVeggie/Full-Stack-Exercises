import mongoose from 'mongoose';
import { UserType } from 'shared';

export type User = UserType;

const userSchema = new mongoose.Schema<User>({
	username: String,
	name: String,
	passHash: String,
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog'
		}
	]
});

userSchema.set('toJSON', {
	transform: (doc, obj) => {
		obj.id = obj._id.toString();
		delete obj._id;
		delete obj.__v;
		delete obj.passHash;
	}
});

export const User = mongoose.model('User', userSchema);