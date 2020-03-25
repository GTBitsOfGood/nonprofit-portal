const prod = process.env.NODE_ENV === 'production';

export default {
  baseUrl: prod ? process.env.PROD_BASE_URL : 'http://localhost:3000',
  dbUrl: prod ? process.env.MONGO_DB : process.env.MONGO_DEV_DB || 'mongodb://localhost:27017',
  dbName: 'Applications',
  apis: {
    getApplications: '/api/getApplications',
    addApplication: '/api/addApplication',
    deleteApplication: '/api/deleteApplication',
    getApplication: '/api/getApplication',
    updateApplicationState: '/api/updateApplicationState',
    updateApplicationDecision: '/api/updateApplicationDecision',
    updateApplicationMeeting: '/api/updateApplicationMeeting',
    getAvailabilities: '/api/getAvailabilities',
    addAvailability: '/api/addAvailability',
    deleteAvailability: '/api/deleteAvailability',
    getAvailability: '/api/getAvailability',
    updateAvailability: '/api/updateAvailability',
    login: '/api/login',
    signUp: '/api/signUp',
    verifyToken: '/api/verifyToken',
  },
  pages: {
    application: '/',
    login: '/login',
    register: '/register',
    submitted: '/submitted',
    admin: '/admin',
    availability: '/availability',
    home: 'https://bitsofgood.org',
  },
  bogEmail: 'max.karpawich@gmail.com',
};
