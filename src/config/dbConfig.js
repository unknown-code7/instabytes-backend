import { MongoClient } from "mongodb";

// Função assíncrona para conectar ao banco de dados MongoDB
export default async function conectarAoBanco(stringConexao) {
    // Inicializa uma variável para armazenar o cliente MongoDB
    let mongoClient;

    try {
        // Cria uma nova instância do cliente MongoDB com a string de conexão fornecida
        mongoClient = new MongoClient(stringConexao);
        // Imprime uma mensagem no console indicando que a conexão está sendo estabelecida
        console.log("Conectando ao cluster do banco de dados...");
        // Conecta ao banco de dados de forma assíncrona
        await mongoClient.connect();
        // Imprime uma mensagem de sucesso no console após a conexão ser estabelecida
        console.log("Conectado ao MongoDB Atlas com sucesso!");

        // Retorna o cliente MongoDB para que possa ser utilizado em outras partes do código
        return mongoClient;
    } catch (erro) {
        // Captura qualquer erro que possa ocorrer durante a conexão
        // Imprime uma mensagem de erro no console, incluindo o erro detalhado
        console.error("Falha na conexão com o banco!", erro);
        // Encerra a execução do processo em caso de falha na conexão
        process.exit();
    }
}
