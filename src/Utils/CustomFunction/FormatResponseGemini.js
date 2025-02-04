export default function formatResponseGemini(text) {
    let responseArray = text.split("**");
    let newResponse = '';
    for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
            newResponse += responseArray[i];
        } else
        {
            newResponse += "<b>" + responseArray[i] + "</b>";
        }
    }
    return newResponse.split("*").join("</br>")
}