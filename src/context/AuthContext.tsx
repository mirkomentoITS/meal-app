import React from 'react';
import { ReactNode } from 'react';

import { validateLogin } from '../services/auth';
import { saveUser, loadUser, deleteUser } from '../services/user';


interface User {
  name: string;
  email: string;
  avatarUri: string;
}


export const AuthContext = React.createContext<any>(null);


export function AuthProvider({ children }: {children : ReactNode}) {

  const [user, setUser] = React.useState<User|null>(null);

  React.useEffect(() => {
     loadUser().then(setUser);
    }, []);

  const login = (email: string, password: string): boolean => {
    const found = validateLogin(email, password);
    if (found) {
      setUser({
        name: found.name,
        email: found.email,
        avatarUri: found.avatarUri
      });
      saveUser(found); 
      return true;
    }
    return false;
  }

  const logout = () => {
    setUser(null);
    deleteUser();  
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}