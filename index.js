import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import "dotenv/config";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";

const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

Lab5(app);
Hello(app);

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

app.listen(process.env.PORT || 4000, () => console.log("hello, server started"));
// import Hello from './Hello.js';
// import "dotenv/config";
// import express from 'express';
// import mongoose from "mongoose";
// import Lab5 from './Lab5/index.js';
// import UsersRoutes from './Kanbas/Users/routes.js';
// import cors from "cors";
// import session from "express-session";
// import "dotenv/config";
// import CourseRoutes from './Kanbas/Courses/routes.js';
// import ModuleRoutes from "./Kanbas/Modules/routes.js";
// import EnrollmentsRoutes from './Kanbas/Enrollments/routes.js';
// import AssignmentRoutes from './Kanbas/Assignments/routes.js';
// //mongodb+srv://daksh:lpDPbdoJJQMrMQWT@kanbas.ww8di.mongodb.net/
// const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
// mongoose.connect(CONNECTION_STRING);
// const app = express();
// app.use(
//   cors({
//     credentials: true,
//     origin: function(origin, callback) {
//       // List of allowed origins
//       const allowedOrigins = [
//         'http://localhost:3000', 
//         process.env.NETLIFY_URL,
//         'https://kanbas-node-server-app-3-6vmh.onrender.com' // Add your render deployment URL
//       ];

//       // Check if origin is allowed
//       const isAllowed = allowedOrigins.some(allowed => 
//         allowed instanceof RegExp 
//           ? allowed.test(origin) 
//           : allowed === origin
//       );

//       if (isAllowed) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
//   })
// );

// const sessionOptions = {
//     secret: process.env.SESSION_SECRET || "kanbas",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         secure: process.env.NODE_ENV !== "production", // Secure cookies in production
//         sameSite: process.env.NODE_ENV !== "production" ? "none" : "lax",
//       },
// };

// if (process.env.NODE_ENV !== "production") {
//     app.set("trust proxy", 1);
//     sessionOptions.cookie = { ...sessionOptions.cookie, domain: process.env.NODE_SERVER_DOMAIN };
//   }
  
// app.use(session(sessionOptions));
// app.use(express.json());
  
// Hello(app);
// Lab5(app);


// UsersRoutes(app);
// CourseRoutes(app);
// ModuleRoutes(app);
// AssignmentRoutes(app);
// EnrollmentsRoutes(app);


// app.listen(process.env.PORT || 4000, () => console.log("hello, server started"));