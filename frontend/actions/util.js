import config from '../../config';

export default function apiRoute(res, route) {
  if (typeof res !== 'undefined') {
    return `${config.baseUrl}${route}`;
  }
  return route;
}
