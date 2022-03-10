import axios from "axios";
import React from "react";
import Router from "next/router";
import useSWR from "swr";
import urls from "../utils/urls";

export const getUser = async () =>
  axios.get(urls.apis.getUser).then((res) => res.data.payload);

export const login = async (email, password) =>
  axios
    .post(urls.apis.login, {
      email,
      password,
    })
    .then((res) => res.data.payload);

export const signUp = async (name, email, password) =>
  axios
    .post(urls.apis.signUp, {
      name,
      email,
      password,
    })
    .then((res) => res.data.payload);

export const signOut = () => axios.get(urls.apis.logout);

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
