// @ts-ignore
import { BASE_URL, BASE_URL_PREFIX, oroClient, sendRequest } from './client';
import { urlParams } from '../utils';

export function logout() {
  const client = oroClient();

  if (!client.hasAccess()) {
    return;
  }

  client.reset();
}

export function getUsers() {
  const url = `${BASE_URL}/${BASE_URL_PREFIX}/api/users${urlParams({
    'page[number]': 1,
    'page[size]': 10,
    sort: 'id',
  })}`;

  return sendRequest(url);
}

export function getSearch(input: string) {
  const url = `${BASE_URL}/${BASE_URL_PREFIX}/api/search${urlParams({
    'filter[searchText]': input,
  })}`;

  return sendRequest(url);
}

// TODO: get locales
export function getLocales() {}
