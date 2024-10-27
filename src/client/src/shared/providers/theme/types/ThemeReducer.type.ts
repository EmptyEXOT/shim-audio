import { ETheme } from './Theme.enum';
import { ThemeAction } from './ThemeAction.interface';

export type FThemeReducer = (state: ETheme, action: ThemeAction) => ETheme;
