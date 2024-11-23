import courses from "./courses.js";
import modules from "./modules.js";
import assignments from "./assignments.js";
import users from "./users.js";
import enrollment from "./enrollment.js";
console.log('Database initialization:', {
    coursesCount: courses?.length || 0,
    modulesCount: modules?.length || 0,
    assignmentsCount: assignments?.length || 0,
    usersCount: users?.length || 0,
    enrollmentCount: enrollment?.length || 0
  });
  
  const Database = {
    courses,
    modules,
    assignments,
    users,
    enrollment  // Make sure this matches your enrollment.js export
  };
  
  // Log the final Database object
  console.log('Final Database structure:', {
    hasCourses: !!Database.courses,
    hasModules: !!Database.modules,
    hasAssignments: !!Database.assignments,
    hasUsers: !!Database.users,
    hasEnrollment: !!Database.enrollment
  });
  
  export default Database;