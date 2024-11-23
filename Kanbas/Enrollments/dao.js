import Database from "../Database/index.js";

// The enrollments array from Database
let { enrollments, courses } = Database;

export function createEnrollment(userId, courseId) {
  const newEnrollment = { _id: Date.now(), user: userId, course: courseId };
  enrollments = [...enrollments, newEnrollment];  // Add new enrollment to the list
  return newEnrollment;
}

export const findEnrollmentsByUserId = (userId) => {
  return enrollments.filter((enrollment) => enrollment.user === userId);
};

export const findEnrollmentsByCourseId = (courseId) => {
  return enrollments.filter((enrollment) => enrollment.course === courseId);
};

export const deleteEnrollment = (userId, courseId) => {
  enrollments = enrollments.filter(
    (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
  );
};

export const findAllEnrollments = () => enrollments;