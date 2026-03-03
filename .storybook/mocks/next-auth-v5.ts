export const auth = async () => {
  return {
    user: {
      id: 'user-id',
      name: 'Mateus Domingos',
      email: 'mateus@test.com',
      image: 'https://avatars.githubusercontent.com/u/29188043',
    },
    expires: new Date(Date.now() + 3600 * 1000).toISOString(),
  };
};

export default function NextAuth() {
  return {
    auth,
    handlers: {},
    signIn: async () => {},
    signOut: async () => {},
  };
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class CredentialsSignin extends AuthError {
  code = 'CredentialsSignin';
}

export const Credentials = () => ({});
export const GitHub = () => ({});
export const Google = () => ({});

export const handlers = {};
export const signIn = async () => {};
export const signOut = async () => {};
