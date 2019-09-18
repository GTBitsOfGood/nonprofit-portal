import { getClients } from '../../server/mongodb/actions/clients';

export default async function (req, res) {
  await getClients()
    .then((clients) => {
      res.status(200).json({
        status: 'success',
        clients,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 'failed',
        error,
      });
    });
}
