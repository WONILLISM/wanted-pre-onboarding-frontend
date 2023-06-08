import { ReactNode, createContext, useState } from "react";

export interface User {
  token: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

const initialAuthState: AuthState = {
  user: null,
  setUser: () => {},
};

export const AuthContext = createContext<AuthState>(initialAuthState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(initialAuthState.user);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
