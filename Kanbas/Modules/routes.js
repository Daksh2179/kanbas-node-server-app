import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";

export default function CourseRoutes(app) {
  // Fetch all courses
  app.get("/api/courses", (req, res) => {
    try {
      const courses = dao.findAllCourses();
      // Check if courses exist, if not send empty array
      if (courses.length === 0) {
        return res.status(404).json({ message: "No courses found" });
      }
      res.json(courses);
    } catch (err) {
      console.error("Error fetching courses:", err);
      res.status(500).json({ message: "Error fetching courses" });
    }
  });

  // Delete a specific course
  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    try {
      const status = dao.deleteCourse(courseId);
      if (status === "Course deleted successfully") {
        res.status(200).json({ message: status });
      } else {
        res.status(404).json({ message: "Course not found" });
      }
    } catch (err) {
      console.error("Error deleting course:", err);
      res.status(500).json({ message: "Error deleting course" });
    }
  });

  // Update a specific course
  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    try {
      const updatedCourse = dao.updateCourse(courseId, courseUpdates);
      if (updatedCourse) {
        res.status(200).json(updatedCourse);
      } else {
        res.status(404).json({ message: "Course not found" });
      }
    } catch (err) {
      console.error("Error updating course:", err);
      res.status(500).json({ message: "Error updating course" });
    }
  });

  // Fetch modules for a specific course
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    try {
      const modules = modulesDao.findModulesForCourse(courseId);
      if (modules.length === 0) {
        return res.status(404).json({ message: "No modules found for this course" });
      }
      res.json(modules);
    } catch (err) {
      console.error("Error fetching modules:", err);
      res.status(500).json({ message: "Error fetching modules" });
    }
  });

  // Create a module for a specific course
  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    try {
      const newModule = modulesDao.createModule(module);
      res.status(201).json(newModule);
    } catch (err) {
      console.error("Error creating module:", err);
      res.status(500).json({ message: "Error creating module" });
    }
  });
}
