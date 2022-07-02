import mongoose from 'mongoose';

export type User = {
	username: string;
	name: string;
	passHash: string;
	blogs: string[];
};

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