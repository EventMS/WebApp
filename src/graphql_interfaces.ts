

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ICreateUser
// ====================================================

export interface ICreateUser_createUser_user {
  email: string | null;
  id: string | null;
}

export interface ICreateUser_createUser {
  token: string | null;
  user: ICreateUser_createUser_user | null;
}

export interface ICreateUser {
  createUser: ICreateUser_createUser | null;
}

export interface ICreateUserVariables {
  request?: CreateUserRequestInput | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IClubsQuery
// ====================================================

export interface IClubsQuery_clubs {
  id: any;
  name: string | null;
}

export interface IClubsQuery {
  clubs: (IClubsQuery_clubs | null)[] | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// null
export interface CreateUserRequestInput {
  email?: string | null;
  name?: string | null;
  password?: string | null;
  phoneNumber?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================