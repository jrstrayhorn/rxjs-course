

export interface Course {
    id:number;
    description:string;
    iconUrl: string;
    courseListIcon: string;
    longDescription: string;
    category:string;
    lessonsCount:number;
}

export abstract class CourseCategory {
    public static advanced: string = "ADVANCED";
    public static beginner: string = "BEGINNER";
}
