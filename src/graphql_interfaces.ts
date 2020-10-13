/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IGetClubsQuery
// ====================================================

export interface IGetClubsQuery_clubs {
  __typename: "Club";
  clubId: any;
  accountNumber: string | null;
  address: string | null;
  adminId: any;
  description: string | null;
  name: string | null;
  phoneNumber: string | null;
  registrationNumber: string | null;
}

export interface IGetClubsQuery {
  clubs: (IGetClubsQuery_clubs | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ICreateClubMutation
// ====================================================

export interface ICreateClubMutation_createClub {
  __typename: "Club";
  clubId: any;
}

export interface ICreateClubMutation {
  createClub: ICreateClubMutation_createClub | null;
}

export interface ICreateClubMutationVariables {
  request?: CreateClubRequestInput | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ICreateUserMutation
// ====================================================

export interface ICreateUserMutation_createUser_user {
  __typename: "identity_ApplicationUser";
  email: string | null;
  id: string | null;
}

export interface ICreateUserMutation_createUser {
  __typename: "identity_Response";
  token: string | null;
  user: ICreateUserMutation_createUser_user | null;
}

export interface ICreateUserMutation {
  createUser: ICreateUserMutation_createUser | null;
}

export interface ICreateUserMutationVariables {
  request?: CreateUserRequestInput | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ILoginUserMutation
// ====================================================

export interface ILoginUserMutation_loginUser_user {
  __typename: "identity_ApplicationUser";
  email: string | null;
  id: string | null;
}

export interface ILoginUserMutation_loginUser {
  __typename: "identity_Response";
  token: string | null;
  user: ILoginUserMutation_loginUser_user | null;
}

export interface ILoginUserMutation {
  loginUser: ILoginUserMutation_loginUser | null;
}

export interface ILoginUserMutationVariables {
  request?: LoginUserRequestInput | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateClubRequestInput {
  accountNumber: string;
  address: string;
  description?: string | null;
  locations?: (string | null)[] | null;
  name: string;
  phoneNumber: string;
  registrationNumber: string;
}

export interface CreateUserRequestInput {
  birthDate: any;
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
}

export interface LoginUserRequestInput {
  email?: string | null;
  password?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
