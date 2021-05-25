/// <reference types="react-scripts" />

interface Course {
	id: number;
	name: string;
	parts: Part[];
}

interface Part {
	id: number;
	name: string;
	exercises: number;
}

interface Prop<Type> {
	data: Type;
}