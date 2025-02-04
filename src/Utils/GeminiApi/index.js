import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function geminiApi(message, history, care= false) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    if(care) {
        const result = await model.generateContent(`Hãy tạo lộ trình chăm sóc sức khoẻ theo các bước, từ bước 1, bước 2, bước 3,...: ${message}`);
        // console.log(result)
        return result
    }
    
    if(history.length != 0) {
        const chat = model.startChat({
            history: history
        })
        
        let result = await chat.sendMessage(message);
        return result
    }
    
    const result = await model.generateContent(message);
    return result
}