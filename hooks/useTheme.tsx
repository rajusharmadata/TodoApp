import { View, Text } from 'react-native'
import React, {
  createContext, ReactNode, useContext, useEffect,
  useState
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
export interface ColorScheme {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
  gradients: {
    background: [string, string];
    surface: [string, string];
    primary: [string, string];
    success: [string, string];
    warning: [string, string];
    danger: [string, string];
    muted: [string, string];
    empty: [string, string];
  };
  backgrounds: {
    input: string;
    editInput: string;
  };
  statusBarStyle: 'light-content' | 'dark-content';
}

const lightColors: ColorScheme = {
  bg: '#fafbfc',
  surface: '#ffffff',
  text: '#1a202c',
  textMuted: '#4a5568',
  border: '#e2e8f0',
  primary: '#4f46e5',
  success: '#059669',
  warning: '#d97706',
  danger: '#dc2626',
  shadow: '#000000',
  gradients: {
    background: ['#fafbfc', '#f7fafc'],
    surface: ['#ffffff', '#fafbfc'],
    primary: ['#4f46e5', '#3730a3'],
    success: ['#059669', '#047857'],
    warning: ['#d97706', '#b45309'],
    danger: ['#dc2626', '#b91c1c'],
    muted: ['#94a3b8', '#64748b'],
    empty: ['#f8fafc', '#f1f5f9'],
  },
  backgrounds: {
    input: '#ffffff',
    editInput: '#ffffff',
  },
  statusBarStyle: 'dark-content' as const,
};

const darkColors: ColorScheme = {
  bg: '#0a0e1a',
  surface: '#1a1f2e',
  text: '#f8fafc',
  textMuted: '#a1a8b0',
  border: '#2d3748',
  primary: '#6366f1',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#f56565',
  shadow: '#000000',
  gradients: {
    background: ['#0a0e1a', '#1a1f2e'],
    surface: ['#1a1f2e', '#2d3748'],
    primary: ['#6366f1', '#4338ca'],
    success: ['#10b981', '#047857'],
    warning: ['#f59e0b', '#d97706'],
    danger: ['#f56565', '#e53e3e'],
    muted: ['#4a5568', '#2d3748'],
    empty: ['#2d3748', '#4a5568'],
  },
  backgrounds: {
    input: '#1a1f2e',
    editInput: '#0a0e1a',
  },
  statusBarStyle: 'light-content' as const,
};

interface ThemeContextType{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: ColorScheme,

}
// create a context
const ThemeContext = createContext<undefined | ThemeContextType>(undefined)
  // check the type which is wrong and write
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // when page is load at first time the it is recode it
  useEffect(() => {
    // setIsDarkMode default
     AsyncStorage.getItem('isDarkMode').then(value => {
      // again change when value is exist
      if(value)setIsDarkMode(JSON.parse(value))
    });
  },[])

  // toggle method for the change the light mode and dark mode method
  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("isDarkMode", JSON.stringify(newMode))
  };
  // color variable it  is store the data which is the colors
  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );

}



// use them method for the use them
const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("username must be used within a ThemeProvider")
  }
  return context;
}

export default useTheme
