import coursesData from "./courses.js";
import modulesData from "./modules.js"; 
import enrollmentData from "./enrollments.js";
import userData from "./users.js";
import assignmentData from "./assignments.js";

export interface Enrollment {
    _id: string;
    user: string;
    course: string;
}

export interface User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    role: string;
    loginId: string;
    section: string;
    lastActivity: string;
    totalActivity: string;
}

export interface Assignment {
    asn_id: string;
    name: string;
    description: string;
    points: number;
    group: string;
    gradeDisplay: string;
    submissionType: string;
    dueDate: string;
    availableFrom: string;
    availableUntil: string;
    course: string;
  }

export interface AssignmentsState {
    assignments: Assignment[];
}

export interface Course {
    image?: string;
    course_id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    department: string;
    credits: number;
    description: string;
}

// Type assertions
export const modules = modulesData;
export const enrollment = enrollmentData as unknown as Enrollment[];
export const user = userData as User[];
export const assignments = assignmentData as unknown as Assignment[];
export const courses = coursesData as unknown as Course[];

// Type guard to check if a role is valid
export function isValidRole(role: string): role is "FACULTY" | "STUDENT" | "TA" {
    return ["FACULTY", "STUDENT", "TA"].includes(role);
}