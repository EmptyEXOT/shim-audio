import { ETheme } from './Theme.enum';
import { EThemeAction } from './ThemeAction.enum';

export interface ThemeAction {
  type: EThemeAction;
  payload?: ETheme;
}
