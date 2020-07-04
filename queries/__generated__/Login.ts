/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_loginUser_UserAndToken_user {
  __typename: "User";
  id: string;
  email: string;
}

export interface Login_loginUser_UserAndToken {
  __typename: "UserAndToken";
  user: Login_loginUser_UserAndToken_user;
  token: string;
}

export interface Login_loginUser_UserNotFoundError {
  __typename: "UserNotFoundError";
  reason: string;
}

export interface Login_loginUser_FallBackServerError {
  __typename: "FallBackServerError";
  reason: string;
  message: string;
}

export type Login_loginUser = Login_loginUser_UserAndToken | Login_loginUser_UserNotFoundError | Login_loginUser_FallBackServerError;

export interface Login {
  loginUser: Login_loginUser;
}

export interface LoginVariables {
  password: string;
  email: string;
}
