import { oroClient } from './api';
import { createAuthorizationCard, createSearchCard } from './views';

export enum ActionNameEnum {
  SHOW_HOME_PAGE = 'showHomePage',
  SHOW_AUTH_PAGE = 'showAuthPage',
  SHOW_SEARCH_PAGE = 'showSearchPage',
}

interface ActionEvent {
  action: ActionNameEnum;
  payload?: any;
}

type ActionHandlerType = (
  payload: ActionEvent['payload']
) => GoogleAppsScript.Card_Service.Card;
type ErrorHandler = (exception: Error) => GoogleAppsScript.Card_Service.Card;

export const ActionHandlers: Record<ActionNameEnum, ActionHandlerType> = {
  [ActionNameEnum.SHOW_HOME_PAGE]: () => {
    return createSearchCard({});
  },
  [ActionNameEnum.SHOW_AUTH_PAGE]: () => {
    const baseUrl =
      PropertiesService.getUserProperties().getProperty('oroServiceUrl');
    Logger.log(`base url from store: ${baseUrl}`);

    if (!baseUrl) {
      return createAuthorizationCard();
    }

    const client = oroClient();

    Logger.log(`access: ${client.hasAccess()}`);

    if (client.hasAccess()) {
      return dispatchActionInternal_({ action: ActionNameEnum.SHOW_HOME_PAGE });
    }

    return createAuthorizationCard(baseUrl);
  },
  [ActionNameEnum.SHOW_SEARCH_PAGE]: () => {
    return createSearchCard({});
  },
};

export function dispatchActionInternal_(
  event: ActionEvent,
  errorHandler?: ErrorHandler
) {
  try {
    const { action, payload } = event;

    if (!action) {
      throw new Error('Missing action name.');
    }

    const actionFn = ActionHandlers[action];

    if (!actionFn) {
      throw new Error('Action not found: ' + action);
    }

    return actionFn(payload);
  } catch (err) {
    Logger.log(err);

    if (errorHandler) {
      return errorHandler(err);
    } else {
      throw err;
    }
  }
}
