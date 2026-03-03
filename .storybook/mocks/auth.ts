const mockSession = {
  user: {
    id: 'user-id',
    name: 'Mateus Domingos',
    email: 'mateus@test.com',
    image: 'https://avatars.githubusercontent.com/u/29188043',
  },
};

export const auth = async () => {
  return mockSession;
};

export const handlers = {};
export const signIn = async () => {};
