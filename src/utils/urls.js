const prod = process.env.NODE_ENV === "production";

export default {
  baseUrl: prod ? process.env.PROD_BASE_URL : "http://localhost:3000",
  apis: {
    getApplications: "/api/application/getApplications",
    addApplication: "/api/application/addApplication",
    deleteApplication: "/api/application/deleteApplication",
    getApplication: "/api/application/getApplication",
    updateApplicationState: "/api/application/updateApplicationState",
    updateApplicationDecision: "/api/application/updateApplicationDecision",
    updateApplicationMeeting: "/api/application/updateApplicationMeeting",
    getAvailabilities: "/api/availability/getAvailabilities",
    addAvailability: "/api/availability/addAvailability",
    deleteAvailability: "/api/availability/deleteAvailability",
    getAvailability: "/api/availability/getAvailability",
    updateAvailability: "/api/availability/updateAvailability",
    getUser: "/api/user",
    login: "/api/user/login",
    signUp: "/api/user/signUp",
    logout: "/api/user/logout",
  },
  pages: {
    application: "/",
    login: "/login",
    register: "/register",
    submitted: "/submitted",
    admin: "/admin",
    availability: "/availability",
    home: "https://bitsofgood.org",
  },
};
