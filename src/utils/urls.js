const prod = process.env.NODE_ENV === "production";

export default {
  baseUrl: prod ? process.env.PROD_BASE_URL : "http://localhost:3000",
  apis: {
    getApplications: "/api/getApplications",
    addApplication: "/api/addApplication",
    deleteApplication: "/api/deleteApplication",
    getApplication: "/api/getApplication",
    updateApplicationState: "/api/updateApplicationState",
    updateApplicationDecision: "/api/updateApplicationDecision",
    updateApplicationMeeting: "/api/updateApplicationMeeting",
    getAvailabilities: "/api/getAvailabilities",
    addAvailability: "/api/addAvailability",
    deleteAvailability: "/api/deleteAvailability",
    getAvailability: "/api/getAvailability",
    updateAvailability: "/api/updateAvailability",
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
