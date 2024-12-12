import Database from "../Database/index.js";
import model from "./model.js";
export function getAllEnrollments() {
    return model.find();
}
export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new Error('Invalid course ID');
  }
  try {
    const users = await EnrollmentModel.find({ course: mongoose.Types.ObjectId(courseId) }).populate('user');
    return users;
  } catch (error) {
    console.error('Error fetching users for course:', error);
    throw error;
  }
}

export function enrollUserInCourse(user, course) {
    return model.create({ user, course });
}
export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}