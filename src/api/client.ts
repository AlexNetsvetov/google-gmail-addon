const CLIENT_ID = 'Y6k5msx6tQPpdGN8uQcTrF7X0wzwV-1C';
const CLIENT_SECRET =
  'XOePvlYF9m0LuO2j_mLLv1Zin7PKlOc53XaD4ujVDmpzCgETwuiMMTVRASxKylLN_kZCK2kaYICAs2Zc5J-Sj4';
export const BASE_URL_PREFIX = 'admin';
export const BASE_URL = 'https://dataart.oro-cloud.com';

interface TokenPayload {
  code: string;
}

export function oroClient(prefix: string = BASE_URL_PREFIX) {
  const baseUrl =
    PropertiesService.getUserProperties().getProperty('oroServiceUrl');

  const oauthService: GoogleAppsScriptOAuth2.OAuth2Service =
    OAuth2.createService('oroService')
      .setAuthorizationBaseUrl(
        `${baseUrl}/${prefix}/oauth2-token/authorize?response_type=code`
      )
      .setTokenUrl(`${baseUrl}/oauth2-token`)
      .setTokenPayloadHandler(handleTokenPayload)
      .setClientId(CLIENT_ID)
      .setClientSecret(CLIENT_SECRET)
      .setCallbackFunction('handleOAuthResponse')
      .setPropertyStore(PropertiesService.getUserProperties())
      .setCache(CacheService.getUserCache())
      .setLock(LockService.getUserLock())
      .setGrantType('authorization_code');

  return oauthService;
}

export function handleTokenPayload(payload: TokenPayload) {
  Logger.log('get token');
  const code = oroClient().getStorage().getValue('code');
  const newPayload = {
    ...payload,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
  };

  Logger.log(`newPayload: ${JSON.stringify(newPayload)}`);
  return newPayload;
}

export function handleOAuthResponse(request: Record<string, any>) {
  Logger.log(`handleOAuthResponse`);

  const client = oroClient();

  const code = request.parameter['code'];
  client.getStorage().setValue('code', code);

  Logger.log(`handleOAuthResponse: ${JSON.stringify(request)}`);
  Logger.log(`handleOAuthResponse client url: ${client.getAuthorizationUrl()}`);

  const authorized = client.handleCallback(request);

  if (authorized) {
    return HtmlService.createHtmlOutput('Success!');
  } else {
    return HtmlService.createHtmlOutput('Denied.');
  }
}

export function sendRequest(
  url: string,
  opts?: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions
) {
  const client = oroClient();

  if (!client.hasAccess()) {
    Logger.log('Error:' + client.getLastError());
    return;
  }

  const options = {
    ...opts,
    headers: {
      Accept: 'application/vnd.api+json',
      Authorization: Utilities.formatString(
        'Bearer %s',
        client.getAccessToken()
      ),
      ...(opts?.headers ?? {}),
    },
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    Logger.log(
      'response.getContentText(): ' + JSON.stringify(response.getContentText())
    );
    Logger.log(
      'response.getResponseCode(): ' +
        JSON.stringify(response.getResponseCode())
    );
    return response.getContentText();
  } catch (e) {
    Logger.log('ERROR: ' + e);
  }
}
