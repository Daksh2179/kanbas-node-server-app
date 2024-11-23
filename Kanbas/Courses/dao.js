import Database from "../Database/index.js";

export function findAllCourses() {
  return Database.courses;
}

export function findCoursesForEnrolledUser(userId) {
  const { enrollments, courses } = Database;
  
  // Ensure enrollments is defined (fallback to an empty array if undefined)
  const validEnrollments = enrollments || [];
  
  // Find courses for the enrolled user
  return courses.filter(course => 
    validEnrollments.some(enrollment => 
      enrollment.user === userId && enrollment.course === course._id
    )
  );
}

export function updateCourse(courseId, courseUpdates) {
  const { courses } = Database;
  const course = courses.find((course) => course._id === courseId);
  Object.assign(course, courseUpdates);
  return course;
}
