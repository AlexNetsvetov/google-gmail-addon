export function createHomeCard() {
  const header = CardService.newCardHeader().setTitle('Success');
  const card = CardService.newCardBuilder().setHeader(header);
  // TODO: move to another place
  card.addCardAction(
    CardService.newCardAction()
      .setText('Logout')
      .setOnClickAction(CardService.newAction().setFunctionName('handleLogout'))
  );
  card.addCardAction(
    CardService.newCardAction()
      .setText('getUsers')
      .setOnClickAction(CardService.newAction().setFunctionName('getUsers'))
  );
  return card.build();
}
