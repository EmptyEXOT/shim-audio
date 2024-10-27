import { ENavbarAction } from '../types/NavbarAction.enum';
import { FNavbarReducer } from '../types/NavbarReducer.type';

export const navbarReducer: FNavbarReducer = (state, action) => {
  switch (action.type) {
    case ENavbarAction.SwitchIsOpen:
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
};
