//  Importa a biblioteca GoogleGenerativeAI que permite interagir com os modelos de linguagem do Google AI, como o Gemini.
import { GoogleGenerativeAI } from "@google/generative-ai";

// Cria uma nova instância do objeto GoogleGenerativeAI utilizando a chave de API do Gemini, armazenada na variável de ambiente GEMINI_API_KEY.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Utiliza o método getGenerativeModel para obter uma instância do modelo Gemini 1.5-flash, que será utilizado para gerar as descrições.
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define uma função assíncrona chamada gerarDescricaoComGemini que recebe um buffer de imagem como parâmetro.
export default async function gerarDescricaoComGemini(imageBuffer) {
    // Define o prompt que será enviado ao modelo Gemini. O prompt instrui o modelo a gerar uma descrição em português brasileiro para a imagem.
    const prompt =
    "Gere uma descrição em português do brasil para a seguinte imagem";

    // Converte o buffer da imagem em uma string codificada em base64, que é um formato comum para representar dados binários em texto.
    try {
        // Cria um objeto que representa a imagem, incluindo os dados codificados em base64 e o tipo MIME da imagem.
        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/png",
            },
        };
        // Envia a solicitação para o modelo Gemini, passando o prompt e a imagem como entrada. A função generateContent retorna uma promessa que é resolvida quando o modelo gera a resposta.
        const res = await model.generateContent([prompt, image]);
        // Extrai o texto da resposta gerada pelo modelo e o retorna como resultado da função. Se a resposta não contiver texto, retorna a string "Alt-text não disponível.".
        return res.response.text() || "Alt-text não disponível.";
        // Utiliza um bloco try...catch para capturar qualquer erro que possa ocorrer durante a execução da função.
    } catch (erro) {
        // Se ocorrer um erro, ele é registrado no console para facilitar a depuração.
        console.error("Erro ao obter alt-text:", erro.message, erro);
        //  Lança um novo erro com uma mensagem mais amigável para o usuário, indicando que ocorreu um problema ao obter a descrição da imagem.
        throw new Error("Erro ao obter o alt-text do Gemini.");
    }
}