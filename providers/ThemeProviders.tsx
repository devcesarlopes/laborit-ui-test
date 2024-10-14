import React, { createContext, useEffect } from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { themes } from "@/color-theme";

interface ThemeProviderProps {
  children: React.ReactNode;
  theme: 'light' | 'dark';
}
export const ThemeContext = createContext<{
  theme: "light" | "dark" | undefined;
}>({
  theme: "light",
});
export const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {
  const { colorScheme } = useColorScheme();
  return (
    <ThemeContext.Provider value={{ theme: colorScheme }}>
      <View style={themes[theme]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};