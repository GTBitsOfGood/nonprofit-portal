const prod = process.env.NODE_ENV === "production";

export default {
  baseUrl: prod ? process.env.PROD_BASE_URL : "http://localhost:3000",
  apis: {
    application: "/api/application",
    availability: "/api/availability",
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
