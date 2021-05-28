/// <reference types="react-scripts" />

interface Prop<Type> {
	data: Type;
}

interface Person {
	id: string;
	name: string;
	number: string;
}

interface Alert {
	type: 'success' | 'error';
	msg: string;
}