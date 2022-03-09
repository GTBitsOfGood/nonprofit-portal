export const apiFetch = async (input, init) => {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error(
      "An unexpected error was encountered, please try again later!"
    );
  }

  const json = await response.json();

  if (json) {
    if (!json.success) {
      throw new Error(json.message);
    }

    return json.payload;
  }

  return null;
};

export const apiGet = (url) =>
  apiFetch(url, {
    method: "get",
    mode: "same-origin",
    credentials: "include",
  });

export const apiPost = (url, body) =>
  apiFetch(url, {
    method: "post",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const apiPut = (url, body) =>
  apiFetch(url, {
    method: "put",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const apiDelete = (url, body) =>
  apiFetch(url, {
    method: "delete",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
