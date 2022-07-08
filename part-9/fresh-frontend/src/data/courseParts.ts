import { CoursePart } from '../types/CoursePart';

export const courseParts: CoursePart[] = [
    {
        name: 'Fundamentals',
        type: 'normal',
        exerciseCount: 10,
        description: 'This is the leisured course part',
    },
    {
        name: 'Advanced',
        type: 'normal',
        exerciseCount: 7,
        description: 'This is the advanced course part',
    },
    {
        name: 'Using props to pass data',
        type: 'groupProject',
        exerciseCount: 7,
        groupProjectCount: 3,
    },
    {
        name: 'Deeper type usage',
        type: 'submission',
        exerciseCount: 14,
        exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
        description: 'Confusing description',
    },
    {
        name: 'Backend development',
        type: 'special',
        exerciseCount: 21,
        description: 'Typing the backend',
        requirements: ['nodejs', 'jest']
    }
];
