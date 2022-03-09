export default async function fetchJson(input, init) {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error({
      message: response.statusText,
    });
  }

  return response.json();
}
