import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados utilizando a string de conexão obtida da variável de ambiente STRING_CONEXAO
// O resultado da conexão é armazenado na constante 'conexao'
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    // Seleciona o banco de dados "imersao-instabytes" dentro da conexão estabelecida
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção "posts" dentro do banco de dados selecionado
    const colecao = db.collection("posts");
    // Executa uma operação de busca em toda a coleção e retorna todos os documentos como um array
    return colecao.find().toArray();
}

// Função assíncrona para criar um novo post no banco de dados
export async function criarPost(novoPost) {
    // Seleciona o banco de dados "imersao-instabytes" dentro da conexão estabelecida
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção "posts" dentro do banco de dados selecionado
    const colecao = db.collection("posts");
    // Insere um novo documento (post) na coleção e retorna o resultado da inserção
    return colecao.insertOne(novoPost);
}

// Função assíncrona para atualizar um novo post no banco de dados
export async function atualizarPost(id, novoPost) {
    // Obtém a conexão com o banco de dados
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção "posts"
    const colecao = db.collection("posts");
    // Converte o ID do post para um ObjectId do MongoDB
    const objID = ObjectId.createFromHexString(id);
    // Atualiza o post no banco de dados com os novos dados
    return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost });
  }