/// <reference types="react-scripts" />

interface Prop<Type> {
	data: Type;
}

interface Statistic {
	text: string;
	value: string;
}

interface Button {
	text: string;
	func: () => void;
}