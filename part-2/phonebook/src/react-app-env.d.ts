/// <reference types="react-scripts" />

interface Prop<Type> {
	data: Type;
}

interface Person {
	id: number;
	name: string;
	number: string;
}

interface Alert {
	type: 'success' | 'error';
	msg: string;
}