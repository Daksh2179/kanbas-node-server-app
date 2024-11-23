import Database from "../Database/index.js";

export function findAssignments() {
  // Returns all assignments in the database
  return Database.assignments || [];
}

export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;

  // Validate if the course exists
  const courseAssignments = assignments.filter((assignment) => assignment.course === courseId);

  if (courseAssignments.length === 0) {
    throw new Error(`No assignments found for course ID "${courseId}".`);
  }

  return courseAssignments;
}

export function findAssignmentById(assignmentId) {
  const { assignments } = Database;

  // Find the assignment by ID
  const assignment = assignments.find((a) => a._id === assignmentId);

  if (!assignment) {
    throw new Error(`Assignment with ID "${assignmentId}" does not exist.`);
  }

  return assignment;
}

export function createAssignment(assignmentData) {
  const { assignments } = Database;

  // Generate a new ID for the assignment
  const newAssignment = {
    _id: `assignment_${Date.now()}`,
    ...assignmentData,
  };

  // Add the new assignment to the database
  assignments.push(newAssignment);

  return newAssignment;
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  const { assignments } = Database;

  // Find the assignment by ID
  const assignment = assignments.find((a) => a._id === assignmentId);
  if (!assignment) {
    throw new Error(`Assignment with ID "${assignmentId}" does not exist.`);
  }

  // Update the assignment properties
  Object.assign(assignment, assignmentUpdates);

  return assignment;
}

export function deleteAssignment(assignmentId) {
  const { assignments } = Database;

  // Check if the assignment exists
  const assignmentIndex = assignments.findIndex((a) => a._id === assignmentId);
  if (assignmentIndex === -1) {
    throw new Error(`Assignment with ID "${assignmentId}" does not exist.`);
  }

  // Remove the assignment from the database
  const [deletedAssignment] = assignments.splice(assignmentIndex, 1);

  return deletedAssignment;
}
