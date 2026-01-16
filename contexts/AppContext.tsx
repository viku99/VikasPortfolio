
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextType {
  isReelPlaying: boolean;
  playReel: () => void;
  stopReel: () => void;
  cursorVariant: string;
  setCursorVariant: (variant: string) => void;
  // Singleton Video State
  activeVideoId: string | null;
  setActiveVideoId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isReelPlaying, setIsReelPlaying] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const playReel = () => setIsReelPlaying(true);
  const stopReel = () => setIsReelPlaying(false);

  return (
    <AppContext.Provider 
      value={{ 
        isReelPlaying, 
        playReel, 
        stopReel, 
        cursorVariant, 
        setCursorVariant,
        activeVideoId,
        setActiveVideoId
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
