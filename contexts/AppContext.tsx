
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of our application context
interface AppContextType {
  isReelPlaying: boolean;
  playReel: () => void;
  stopReel: () => void;
  // cursorVariant tracks the current visual state of the custom cursor (e.g., 'default', 'link', 'text')
  cursorVariant: string;
  setCursorVariant: (variant: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isReelPlaying, setIsReelPlaying] = useState(false);
  // Initialize cursor state to 'default'
  const [cursorVariant, setCursorVariant] = useState('default');

  const playReel = () => setIsReelPlaying(true);
  const stopReel = () => setIsReelPlaying(false);

  return (
    <AppContext.Provider 
      value={{ 
        isReelPlaying, 
        playReel, 
        stopReel, 
        cursorVariant, 
        setCursorVariant 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
