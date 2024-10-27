import { Toggle } from '@/shared/component/toggle';
import { useTheme } from '@/shared/providers/theme/hooks/useTheme';
import { useThemeDispatch } from '@/shared/providers/theme/hooks/useThemeDispatch';
import { ETheme } from '@/shared/providers/theme/types/Theme.enum';
import { EThemeAction } from '@/shared/providers/theme/types/ThemeAction.enum';
import { FC, useCallback } from 'react';

export interface ThemeToggleProps {
  name: string;
}

export const ThemeToggle: FC<ThemeToggleProps> = (props) => {
  const dispatchTheme = useThemeDispatch();
  const theme = useTheme();

  const onToggle = useCallback(() => {
    dispatchTheme({ type: EThemeAction.Switch });
  }, [dispatchTheme]);

  return (
    <Toggle
      onToggle={onToggle}
      isActive={theme === ETheme.Dark}
      name={props.name}
    >
      <Toggle.Base>
        <Toggle.Handler />
      </Toggle.Base>
    </Toggle>
  );
};