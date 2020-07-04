/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetGarmentsForUser
// ====================================================

export interface GetGarmentsForUser_getUserById_UserNotFoundError {
  __typename: "UserNotFoundError";
}

export interface GetGarmentsForUser_getUserById_User_garments_brand {
  __typename: "Brand";
  name: string;
}

export interface GetGarmentsForUser_getUserById_User_garments_subCategory {
  __typename: "GarmentSubCategory";
  name: string;
}

export interface GetGarmentsForUser_getUserById_User_garments {
  __typename: "Garment";
  id: string;
  title: string;
  description: string;
  brand: GetGarmentsForUser_getUserById_User_garments_brand;
  subCategory: GetGarmentsForUser_getUserById_User_garments_subCategory;
}

export interface GetGarmentsForUser_getUserById_User {
  __typename: "User";
  garments: GetGarmentsForUser_getUserById_User_garments[];
}

export type GetGarmentsForUser_getUserById = GetGarmentsForUser_getUserById_UserNotFoundError | GetGarmentsForUser_getUserById_User;

export interface GetGarmentsForUser {
  getUserById: GetGarmentsForUser_getUserById;
}

export interface GetGarmentsForUserVariables {
  userId: string;
}
