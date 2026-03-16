const TOKEN_KEY = 'jwt_token';
const TOKEN_EXPIRY_KEY = 'jwt_token_expiry';
const TOKEN_TTL = 1000 * 60 * 60 * 24;
//const TOKEN_TTL = 1000 * 60;

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXPIRY_KEY, String(Date.now() + TOKEN_TTL));
};

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;

  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (expiry && Date.now() > Number(expiry)) {
    removeToken();
    return null;
  }

  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
};
