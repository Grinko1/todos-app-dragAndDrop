import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {

    theme: Theme;
    toggleTheme: (saveAction?: (theme: Theme) => void) => void;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = (saveAction?: (theme: Theme) => void) => {
        let newTheme: Theme;
        switch (theme) {
            case Theme.DARK:
                newTheme = Theme.LIGHT;
                break;
            case Theme.LIGHT:
                newTheme = Theme.DARK;
                break;
            default:
                newTheme = Theme.DARK;
        }
        setTheme?.(newTheme);
        console.log(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
        saveAction?.(newTheme)
    };
    return {
        theme: theme || Theme.DARK,
        toggleTheme,
    };
}
