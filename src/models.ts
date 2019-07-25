export const DEFAULT_PICTURE_URL = '/assets/default-profile-pic.svg';

export interface Profile {
  name?: string;
  picture?: string;
  pictureId?: string;
}

export interface StudentData {
  _id?: string;
  name?: string;
  username?: string;
}

export enum MessageType {
  TEXT = <any>'text',
  LOCATION = <any>'location',
  PICTURE = <any>'picture'
}

export interface Chat {
  _id?: string;
  title?: string;
  picture?: string;
  lastMessage?: Message;
  memberIds?: string[];
}

export interface Message {
  _id?: string;
  chatId?: string;
  senderId?: string;
  content?: string;
  createdAt?: Date;
  type?: MessageType
  ownership?: string;
}
export interface Course {
  _id?: string;
  name?: string;
  description?: string;
  ownership?: string;
}

export interface CourseSubject {
  _id?: string;
  name?: string;
  description?: string;
  courseId?: string;
}

export enum QuestionType {
  OPEN_ENDED = <any>'OPEN_ENDED',
  MULTIPLE_CHOICE = <any>'MULTIPLE_CHOICE',
  BROKEN_PASSAGE = <any>'BROKEN_PASSAGE',
  MATCHING = <any>'MATCHING'
}

interface Question {
  id?: string;
  type?: QuestionType;
  query?: any;
  answer?: any;
  payload?: any;
}

export interface QuestionChoice {
  id?: string;
  choice?: string;
  isCorrect?: boolean;
}

export interface Assignment {
  id?: string;
  title?: string;
  questions?: Question[];
}

export enum RolesEnum {
  ADMIN = <any>'ADMIN',
  SUPER_ADMIN = <any>'SUPER_ADMIN',
  TUTOR = <any>'TUTOR',
  STUDENT = <any>'STUDENT',
  PARENT = <any>'PARENT'
}

export enum ActionPermissionsEnum {
      CREATE= <any>'CREATE',
      VIEW= <any>'VIEW',
      UPDATE= <any>'UPDATE',
      DELETE= <any>'DELETE'
}

export interface Role {
  _id?: string;
  name?: RolesEnum,
  permissions?: ActionPermission
}

export interface ActionPermission {
  _id?: string;
  permission?: ActionPermissionsEnum
}

export interface User extends Meteor.User {
  profile?: Profile,
  roleId?: [string]
}

export interface Location {
  lat: number;
  lng: number;
  zoom: number;
}

export interface Picture {
  _id?: string;
  complete?: boolean;
  extension?: string;
  name?: string;
  progress?: number;
  size?: number;
  store?: string;
  token?: string;
  type?: string;
  uploadedAt?: Date;
  uploading?: boolean;
  url?: string;
  userId?: string;
}

export enum TransactionType {
  BALANCE_INQUIRY = <any>'BALANCE_INQUIRY',
  FUNDS_TRANSFER = <any>'FUNDS_TRANSFER'
}

export enum TransactionDirection {
  FORWARD= <any>'FORWARD',
  REVERSAL= <any>'REVERSAL'
}

interface TransactionHeader {
  direction?: TransactionDirection,
  isRetry?: boolean,
  retryCount?: number
}

export enum TransactionStatus {
  POSTED = <any>'POSTED',
  PROCESSING = <any>'PROCESSING',
  PROCESSED = <any>'PROCESSED',
  FAILED = <any>'FAILED'
}

export interface Transaction {
  _id?: string;
  initiatorId?: string;
  refId?: string;
  header?: TransactionHeader;
  payload?: any;
  type: TransactionType,
  status: TransactionStatus
}

export interface TransactionReference {
  _id?: string,
  createdAt: Date
}

export interface TransactionAccount {
  _id?: string,
  ownerId: string,
  accountNumber?: string,
  actualBalance?: number,
  availableBalance?: number
}



/*
HIV DB
*/
export interface Predition {
  _id?: string,
  requestedBy: string,
  request: any,
  response: any,
  createdAt: Date

}
