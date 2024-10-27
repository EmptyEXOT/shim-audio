import { NavbarAction } from './NavbarAction.interface';
import { NavbarState } from './NavbarState.interface';

export type FNavbarReducer = (
  state: NavbarState,
  action: NavbarAction
) => NavbarState;
