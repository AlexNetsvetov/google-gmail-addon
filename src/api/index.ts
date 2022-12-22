export const getJoke = async () => {
    const url = 'https://v2.jokeapi.dev/joke/Any'
    const res = await UrlFetchApp.fetch(url)
    console.log(res.getContentText())

    return res.getContentText()
}
