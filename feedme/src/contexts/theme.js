import { createContext, useEffect, useState } from "react";

const themes = {
    dark: {
        backgroundColor: "black", 
        color: "white", 
    }, 
    light: {
        backgroundColor: "white", 
        color: "black", 
    },
}; 

export const ThemeContext = createContext();  //Will bring the global propery to all our components 

export const ThemeProvider = ({children}) => { //A React component - wraps the app with our themeProvider 
    const [isDark, setIsDark] = useState(false); //False makes the default state light theme
    const theme = isDark ? themes.dark : themes.light; 
    const toggleTheme = () => {
        localStorage.setItem("isDark", JSON.stringify(!isDark)); 
        setIsDark(!isDark); 
    }; 

    useEffect(() => {
        const isDark = localStorage.getItem("isDark") === "true"
        setIsDark(isDark); 
    },[]); 

    return (
        <ThemeContext.Provider value={[{ theme, isDark }, toggleTheme]}>
            {children}
        </ThemeContext.Provider>
    )
}; 