export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CreateDiceInput = {
  diceSetId: Scalars['String'];
  name: Scalars['String'];
  sides: Scalars['Int'];
};

export type CreateDiceSetInput = {
  name: Scalars['String'];
  privacy?: InputMaybe<Privacy>;
};

export type CreateRollInput = {
  diceId: Scalars['String'];
  result: Scalars['Int'];
};

export type CreateUser = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type Dice = {
  __typename?: 'Dice';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  rolls?: Maybe<Array<Roll>>;
  set: DiceSet;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DiceSet = {
  __typename?: 'DiceSet';
  createdAt: Scalars['DateTime'];
  dice: Array<Dice>;
  id: Scalars['ID'];
  name: Scalars['String'];
  owner: User;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDice?: Maybe<Dice>;
  createDiceSet: DiceSet;
  createRoll: Roll;
  createUser: User;
  deleteDiceSet: DiceSet;
  deleteUser: Scalars['Boolean'];
  loginJwt: Scalars['String'];
  loginMagic: Scalars['Boolean'];
  resendMagic: Scalars['Boolean'];
  updateDiceSet: DiceSet;
  validateMagic: Scalars['String'];
};

export type MutationCreateDiceArgs = {
  input: CreateDiceInput;
};

export type MutationCreateDiceSetArgs = {
  input: CreateDiceSetInput;
};

export type MutationCreateRollArgs = {
  input: CreateRollInput;
};

export type MutationCreateUserArgs = {
  user: CreateUser;
};

export type MutationDeleteDiceSetArgs = {
  id: Scalars['String'];
};

export type MutationLoginJwtArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationLoginMagicArgs = {
  email: Scalars['String'];
};

export type MutationResendMagicArgs = {
  email: Scalars['String'];
};

export type MutationUpdateDiceSetArgs = {
  id: Scalars['String'];
  input: UpdateDiceSetInput;
};

export type MutationValidateMagicArgs = {
  slug: Scalars['String'];
};

export enum Privacy {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type Query = {
  __typename?: 'Query';
  getDiceById?: Maybe<Dice>;
  getDiceSetById: DiceSet;
  getDiceSets?: Maybe<Array<DiceSet>>;
  getMe?: Maybe<User>;
  getRollsByDice?: Maybe<Array<Maybe<Roll>>>;
};

export type QueryGetDiceByIdArgs = {
  id: Scalars['String'];
};

export type QueryGetDiceSetByIdArgs = {
  id: Scalars['ID'];
};

export type QueryGetRollsByDiceArgs = {
  diceId: Scalars['String'];
};

export type Roll = {
  __typename?: 'Roll';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  result: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UpdateDiceSetInput = {
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  privacy?: InputMaybe<Privacy>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  ownedSets?: Maybe<Array<DiceSet>>;
};
