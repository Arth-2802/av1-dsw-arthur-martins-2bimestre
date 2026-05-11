// ========================================
// MODEL - CAMADA DE DADOS COM PRISMA
// ========================================
// Esta camada é responsável por:
// - Realizar operações CRUD no banco de dados usando Prisma
// - Implementar a lógica de negócio

import { prisma } from "../config/prisma.js";

/**
 * Retorna todos os jogos
 * @returns {Promise<Array>} - Lista de jogos
 */
export async function obterTodosJogos() {
  return await prisma.digitalGame.findMany({
    include: { genre: true }
  });
}

/**
 * Retorna um jogo específico pelo ID
 * @param {number} id - ID do jogo
 * @returns {Promise<Object|null>}
 */
export async function obterJogoPorId(id) {
  return await prisma.digitalGame.findUnique({
    where: { id: id },
    include: { genre: true }
  });
}

/**
 * Cria um novo jogo usando Prisma
 * @param {Object} data - Dados do jogo
 * @param {string} data.title - Título do jogo
 * @param {string} [data.description] - Descrição do jogo
 * @param {number} data.price - Preço do jogo
 * @param {string|Date} [data.releaseDate] - Data de lançamento do jogo
 * @param {number} [data.rating] - Avaliação do jogo
 * @param {boolean} [data.available] - Disponibilidade do jogo
 * @param {number} [data.genreId] - ID do gênero
 * @returns {Promise<Object>} - O jogo criado
 */
export async function criarJogo(data) {
  const { title, description, price, releaseDate, rating, available, genreId } = data;
  
  const novoJogo = await prisma.digitalGame.create({
    data: {
      title: title.trim(),
      description: description ? description.trim() : null,
      price: price,
      releaseDate: releaseDate ? new Date(releaseDate) : null,
      rating: rating || 0,
      available: available !== undefined ? available : true,
      genreId: genreId
    },
    include: {
      genre: true
    }
  });

  return novoJogo;
}

/**
 * Atualiza um jogo existente
 * @param {number} id - ID do jogo
 * @param {Object} data - Dados para atualizar
 * @returns {Promise<Object|null>} - Jogo atualizado ou null
 */
export async function atualizarJogo(id, data) {
  try {
    const jogoAtualizado = await prisma.digitalGame.update({
      where: { id: id },
      data: data,
      include: { genre: true }
    });
    return jogoAtualizado;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
}

/**
 * Exclui um jogo pelo id usando Prisma
 * @param {number} id - ID do jogo a ser excluído
 * @returns {Promise<Object|null>} - O jogo removido ou null se não encontrar
 */
export async function excluirJogo(id) {
  try {
    const jogoRemovido = await prisma.digitalGame.delete({
      where: {
        id: id
      },
      include: {
        genre: true
      }
    });

    return jogoRemovido;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
}