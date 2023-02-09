export function addMenuItemsToCard(
  card: GoogleAppsScript.Card_Service.CardBuilder
) {
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

  return card;
}
