/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: Signup
// ====================================================

export interface Signup_createUser_User {
  __typename: "User";
  id: string;
  email: string;
}

export interface Signup_createUser_DuplicateUserError {
  __typename: "DuplicateUserError";
  reason: string;
}

export interface Signup_createUser_FallBackServerError {
  __typename: "FallBackServerError";
  reason: string;
  message: string;
}

export type Signup_createUser = Signup_createUser_User | Signup_createUser_DuplicateUserError | Signup_createUser_FallBackServerError;

export interface Signup {
  createUser: Signup_createUser;
}

export interface SignupVariables {
  createUserInput?: CreateUserInput | null;
}
