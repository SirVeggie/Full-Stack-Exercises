
export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

export interface CoursePartDescriptionBase extends CoursePartBase {
    description: string;
}

export interface CourseNormalPart extends CoursePartDescriptionBase {
    type: 'normal';
}

export interface CourseProjectPart extends CoursePartBase {
    type: 'groupProject';
    groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartDescriptionBase {
    type: 'submission';
    exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CoursePartDescriptionBase {
    type: 'special';
    requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;