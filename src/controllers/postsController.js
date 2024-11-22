import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";
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

// Função assíncrona para fazer update de uma imagem e criar um novo post
export async function atualizarNovoPost(req, res) {
    // Obtém o ID do post a ser atualizado a partir dos parâmetros da requisição
    const id = req.params.id;
    // Constrói a URL completa da imagem com base no ID do post
    const urlImagem = `http://localhost:3000/${id}.png`;
    try {
      // Lê o conteúdo da imagem do sistema de arquivos
      const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
      // Gera uma descrição para a imagem utilizando o serviço Gemini
      const descricao = await gerarDescricaoComGemini(imgBuffer); 
      // Cria um objeto com os dados do post a ser atualizado
      const post = {
        imgUrl: urlImagem,
        descricao: descricao,
        alt: req.body.alt
      };
      // Atualiza o post no banco de dados com os novos dados
      const postCriado = await atualizarPost(id, post);
      // Envia uma resposta ao cliente indicando que a atualização foi bem-sucedida
      res.status(200).json(postCriado);
    } catch(erro) {
      // Registra o erro no console para depuração
      console.error(erro.message);
      // Envia uma mensagem de erro ao cliente indicando que ocorreu um problema
      res.status(500).json({"Erro":"Falha na requisição"});
    }
  }