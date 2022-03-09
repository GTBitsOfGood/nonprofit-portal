import React from "react";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import useSWR from "swr";
import urls from "../utils/urls";

export const login = async (email, password) =>
  fetch(urls.baseUrl + urls.apis.login, {
    method: "post",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Unable to login at this time.");
      } else if (!json.success) {
        throw new Error(json.message);
      } else if (json.payload == null) {
        throw new Error("Unable to login at this time.");
      }

      return json.payload;
    });

export const signUp = async (name, email, password) =>
  fetch(urls.baseUrl + urls.apis.signUp, {
    method: "post",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Unable to sign up at this time.");
      } else if (!json.success) {
        throw new Error(json.message);
      } else if (json.payload == null) {
        throw new Error("Unable to sign up at this time.");
      }

      return json.payload;
    });

export const signOut = () =>
  fetch(urls.baseUrl + urls.apis.logout, {
    method: "GET",
    mode: "same-origin",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      }

      return json.success;
    });

export const useUser = ({ redirectTo = "", redirectIfFound = false } = {}) => {
  const { data, mutate: mutateUser } = useSWR(urls.apis.getUser);
  const user = data?.payload;

  React.useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
};
