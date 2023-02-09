/*
// TODO: find type
export function handleButtonClick(e: any) {
  const { sender } = e.parameters;
  return CardService.newActionResponseBuilder()
    .setNotification(
      CardService.newNotification().setText(
        'I gave the message from: ' + sender
      )
    )
    .build();
}

export function createJokeCard(joke: Joke) {
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle('Joke'))
    .addSection(
      CardService.newCardSection()
        .addWidget(
          CardService.newKeyValue()
            .setTopLabel('Setup:')
            .setContent(joke.setup || JSON.stringify(joke))
        )
        .addWidget(
          CardService.newKeyValue()
            .setTopLabel('Delivery:')
            .setContent(joke.delivery || JSON.stringify(joke))
        )
    );
}

export async function handleJokeButtonClick() {
  const joke = await getJoke();
  const card = createJokeCard(joke);

  return CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation().pushCard(card.build()))
    .build();
}

export function createJokeSection() {
  return CardService.newCardSection().addWidget(
    CardService.newButtonSet().addButton(
      CardService.newTextButton()
        .setText('Send test joke request')
        .setOnClickAction(
          CardService.newAction().setFunctionName('handleJokeButtonClick')
        )
    )
  );
}

export function createMainCard(message: any) {
  const subject = message.getSubject();
  const sender = message.getFrom();

  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle('Example card'))
    .addSection(
      CardService.newCardSection()
        .addWidget(
          CardService.newKeyValue().setTopLabel('Subject').setContent(subject)
        )
        .addWidget(
          CardService.newKeyValue().setTopLabel('From').setContent(sender)
        )
        .addWidget(
          CardService.newButtonSet().addButton(
            CardService.newTextButton().setText('Test button').setOnClickAction(
              CardService.newAction()
                .setFunctionName('handleButtonClick')
                .setParameters({
                  sender,
                })
            )
          )
        )
    );
}

//TODO: find type
export function onGmailMessageOpen(e: any) {
  const { accessToken, messageId } = e.gmail;
  GmailApp.setCurrentMessageAccessToken(accessToken);

  const message = GmailApp.getMessageById(messageId);

  const card = createMainCard(message);
  card.addSection(createJokeSection());

  return [card.build()];
}
*/
