/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ICreateClubMutation
// ====================================================

export interface ICreateClubMutation_createClub {
  __typename: "Club";
  clubId: string;
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
// GraphQL query operation: IGetClubsQuery
// ====================================================

export interface IGetClubsQuery_clubs {
  __typename: "Club";
  clubId: string;
  accountNumber: string | null;
  address: string | null;
  adminId: string;
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
// GraphQL query operation: ICreateEventClubQuery
// ====================================================

export interface ICreateEventClubQuery_clubByID_rooms {
  __typename: "Room";
  roomId: string;
  name: string | null;
}

export interface ICreateEventClubQuery_clubByID_instructors_user {
  __typename: "identity_ApplicationUser";
  name: string | null;
}

export interface ICreateEventClubQuery_clubByID_instructors {
  __typename: "permission_Role";
  userId: string;
  user: ICreateEventClubQuery_clubByID_instructors_user | null;
}

export interface ICreateEventClubQuery_clubByID_clubsubscription {
  __typename: "ClubSubscription";
  clubSubscriptionId: string;
  name: string | null;
}

export interface ICreateEventClubQuery_clubByID_events_locations {
  __typename: "RoomEvent";
  roomId: string;
}

export interface ICreateEventClubQuery_clubByID_events {
  __typename: "Event";
  locations: (ICreateEventClubQuery_clubByID_events_locations | null)[] | null;
  name: string | null;
  startTime: any;
  endTime: any;
  description: string | null;
}

export interface ICreateEventClubQuery_clubByID {
  __typename: "Club";
  rooms: (ICreateEventClubQuery_clubByID_rooms | null)[] | null;
  instructors: (ICreateEventClubQuery_clubByID_instructors | null)[] | null;
  clubsubscription: (ICreateEventClubQuery_clubByID_clubsubscription | null)[] | null;
  events: (ICreateEventClubQuery_clubByID_events | null)[] | null;
}

export interface ICreateEventClubQuery {
  clubByID: ICreateEventClubQuery_clubByID | null;
}

export interface ICreateEventClubQueryVariables {
  clubId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IMyClubsQuery
// ====================================================

export interface IMyClubsQuery_myClubs {
  __typename: "Club";
  name: string | null;
  clubId: string;
}

export interface IMyClubsQuery {
  myClubs: (IMyClubsQuery_myClubs | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IShowClubQuery
// ====================================================

export interface IShowClubQuery_clubByName_clubsubscription {
  __typename: "ClubSubscription";
  name: string | null;
  price: number;
  clubSubscriptionId: string;
  clubId: string;
}

export interface IShowClubQuery_clubByName_user {
  __typename: "identity_ApplicationUser";
  id: string | null;
  email: string | null;
}

export interface IShowClubQuery_clubByName {
  __typename: "Club";
  address: string | null;
  accountNumber: string | null;
  adminId: string;
  clubId: string;
  name: string | null;
  phoneNumber: string | null;
  registrationNumber: string | null;
  clubsubscription: (IShowClubQuery_clubByName_clubsubscription | null)[] | null;
  description: string | null;
  user: IShowClubQuery_clubByName_user | null;
}

export interface IShowClubQuery_currentUser_permissions {
  __typename: "permission_Role";
  clubSubscriptionId: string | null;
  clubId: string;
}

export interface IShowClubQuery_currentUser {
  __typename: "identity_ApplicationUser";
  name: string | null;
  permissions: (IShowClubQuery_currentUser_permissions | null)[] | null;
}

export interface IShowClubQuery {
  clubByName: IShowClubQuery_clubByName | null;
  currentUser: IShowClubQuery_currentUser | null;
}

export interface IShowClubQueryVariables {
  clubByNameName?: string | null;
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
  name: string | null;
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
// GraphQL mutation operation: ICreateEventMutation
// ====================================================

export interface ICreateEventMutation_createEvent {
  __typename: "Event";
  eventId: string;
  name: string | null;
}

export interface ICreateEventMutation {
  createEvent: ICreateEventMutation_createEvent | null;
}

export interface ICreateEventMutationVariables {
  request?: CreateEventRequestInput | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: IAddInstructorMutation
// ====================================================

export interface IAddInstructorMutation_addInstructor {
  __typename: "permission_Role";
  userId: string;
}

export interface IAddInstructorMutation {
  addInstructor: IAddInstructorMutation_addInstructor | null;
}

export interface IAddInstructorMutationVariables {
  clubId: string;
  instructorId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: IRemoveInstructorMutation
// ====================================================

export interface IRemoveInstructorMutation_removeInstructor {
  __typename: "permission_Role";
  userId: string;
}

export interface IRemoveInstructorMutation {
  removeInstructor: IRemoveInstructorMutation_removeInstructor | null;
}

export interface IRemoveInstructorMutationVariables {
  clubId: string;
  instructorId: string;
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
  name: string | null;
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

// ====================================================
// GraphQL query operation: IMembersForClubQuery
// ====================================================

export interface IMembersForClubQuery_membersForClub_user_permissions {
  __typename: "permission_Role";
  userRole: string | null;
}

export interface IMembersForClubQuery_membersForClub_user {
  __typename: "identity_ApplicationUser";
  name: string | null;
  id: string | null;
  permissions: (IMembersForClubQuery_membersForClub_user_permissions | null)[] | null;
}

export interface IMembersForClubQuery_membersForClub {
  __typename: "ClubMember";
  user: IMembersForClubQuery_membersForClub_user;
}

export interface IMembersForClubQuery {
  membersForClub: (IMembersForClubQuery_membersForClub | null)[] | null;
}

export interface IMembersForClubQueryVariables {
  clubId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ICreateSubscriptionMutation
// ====================================================

export interface ICreateSubscriptionMutation_createClubSubscription {
  __typename: "ClubSubscription";
  price: number;
  name: string | null;
}

export interface ICreateSubscriptionMutation {
  createClubSubscription: ICreateSubscriptionMutation_createClubSubscription | null;
}

export interface ICreateSubscriptionMutationVariables {
  request?: CreateClubSubscriptionRequestInput | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ICreateClubMemberMutation
// ====================================================

export interface ICreateClubMemberMutation_createClubMember {
  __typename: "ClubMember";
  clubId: string;
  clubSubscriptionId: string;
}

export interface ICreateClubMemberMutation {
  createClubMember: ICreateClubMemberMutation_createClubMember | null;
}

export interface ICreateClubMemberMutationVariables {
  request?: CreateClubMemberRequestInput | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ISignUpForSubscriptionMutation
// ====================================================

export interface ISignUpForSubscriptionMutation_signUpForSubscription {
  __typename: "payment_ClubSubscription";
  clubSubscriptionId: string;
}

export interface ISignUpForSubscriptionMutation {
  signUpForSubscription: ISignUpForSubscriptionMutation_signUpForSubscription | null;
}

export interface ISignUpForSubscriptionMutationVariables {
  signUpForSubscriptionRequest?: SignUpSubscriptionRequestInput | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ISubscriptionsForClubQuery
// ====================================================

export interface ISubscriptionsForClubQuery_subscriptionsForClub {
  __typename: "ClubSubscription";
  name: string | null;
  price: number;
  clubSubscriptionId: string;
}

export interface ISubscriptionsForClubQuery {
  subscriptionsForClub: (ISubscriptionsForClubQuery_subscriptionsForClub | null)[] | null;
}

export interface ISubscriptionsForClubQueryVariables {
  clubId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateClubMemberRequestInput {
  clubSubscriptionId: string;
  userId: string;
}

export interface CreateClubRequestInput {
  accountNumber: string;
  address: string;
  description?: string | null;
  locations?: (string | null)[] | null;
  name: string;
  phoneNumber: string;
  registrationNumber: string;
}

export interface CreateClubSubscriptionRequestInput {
  clubId: string;
  name: string;
  price: number;
  referenceId?: string | null;
}

export interface CreateEventRequestInput {
  clubId: string;
  description?: string | null;
  endTime: any;
  eventPrices: (EventPriceRequestInput | null)[];
  instructorForEvents?: string[] | null;
  locations: string[];
  name: string;
  publicPrice?: number | null;
  startTime: any;
}

export interface CreateUserRequestInput {
  birthDate: any;
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
}

export interface EventPriceRequestInput {
  clubSubscriptionId: string;
  price: number;
}

export interface LoginUserRequestInput {
  email?: string | null;
  password?: string | null;
}

export interface SignUpSubscriptionRequestInput {
  clubSubscriptionId: string;
  paymentMethodId: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
