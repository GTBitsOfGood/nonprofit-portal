import config from "../utils/urls";

export default function apiRoute(res, route) {
  if (typeof res !== "undefined") {
    return `${config.baseUrl}${route}`;
  }
  return route;
}
