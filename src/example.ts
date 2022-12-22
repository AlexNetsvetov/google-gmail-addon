import { getJoke } from './api'

export async function handleEntryPoint() {
    const joke = await getJoke()
    const card = CardService.newCardBuilder()
        .setHeader(CardService.newCardHeader().setTitle('Hello world!'))
        .addSection(
            CardService.newCardSection().addWidget(
                CardService.newTextParagraph().setText(joke)
            )
        )
    return card.build()
}
