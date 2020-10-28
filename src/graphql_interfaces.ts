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
// GraphQL query operation: IMyClubsQuery
// ====================================================

export interface IMyClubsQuery_myClubs {
  __typename: "Club";
  name: string | null;
  clubId: any;
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

export interface IShowClubQuery_clubByID_clubsubscription {
  __typename: "ClubSubscription";
  name: string | null;
  price: number;
  clubSubscriptionId: any;
  clubId: any;
}

export interface IShowClubQuery_clubByID_user {
  __typename: "identity_ApplicationUser";
  id: string | null;
  email: string | null;
}

export interface IShowClubQuery_clubByID {
  __typename: "Club";
  address: string | null;
  accountNumber: string | null;
  adminId: any;
  clubId: any;
  name: string | null;
  phoneNumber: string | null;
  registrationNumber: string | null;
  clubsubscription: (IShowClubQuery_clubByID_clubsubscription | null)[] | null;
  description: string | null;
  user: IShowClubQuery_clubByID_user | null;
}

export interface IShowClubQuery_eventsForClub_eventPrices {
  __typename: "EventPrice";
  price: number;
  clubSubscriptionId: any;
}

export interface IShowClubQuery_eventsForClub {
  __typename: "Event";
  description: string | null;
  eventId: any;
  name: string | null;
  eventPrices: (IShowClubQuery_eventsForClub_eventPrices | null)[] | null;
}

export interface IShowClubQuery_currentUser_permissions {
  __typename: "permission_Role";
  clubSubscriptionId: any | null;
  clubId: any;
}

export interface IShowClubQuery_currentUser {
  __typename: "identity_ApplicationUser";
  id: string | null;
  name: string | null;
  permissions: (IShowClubQuery_currentUser_permissions | null)[] | null;
}

export interface IShowClubQuery {
  clubByID: IShowClubQuery_clubByID | null;
  eventsForClub: (IShowClubQuery_eventsForClub | null)[] | null;
  currentUser: IShowClubQuery_currentUser | null;
}

export interface IShowClubQueryVariables {
  clubByID: any;
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
// GraphQL query operation: IEventListQuery
// ====================================================

export interface IEventListQuery_eventsConfirmed_eventPrices {
  __typename: "EventPrice";
  price: number;
  clubSubscriptionId: any;
}

export interface IEventListQuery_eventsConfirmed {
  __typename: "Event";
  eventId: any;
  name: string | null;
  description: string | null;
  eventPrices: (IEventListQuery_eventsConfirmed_eventPrices | null)[] | null;
}

export interface IEventListQuery {
  eventsConfirmed: (IEventListQuery_eventsConfirmed | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IEventPageInfoQuery
// ====================================================

export interface IEventPageInfoQuery_currentUser_permissions {
  __typename: "permission_Role";
  clubSubscriptionId: any | null;
  clubId: any;
}

export interface IEventPageInfoQuery_currentUser {
  __typename: "identity_ApplicationUser";
  permissions: (IEventPageInfoQuery_currentUser_permissions | null)[] | null;
}

export interface IEventPageInfoQuery_clubByID_clubsubscription {
  __typename: "ClubSubscription";
  name: string | null;
  price: number;
  clubSubscriptionId: any;
  clubId: any;
}

export interface IEventPageInfoQuery_clubByID {
  __typename: "Club";
  clubId: any;
  name: string | null;
  address: string | null;
  clubsubscription: (IEventPageInfoQuery_clubByID_clubsubscription | null)[] | null;
}

export interface IEventPageInfoQuery {
  currentUser: IEventPageInfoQuery_currentUser | null;
  clubByID: IEventPageInfoQuery_clubByID | null;
}

export interface IEventPageInfoQueryVariables {
  clubByID: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IEventPageQuery
// ====================================================

export interface IEventPageQuery_getEvent_locations_event {
  __typename: "Event";
  name: string | null;
}

export interface IEventPageQuery_getEvent_locations {
  __typename: "RoomEvent";
  eventId: any;
  event: IEventPageQuery_getEvent_locations_event | null;
  roomId: any;
}

export interface IEventPageQuery_getEvent_instructorForEvents_user {
  __typename: "identity_ApplicationUser";
  id: string | null;
  name: string | null;
}

export interface IEventPageQuery_getEvent_instructorForEvents {
  __typename: "InstructorForEvent";
  instructorId: any;
  user: IEventPageQuery_getEvent_instructorForEvents_user;
}

export interface IEventPageQuery_getEvent_eventPrices {
  __typename: "EventPrice";
  price: number;
  clubSubscriptionId: any;
}

export interface IEventPageQuery_getEvent {
  __typename: "Event";
  eventId: any;
  clubId: any;
  name: string | null;
  description: string | null;
  startTime: any;
  endTime: any;
  publicPrice: number | null;
  locations: (IEventPageQuery_getEvent_locations | null)[] | null;
  instructorForEvents: (IEventPageQuery_getEvent_instructorForEvents | null)[] | null;
  eventPrices: (IEventPageQuery_getEvent_eventPrices | null)[] | null;
}

export interface IEventPageQuery {
  getEvent: IEventPageQuery_getEvent | null;
}

export interface IEventPageQueryVariables {
  eventId: any;
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
  clubId: any;
  clubSubscriptionId: any;
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
  clubSubscriptionId: any;
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
  clubSubscriptionId: any;
}

export interface ISubscriptionsForClubQuery {
  subscriptionsForClub: (ISubscriptionsForClubQuery_subscriptionsForClub | null)[] | null;
}

export interface ISubscriptionsForClubQueryVariables {
  clubId: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateClubMemberRequestInput {
  clubSubscriptionId: any;
  userId: any;
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
  clubId: any;
  name: string;
  price: number;
  referenceId?: any | null;
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

export interface SignUpSubscriptionRequestInput {
  clubSubscriptionId: any;
  paymentMethodId: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
