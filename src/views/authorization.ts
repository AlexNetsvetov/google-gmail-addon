import { oroClient } from '../api';

export function createAuthorizationCard(url: string = '') {
  const connectButton = CardService.newTextButton()
    .setText('Connect')
    .setBackgroundColor('rgb(0, 82, 204)')
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
    .setDisabled(!url);

  if (url) {
    const authUrl = oroClient().getAuthorizationUrl();
    const authAction =
      CardService.newAuthorizationAction().setAuthorizationUrl(authUrl);
    connectButton.setAuthorizationAction(authAction);
  } else {
    const errorAction =
      CardService.newAction().setFunctionName('handleEmptyConnect');
    connectButton.setOnClickAction(errorAction);
  }

  const userGuideButton = CardService.newTextButton()
    .setText('User Guide')
    .setOpenLink(
      CardService.newOpenLink()
        .setUrl('https://google.com/')
        .setOpenAs(CardService.OpenAs.FULL_SIZE)
        .setOnClose(CardService.OnClose.NOTHING)
    );

  const buttons = CardService.newButtonSet()
    .addButton(userGuideButton)
    .addButton(connectButton);

  const header = CardService.newCardHeader()
    .setTitle('Welcome to easy experience')
    .setImageUrl(
      'https://www.nicepng.com/png/detail/233-2335985_oro-inc-logo.png'
    );

  const inputAction =
    CardService.newAction().setFunctionName('handleOroUrlChange');
  const inputUrl = CardService.newTextInput()
    .setTitle('Oro Service')
    .setFieldName('url')
    .setOnChangeAction(inputAction)
    .setValue(url);

  const section = CardService.newCardSection()
    .addWidget(
      CardService.newTextParagraph().setText(
        'Explore the data stored in your Oro application directly from your G-Suite with OroConnector'
      )
    )
    .addWidget(inputUrl)
    .addWidget(buttons);

  const card = CardService.newCardBuilder()
    .setHeader(header)
    .addSection(section);
  return card.build();
}

export function handleOroUrlChange(form: any) {
  const { url } = form.formInput;

  Logger.log(
    `url from store: ${PropertiesService.getUserProperties().getProperty(
      'oroServiceUrl'
    )}`
  );
  Logger.log(`url from input: ${url}`);

  PropertiesService.getUserProperties().setProperty('oroServiceUrl', url ?? '');

  return CardService.newNavigation()
    .popToRoot()
    .updateCard(createAuthorizationCard(url));
}

export function handleEmptyConnect() {
  //TODO: this stab for auth empty line
  return CardService.newActionResponseBuilder()
    .setNotification(
      CardService.newNotification().setText('Please fill all fields')
    )
    .build();
}
