const mongoDB = require('../index');

async function getClients() {
  const mongoConn = await mongoDB();
  const db = mongoConn.db();
  let collections;

  try {
    const collection = db.collection('clients');

    collections = await collection.find({ isDenied: false }).toArray();
  } finally {
    mongoConn.close();
  }

  return collections;
}

async function addClient(name, company) {
  const mongoConn = await mongoDB();
  const db = mongoConn.db();

  try {
    const collection = db.collection('clients');

    return await collection.insertOne({
      name,
      company,
      applied: new Date(),
      status: 'applied',
      isDenied: false,
    });
  } finally {
    mongoConn.close();
  }
}

module.exports = {
  getClients,
  addClient,
};
