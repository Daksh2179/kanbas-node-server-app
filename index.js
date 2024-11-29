import Hello from './Hello.js';
import express from 'express';
import Lab5 from './Lab5/index.js';
import UserRoutes from './Kanbas/Users/routes.js';
import cors from "cors";
import session from "express-session";
import "dotenv/config";
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import EnrollmentsRoutes from './Kanbas/Enrollments/routes.js';
import AssignmentRoutes from './Kanbas/Assignment/routes.js';

const app = express();
app.use(
  cors({
    credentials: true,
    origin: function(origin, callback) {
      // List of allowed origins
      const allowedOrigins = [
        'http://localhost:3000', 
        process.env.NETLIFY_URL,
        'https://674a4f26a1ee3100085d6797--cerulean-puffpuff-de8b3b.netlify.app',
        /\.netlify\.app$/, // Regex to allow all Netlify preview and deploy URLs
        'https://kanbas-node-server-app-2-dc2w.onrender.com' // Add your render deployment URL
      ];

      // If no origin (like mobile apps), allow
      if (!origin) return callback(null, true);

      // Check if origin is allowed
      const isAllowed = allowedOrigins.some(allowed => 
        allowed instanceof RegExp 
          ? allowed.test(origin) 
          : allowed === origin
      );

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // Secure cookies in production
        sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax",
      },
};

if (process.env.NODE_ENV !== "development") {
    app.set("trust proxy", 1);
    sessionOptions.cookie = { ...sessionOptions.cookie, domain: process.env.NODE_SERVER_DOMAIN };
  }
  
app.use(session(sessionOptions));
app.use(express.json());
  
Hello(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
EnrollmentsRoutes(app);
AssignmentRoutes(app);

app.listen(process.env.PORT || 4000, () => console.log("hello, server started"));