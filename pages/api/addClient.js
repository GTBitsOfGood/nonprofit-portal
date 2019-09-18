import { addClient } from '../../server/mongodb/actions/clients';

export default async function (req, res) {
  const { name, company } = req.body;

  await addClient(name, company)
    .then(() => {
      res.status(201).json({
        status: 'success',
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 'failed',
        error,
      });
    });
}
