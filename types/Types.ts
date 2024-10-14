export interface User {
    avatar: string;
    collectionId: string;
    collectionName: string;
    created: string;
    email: string;
    name: string;
    emailVisibility: boolean;
    expand?: {};
    id: string;
    updated: string;
    username: string;
    verified: boolean;
  }

export interface AuthProvider {
  authUrl: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  codeVerifier: string;
  displayName: string;
  name: string;
  state: string;
}

export interface AuthMethods {
  authProviders: AuthProvider[];
  emailPassword: boolean;
  onlyVerified: boolean;
  usernamePassword: boolean;
}

export interface OauthResponse {
  meta: {
    accessToken: string;
    avatarUrl: string;
    email: string;
    expiry: string;
    id: string;
    isNew: boolean;
    name: string;
    rawUser: {
      email: string;
      family_name: string;
      given_name: string;
      id: string;
      name: string;
      picture: string;
      verified_email: boolean;
    }
    refreshToken: string;
    username: string;
  }
  record: {
    avatar: string;
    collectionId: string;
    collectionName: string;
    created: string;
    email: string;
    emailVisibility: boolean;
    id: string;
    name: string;
    updated: string;
    username: string;
    verified: boolean;
  }
  token: string;
}