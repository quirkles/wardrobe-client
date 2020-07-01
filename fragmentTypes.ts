export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Brand = {
  __typename?: 'Brand';
  id: Scalars['ID'];
  slug: Scalars['String'];
  name: Scalars['String'];
  garments: Array<Garment>;
};

export type CreateGarmentInput = {
  ownerId: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  brandId: Scalars['String'];
  subCategoryId: Scalars['String'];
  imageUrls?: Maybe<Array<Scalars['String']>>;
};

export type CreateGarmentResult = Garment | InvalidSubcategoryError | InvalidBrandError | InvalidOwnerError | UnauthorizedError | FallBackServerError;

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type CreateUserResult = UserAndToken | DuplicateUserError | FallBackServerError;

export type DuplicateUserError = {
  __typename?: 'DuplicateUserError';
  responseType: Scalars['String'];
  type: ErrorSource;
  reason: Scalars['String'];
};

/** Either client or server */
export enum ErrorSource {
  ServerError = 'ServerError',
  ClientError = 'ClientError'
}

export type FallBackServerError = {
  __typename?: 'FallBackServerError';
  responseType: Scalars['String'];
  type: Scalars['String'];
  reason: Scalars['String'];
  message: Scalars['String'];
};

export type Garment = {
  __typename?: 'Garment';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  owner: User;
  brand: Brand;
  category: GarmentCategory;
  subCategory: GarmentSubCategory;
  images: Array<GarmentImage>;
};

export type GarmentCategory = {
  __typename?: 'GarmentCategory';
  id: Scalars['ID'];
  slug: Scalars['String'];
  name: Scalars['String'];
  subCategories: Array<GarmentSubCategory>;
  garments: Array<Garment>;
};

export type GarmentImage = {
  __typename?: 'GarmentImage';
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
  garment: Garment;
};

export type GarmentSubCategory = {
  __typename?: 'GarmentSubCategory';
  id: Scalars['ID'];
  slug: Scalars['String'];
  name: Scalars['String'];
  parentCategory: GarmentCategory;
  garments: Array<Garment>;
};

export type InvalidBrandError = {
  __typename?: 'InvalidBrandError';
  responseType: Scalars['String'];
  type: ErrorSource;
  reason: Scalars['String'];
};

export type InvalidOwnerError = {
  __typename?: 'InvalidOwnerError';
  responseType: Scalars['String'];
  type: ErrorSource;
  reason: Scalars['String'];
};

export type InvalidSubcategoryError = {
  __typename?: 'InvalidSubcategoryError';
  responseType: Scalars['String'];
  type: ErrorSource;
  reason: Scalars['String'];
};

export type LoginUserResult = UserAndToken | UserNotFoundError | FallBackServerError;

export type Mutation = {
  __typename?: 'Mutation';
  createGarment: CreateGarmentResult;
  createUser: CreateUserResult;
  loginUser: LoginUserResult;
};


export type MutationCreateGarmentArgs = {
  input: CreateGarmentInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginUserArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
};

export type UnauthorizedError = {
  __typename?: 'UnauthorizedError';
  responseType: Scalars['String'];
  type: Scalars['String'];
  reason: Scalars['String'];
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  garments: Array<Garment>;
};

export type UserAndToken = {
  __typename?: 'UserAndToken';
  user: User;
  token: Scalars['String'];
};

export type UserNotFoundError = {
  __typename?: 'UserNotFoundError';
  responseType: Scalars['String'];
  type: ErrorSource;
  reason: Scalars['String'];
};


      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "UNION",
        "name": "CreateGarmentResult",
        "possibleTypes": [
          {
            "name": "Garment"
          },
          {
            "name": "InvalidSubcategoryError"
          },
          {
            "name": "InvalidBrandError"
          },
          {
            "name": "InvalidOwnerError"
          },
          {
            "name": "UnauthorizedError"
          },
          {
            "name": "FallBackServerError"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "CreateUserResult",
        "possibleTypes": [
          {
            "name": "UserAndToken"
          },
          {
            "name": "DuplicateUserError"
          },
          {
            "name": "FallBackServerError"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "LoginUserResult",
        "possibleTypes": [
          {
            "name": "UserAndToken"
          },
          {
            "name": "UserNotFoundError"
          },
          {
            "name": "FallBackServerError"
          }
        ]
      }
    ]
  }
};
      export default result;
    