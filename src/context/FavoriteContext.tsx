import React from 'react';
import { ReactNode } from 'react';

import { loadFavoriteIds, saveFavoriteIds } from '../services/favorite';


export const FavoriteContext = React.createContext<any>(null);


export function FavoriteProvider({ children }: { children: ReactNode }) {

  const [favorites, setFavorites] = React.useState<string[]>([]);

  React.useEffect(() => {
    loadFavoriteIds().then(setFavorites);
  }, []);

  const toggleFavorite = (idMeal : string) => {
    setFavorites((current) => {
      const next = current.includes(idMeal)
        ? current.filter(id => id !== idMeal)
        : [...current, idMeal];

      saveFavoriteIds(next);
      return next;
    });
  }

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}