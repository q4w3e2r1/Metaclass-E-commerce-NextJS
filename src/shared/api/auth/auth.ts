import { api } from '../axios';

type AuthResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

export const register = async (data: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const res = await api.post('/auth/local/register', data);
  return res.data;
};

export const login = async (data: {
  identifier: string;
  password: string;
}): Promise<AuthResponse> => {
  const res = await api.post('/auth/local', data);
  return res.data;
};
