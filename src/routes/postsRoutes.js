// Importar os módulos necessários: Express para criar a aplicação, Multer para lidar com uploads de arquivos
// e as funções para manipular posts do controlador postsController.js
import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

// Configurar o armazenamento para os arquivos enviados.
// O Multer.diskStorage define onde os arquivos serão salvos e como serão nomeados.
const storage = multer.diskStorage({
  // Definir o diretório de destino para os arquivos (./uploads)
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Definir o nome do arquivo, usando o nome original do arquivo enviado
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Criar uma instância do Multer com a configuração de armazenamento definida
const upload = multer({ dest: "./uploads", storage });

// No Linux ou Mac, você pode usar uma configuração mais simples:
// const upload = multer({ dest: "./uploads" });

// Definir as rotas para a aplicação Express
const routes = (app) => {
  // Habilitar o parsing de dados JSON no corpo das requisições
  app.use(express.json());

  // Rota para obter todos os posts
  app.get("/posts", listarPosts); // Chama a função listarPosts para lidar com essa rota

  // Rota para criar um novo post
  app.post("/posts", postarNovoPost); // Chama a função postarNovoPost para lidar com essa rota

  // Rota para fazer upload de uma imagem
  // O middleware upload.single("imagem") extrai o arquivo com o nome "imagem" da requisição
  app.post("/upload", upload.single("imagem"), uploadImagem); // Chama a função uploadImagem para lidar com o upload
}

// Exportar a função de rotas para que possa ser utilizada em outros módulos
export default routes;