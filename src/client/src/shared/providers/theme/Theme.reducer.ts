import { ETheme } from './types/Theme.enum';
import { EThemeAction } from './types/ThemeAction.enum';
import { FThemeReducer } from './types/ThemeReducer.type';

export const themeReducer: FThemeReducer = (state, action) => {
  switch (action.type) {
    case EThemeAction.Switch:
      return state === ETheme.Dark ? ETheme.Light : ETheme.Dark;
    case EThemeAction.Set:
      return action.payload || state;
    default:
      return state;
  }
};
