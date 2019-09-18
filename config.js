const dev = process.env.NODE_ENV !== 'production';

export default {
  // First string should be replaced with production url
  baseUrl: dev ? 'http://localhost:3000' : 'http://localhost:3000',
  apis: {
    getClients: '/api/getClients',
    addClient: '/api/addClient',
  },
};
