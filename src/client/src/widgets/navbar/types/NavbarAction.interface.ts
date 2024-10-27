import { ENavbarAction } from './NavbarAction.enum';
import { NavbarState } from './NavbarState.interface';

export interface NavbarAction {
  type: ENavbarAction;
  payload: Partial<NavbarState>;
}
