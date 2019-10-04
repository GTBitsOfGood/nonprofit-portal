const prod = process.env.NODE_ENV === 'production';

export default {
  baseUrl: prod ? '' : 'http://localhost:3000',
  dbUrl: prod ? '' : process.env.devDB || 'mongodb://localhost:27017/test',
  apis: {
    getItems: '/api/getItems',
    addItem: '/api/addItem',
    deleteItem: '/api/deleteItem',
    getItem: '/api/getItem',
  },
};
