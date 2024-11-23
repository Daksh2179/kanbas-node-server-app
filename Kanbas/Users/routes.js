import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  const createUser = (req, res) => { 
    try {
      const newUser = dao.createUser(req.body);
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error: error.message });
    }
  };

  const deleteUser = (req, res) => { 
    try {
      const userId = req.params.userId;
      dao.deleteUser(userId);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error: error.message });
    }
  };

  const findAllUsers = (req, res) => { 
    try {
      const users = dao.findAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error finding users", error: error.message });
    }
  };

  const findUserById = (req, res) => { 
    try {
      const userId = req.params.userId;
      const user = dao.findUserById(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error finding user", error: error.message });
    }
  };

  const updateUser = (req, res) => {
    try {
      const userId = req.params.userId;
      const userUpdates = req.body;
      const updatedUser = dao.updateUser(userId, userUpdates);
      req.session["currentUser"] = updatedUser;
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error: error.message });
    }
  };

  const signup = (req, res) => { 
    try {
      const existingUser = dao.findUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already in use" });
      }
      const currentUser = dao.createUser(req.body);
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } catch (error) {
      res.status(500).json({ message: "Signup error", error: error.message });
    }
  };

  const signin = (req, res) => {
    try {
      console.log('Request headers:', req.headers);
      console.log('Request body:', req.body);
      console.log('Content-Type:', req.headers['content-type']);
  
      const { username, password } = req.body;
      
      if (!username || !password) {
        console.log('Missing credentials:', { username: !!username, password: !!password });
        return res.status(400).json({ 
          message: "Username and password are required",
          received: { username: !!username, password: !!password }
        });
      }
  
      const currentUser = dao.findUserByCredentials(username, password);
      console.log('Found user:', currentUser ? 'Yes' : 'No');
      
      if (currentUser) {
        req.session["currentUser"] = currentUser;
        console.log('Session set:', req.session);
        return res.json(currentUser);
      } else {
        return res.status(401).json({ 
          message: "Invalid username or password",
          debug: { attemptedUsername: username }
        });
      }
    } catch (error) {
      console.error('Signin error:', error);
      return res.status(500).json({ 
        message: "Internal server error", 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  };

  const signout = (req, res) => {
    try {
      req.session.destroy();
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "Signout error", error: error.message });
    }
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }
    res.json(currentUser);
  };

  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  const createCourse = (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.sendStatus(401);
      }
      const newCourse = courseDao.createCourse(req.body);
      enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
      res.json(newCourse);
    } catch (error) {
      res.status(500).json({ message: "Error creating course", error: error.message });
    }
  };

  app.post("/api/users/current/courses", createCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}