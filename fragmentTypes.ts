export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
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

export type Color = {
  __typename?: 'Color';
  id: Scalars['ID'];
  slug: Scalars['String'];
  name: Scalars['String'];
  garments: Array<Garment>;
};

export type CreateGarmentImageInput = {
  garmentId?: Maybe<Scalars['String']>;
  imageName: Scalars['String'];
  imageUrl: Scalars['String'];
};

export type CreateGarmentImageResult = GarmentImage | InvalidGarmentError | UnauthorizedError | FallBackServerError;

export type CreateGarmentInput = {
  ownerId: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  brandId: Scalars['String'];
  colorId: Scalars['String'];
  subCategoryId: Scalars['String'];
  garmentImageIds?: Maybe<Array<Scalars['String']>>;
};

export type CreateGarmentResult = Garment | InvalidSubcategoryError | InvalidBrandError | InvalidColorError | InvalidOwnerError | UnauthorizedError | FallBackServerError;

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
  color: Color;
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
  url: Scalars['String'];
  name: Scalars['String'];
  garment?: Maybe<Garment>;
};

export type GarmentNotFoundError = {
  __typename?: 'GarmentNotFoundError';
  type: Scalars['String'];
  reason: Scalars['String'];
  message: Scalars['String'];
  responseType: Scalars['String'];
};

export type GarmentResult = Garment | GarmentNotFoundError | FallBackServerError;

export type GarmentSubCategory = {
  __typename?: 'GarmentSubCategory';
  id: Scalars['ID'];
  slug: Scalars['String'];
  name: Scalars['String'];
  parentCategory: GarmentCategory;
  garments: Array<Garment>;
};

export type GetUserByIdResult = User | UserNotFoundError;

export type InvalidBrandError = {
  __typename?: 'InvalidBrandError';
  responseType: Scalars['String'];
  type: ErrorSource;
  reason: Scalars['String'];
};

export type InvalidColorError = {
  __typename?: 'InvalidColorError';
  responseType: Scalars['String'];
  type: ErrorSource;
  reason: Scalars['String'];
};

export type InvalidGarmentError = {
  __typename?: 'InvalidGarmentError';
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
  createGarmentImage: CreateGarmentImageResult;
  createGarment: CreateGarmentResult;
  updateGarment: UpdateGarmentResult;
  createUser: CreateUserResult;
  loginUser: LoginUserResult;
};


export type MutationCreateGarmentImageArgs = {
  garmentImageData: CreateGarmentImageInput;
};


export type MutationCreateGarmentArgs = {
  garmentData: CreateGarmentInput;
};


export type MutationUpdateGarmentArgs = {
  garmentData: UpdateGarmentInput;
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
  getBrands: Array<Brand>;
  getCategories: Array<GarmentCategory>;
  getColors: Array<Color>;
  getGarmentById: GarmentResult;
  getUserById: GetUserByIdResult;
  healthCheck: Scalars['String'];
};


export type QueryGetBrandsArgs = {
  query: Scalars['String'];
};


export type QueryGetColorsArgs = {
  query: Scalars['String'];
};


export type QueryGetGarmentByIdArgs = {
  garmentId: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['String'];
};

export type UnauthorizedError = {
  __typename?: 'UnauthorizedError';
  responseType: Scalars['String'];
  type: Scalars['String'];
  reason: Scalars['String'];
  message: Scalars['String'];
};

export type UpdateGarmentInput = {
  ownerId: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  brandId: Scalars['String'];
  colorId: Scalars['String'];
  subCategoryId: Scalars['String'];
  garmentImageIds?: Maybe<Array<Scalars['String']>>;
  garmentId: Scalars['String'];
};

export type UpdateGarmentResult = Garment | InvalidSubcategoryError | InvalidGarmentError | InvalidBrandError | InvalidColorError | InvalidOwnerError | UnauthorizedError | FallBackServerError;

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
        "name": "GarmentResult",
        "possibleTypes": [
          {
            "name": "Garment"
          },
          {
            "name": "GarmentNotFoundError"
          },
          {
            "name": "FallBackServerError"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "GetUserByIdResult",
        "possibleTypes": [
          {
            "name": "User"
          },
          {
            "name": "UserNotFoundError"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "CreateGarmentImageResult",
        "possibleTypes": [
          {
            "name": "GarmentImage"
          },
          {
            "name": "InvalidGarmentError"
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
            "name": "InvalidColorError"
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
        "name": "UpdateGarmentResult",
        "possibleTypes": [
          {
            "name": "Garment"
          },
          {
            "name": "InvalidSubcategoryError"
          },
          {
            "name": "InvalidGarmentError"
          },
          {
            "name": "InvalidBrandError"
          },
          {
            "name": "InvalidColorError"
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
    