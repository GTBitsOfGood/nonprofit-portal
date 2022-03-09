import React from "react";
import Router from "next/router";
import useSWR from "swr";
import urls from "../utils/urls";
import { apiGet, apiPost } from "../utils/api";

export const getUser = async () => apiGet(urls.apis.getUser);

export const login = async (email, password) =>
  apiPost(urls.apis.login, {
    email,
    password,
  });

export const signUp = async (name, email, password) =>
  apiPost(urls.apis.signUp, {
    name,
    email,
    password,
  });

export const signOut = () => apiGet(urls.apis.logout);

export const useUser = ({ redirectTo = "", redirectIfFound = false } = {}) => {
  const { data: user, mutate: mutateUser } = useSWR(urls.apis.getUser, getUser);

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

  return {
    user,
    mutateUser,
  };
};
