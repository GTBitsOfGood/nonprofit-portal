const prod = process.env.NODE_ENV === 'production';

export default {
  baseUrl: prod ? '' : 'http://localhost:3000',
  dbUrl: prod ? '' : process.env.devDB || 'mongodb://localhost:27017',
  dbName: 'Applications',
  apis: {
    getApplications: '/api/getApplications',
    addApplication: '/api/addApplication',
    deleteApplication: '/api/deleteApplication',
    getApplication: '/api/getApplication',
    updateApplicationState: '/api/updateApplicationState',
    updateApplicationDecision: '/api/updateApplicationDecision',
    login: '/api/login',
    signUp: '/api/signUp',
  },
  pages: {
    application: '/appication',
    index: '/index',
    login: '/login',
    register: '/register',
    submitted: '/submitted',
    view: '/view',
  },
};
