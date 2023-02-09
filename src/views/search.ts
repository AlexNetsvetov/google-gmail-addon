import { getSearch } from '../api';
import { addMenuItemsToCard } from './common';

interface SearchCardProps {
  defaultValue?: string;
  searchResult?: string;
}

export function createSearchCard({
  defaultValue = '',
  searchResult = '',
}: SearchCardProps) {
  const searchAction = CardService.newAction()
    .setFunctionName('handleSearch')
    .setLoadIndicator(CardService.LoadIndicator.SPINNER);
  const searchInput = CardService.newTextInput()
    .setFieldName('search')
    .setTitle('Search')
    .setOnChangeAction(searchAction)
    .setValue(defaultValue);
  const searchSection = CardService.newCardSection().addWidget(searchInput);
  const card = addMenuItemsToCard(
    CardService.newCardBuilder().addSection(searchSection)
  );

  if (searchResult) {
    const resultWidget = CardService.newDecoratedText()
      .setText(searchResult)
      .setWrapText(true);
    const resultSection = CardService.newCardSection().addWidget(resultWidget);
    card.addSection(resultSection);
  }

  return card.build();
}

export function handleSearch(form: any) {
  Logger.log(JSON.stringify(form));
  const { search } = form.formInput;

  if (!search) {
    return CardService.newNavigation().updateCard(createSearchCard({}));
  }

  const searchResult = getSearch(search);

  return CardService.newNavigation().updateCard(
    createSearchCard({ defaultValue: search, searchResult: searchResult })
  );
}
