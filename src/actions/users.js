import fetch from "isomorphic-unfetch";
import Router from "next/router";
import cookie from "js-cookie";

import config from "../../config";
import apiRoute from "./util";

export const login = async (email, password, res) =>
  fetch(apiRoute(res, config.apis.login), {
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

export const signUp = async (name, email, password, res) =>
  fetch(apiRoute(res, config.apis.signUp), {
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

export const verifyToken = async (token, res) =>
  fetch(apiRoute(res, config.apis.verifyToken), {
    method: "post",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Unable to verify token at this time.");
      } else if (!json.success) {
        throw new Error(json.message);
      } else if (json.payload == null) {
        throw new Error("Unable to verify token at this time.");
      }

      return json.payload;
    });

export const signOut = () => {
  cookie.remove("token");

  return Router.push({
    pathname: "/",
  });
};
