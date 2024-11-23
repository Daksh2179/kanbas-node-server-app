import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  // Fetch all assignments
  app.get("/api/assignments", (req, res) => {
    try {
      const assignments = dao.findAssignments();
      res.send(assignments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: error.message });
    }
  });

  // Fetch assignments for a specific course
  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    try {
      const assignments = dao.findAssignmentsForCourse(courseId);
      res.send(assignments);
    } catch (error) {
      console.error(error.message);
      res.status(404).send({ error: error.message });
    }
  });

  // Fetch a specific assignment by ID
  app.get("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    try {
      const assignment = dao.findAssignmentById(assignmentId);
      res.send(assignment);
    } catch (error) {
      console.error(error.message);
      res.status(404).send({ error: error.message });
    }
  });

  // Create a new assignment
  app.post("/api/assignments", (req, res) => {
    const assignmentData = req.body;
    try {
      const newAssignment = dao.createAssignment(assignmentData);
      res.status(201).send(newAssignment);
    } catch (error) {
      console.error(error.message);
      res.status(400).send({ error: error.message });
    }
  });

  // Update an existing assignment
  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    try {
      const updatedAssignment = dao.updateAssignment(assignmentId, assignmentUpdates);
      res.send(updatedAssignment);
    } catch (error) {
      console.error(error.message);
      res.status(404).send({ error: error.message });
    }
  });

  // Delete an assignment
  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    try {
      const deletedAssignment = dao.deleteAssignment(assignmentId);
      res.send(deletedAssignment);
    } catch (error) {
      console.error(error.message);
      res.status(404).send({ error: error.message });
    }
  });
}
