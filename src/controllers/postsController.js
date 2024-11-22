import { getTodosPosts, criarPost } from "../models/postsModel.js";
import fs from "fs";

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
    // Chama a função do modelo para buscar todos os posts do banco de dados
    const posts = await getTodosPosts();
    // Envia os posts como resposta HTTP em formato JSON com status 200 (sucesso)
    res.status(200).json(posts);
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
    // Obtém os dados do novo post enviados no corpo da requisição
    const novoPost = req.body;
    try {
        // Chama a função do modelo para criar um novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Envia o post criado como resposta HTTP em formato JSON com status 200 (sucesso)
        res.status(200).json(postCriado);
    } catch(erro) {
        // Imprime o erro no console para depuração
        console.error(erro.message);
        // Envia uma mensagem de erro como resposta HTTP com status 500 (erro interno do servidor)
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

// Função assíncrona para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
    // Cria um objeto com os dados do novo post, incluindo a imagem
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname, // Nome original do arquivo
        alt: ""
    };
    try {
        // Chama a função do modelo para criar um novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Constrói o novo nome do arquivo da imagem, usando o ID do post criado
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        // Renomeia o arquivo da imagem para o novo nome
        fs.renameSync(req.file.path, imagemAtualizada);
        // Envia o post criado como resposta HTTP em formato JSON com status 200 (sucesso)
        res.status(200).json(postCriado);
    } catch(erro) {
        // Imprime o erro no console para depuração
        console.error(erro.message);
        // Envia uma mensagem de erro como resposta HTTP com status 500 (erro interno do servidor)
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}