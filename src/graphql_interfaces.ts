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
  id: string | null;
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

export interface IShowClubQuery_clubByID_clubsubscription {
  __typename: "ClubSubscription";
  name: string | null;
  price: number;
  clubSubscriptionId: string;
  clubId: string;
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
  adminId: string;
  clubId: string;
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
  clubSubscriptionId: string;
}

export interface IShowClubQuery_eventsForClub {
  __typename: "Event";
  description: string | null;
  eventId: string;
  name: string | null;
  eventPrices: (IShowClubQuery_eventsForClub_eventPrices | null)[] | null;
}

export interface IShowClubQuery_currentUser_permissions {
  __typename: "permission_Role";
  clubSubscriptionId: string | null;
  clubId: string;
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
  clubByID: string;
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
// GraphQL mutation operation: ISignUpForEventMutationService
// ====================================================

export interface ISignUpForEventMutationService_signUpForEvent {
  __typename: "PaymentIntentResponse";
  price: number;
  clientSecret: string | null;
}

export interface ISignUpForEventMutationService {
  signUpForEvent: ISignUpForEventMutationService_signUpForEvent | null;
}

export interface ISignUpForEventMutationServiceVariables {
  eventId: string;
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
  clubSubscriptionId: string;
}

export interface IEventListQuery_eventsConfirmed {
  __typename: "Event";
  eventId: string;
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

export interface IEventPageInfoQuery_currentUser_events {
  __typename: "EventVerification";
  code: string | null;
  eventVerificationId: number;
  eventId: string;
}

export interface IEventPageInfoQuery_currentUser_permissions {
  __typename: "permission_Role";
  clubSubscriptionId: string | null;
  clubId: string;
}

export interface IEventPageInfoQuery_currentUser {
  __typename: "identity_ApplicationUser";
  events: (IEventPageInfoQuery_currentUser_events | null)[] | null;
  permissions: (IEventPageInfoQuery_currentUser_permissions | null)[] | null;
}

export interface IEventPageInfoQuery_clubByID_clubsubscription {
  __typename: "ClubSubscription";
  name: string | null;
  price: number;
  clubSubscriptionId: string;
  clubId: string;
}

export interface IEventPageInfoQuery_clubByID {
  __typename: "Club";
  clubId: string;
  name: string | null;
  address: string | null;
  clubsubscription: (IEventPageInfoQuery_clubByID_clubsubscription | null)[] | null;
}

export interface IEventPageInfoQuery {
  currentUser: IEventPageInfoQuery_currentUser | null;
  clubByID: IEventPageInfoQuery_clubByID | null;
}

export interface IEventPageInfoQueryVariables {
  clubByID: string;
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
  eventId: string;
  name: string | null;
}

export interface IEventPageQuery_getEvent_locations_room {
  __typename: "Room";
  name: string | null;
  roomId: string;
}

export interface IEventPageQuery_getEvent_locations {
  __typename: "RoomEvent";
  event: IEventPageQuery_getEvent_locations_event | null;
  room: IEventPageQuery_getEvent_locations_room;
}

export interface IEventPageQuery_getEvent_instructorForEvents_user {
  __typename: "identity_ApplicationUser";
  id: string | null;
  name: string | null;
}

export interface IEventPageQuery_getEvent_instructorForEvents {
  __typename: "InstructorForEvent";
  instructorId: string;
  user: IEventPageQuery_getEvent_instructorForEvents_user | null;
}

export interface IEventPageQuery_getEvent_eventPrices {
  __typename: "EventPrice";
  price: number;
  clubSubscriptionId: string;
}

export interface IEventPageQuery_getEvent {
  __typename: "Event";
  eventId: string;
  clubId: string;
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
  eventId: string;
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
  user: IMembersForClubQuery_membersForClub_user | null;
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
