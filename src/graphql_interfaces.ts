/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ICreateUserMutation
// ====================================================

export interface ICreateUserMutation_createUser_user {
  __typename: "ApplicationUser";
  email: string | null;
  id: string | null;
}

export interface ICreateUserMutation_createUser {
  __typename: "Response";
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
  __typename: "ApplicationUser";
  email: string | null;
  id: string | null;
}

export interface ILoginUserMutation_loginUser {
  __typename: "Response";
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

export interface CreateUserRequestInput {
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
