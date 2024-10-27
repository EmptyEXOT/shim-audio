import { FC, ReactNode, useEffect, useReducer } from 'react';
import { ReduceThemeContext } from '../ReduceTheme.contex';
import { ThemeContext } from '../Theme.context';
import { themeReducer } from '../Theme.reducer';
import { ETheme } from '../types/Theme.enum';
import { EThemeAction } from '../types/ThemeAction.enum';

export interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const [state, dispatch] = useReducer(themeReducer, ETheme.Light);

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem('theme') as ETheme) || ETheme.Light;
    dispatch({ type: EThemeAction.Set, payload: savedTheme });
    document.documentElement.classList.toggle('dark', savedTheme === 'dark'); // Устанавливаем класс
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', state); // Сохраняем тему
    document.documentElement.classList.toggle('dark', state === 'dark'); // Устанавливаем класс
  }, [state]);

  return (
    <ThemeContext.Provider value={state}>
      <ReduceThemeContext.Provider value={dispatch}>
        {props.children}
      </ReduceThemeContext.Provider>
    </ThemeContext.Provider>
  );
};
