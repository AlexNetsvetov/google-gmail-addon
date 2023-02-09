import { ActionNameEnum, dispatchActionInternal_ } from './actionHandlers';
import { logout } from './api';

export function onHomePageOpen() {
  return dispatchActionInternal_({ action: ActionNameEnum.SHOW_AUTH_PAGE });
}

export function handleLogout() {
  logout();

  return CardService.newNavigation()
    .popToRoot()
    .updateCard(
      dispatchActionInternal_({ action: ActionNameEnum.SHOW_AUTH_PAGE })
    );
}
