import { ReactNode, createContext, useState } from "react";

interface AuthState {
  authenticated: boolean;
  setAuthenticated: (isAuth: boolean) => void;
}

const initialAuthState: AuthState = {
  authenticated: false,
  setAuthenticated: () => {},
};

export const AuthContext = createContext<AuthState>(initialAuthState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(
    initialAuthState.authenticated
  );

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
