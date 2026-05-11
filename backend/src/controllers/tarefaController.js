// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================

import * as JogoModel from "../models/tarefaModel.js";

/**
 * Retorna todos os jogos em formato JSON
 * @route GET /jogos
 */
export async function listarJogos(req, res) {
  try {
    const jogos = await JogoModel.obterTodosJogos();
    res.json(jogos);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar jogos", detalhes: error.message });
  }
}

/**
 * Retorna um jogo específico com base no id enviado na URL
 * @route GET /jogos/:id
 */
export async function obterJogo(req, res) {
  const idNumero = Number(req.params.id);

  if (Number.isNaN(idNumero)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const jogo = await JogoModel.obterJogoPorId(idNumero);

    if (!jogo) {
      return res.status(404).json({ erro: "Jogo não encontrado" });
    }

    res.json(jogo);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar o jogo", detalhes: error.message });
  }
}

/**
 * Cria um novo jogo
 * @route POST /jogos
 */
export async function criarJogo(req, res) {
  const { title, description, price, releaseDate, rating, available, genreId } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ erro: "O campo 'title' é obrigatório" });
  }
  if (typeof price !== "number") {
    return res.status(400).json({ erro: "O campo 'price' é obrigatório e deve ser numérico" });
  }

  try {
    const jogoCriado = await JogoModel.criarJogo({
      title,
      description,
      price,
      releaseDate,
      rating,
      available,
      genreId
    });

    res.status(201).json({
      mensagem: "Jogo criado com sucesso!",
      jogo: jogoCriado
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar jogo", detalhes: error.message });
  }
}

/**
 * Atualiza parcialmente um jogo existente
 * @route PATCH /jogos/:id
 */
export async function atualizarJogo(req, res) {
  const idNumero = Number(req.params.id);
  const data = req.body;

  if (Number.isNaN(idNumero)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const jogoAtualizado = await JogoModel.atualizarJogo(idNumero, data);

    if (!jogoAtualizado) {
      return res.status(404).json({ erro: "Jogo não encontrado" });
    }

    res.json({
      mensagem: "Jogo atualizado com sucesso!",
      jogo: jogoAtualizado
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar jogo", detalhes: error.message });
  }
}

/**
 * Remove um jogo pelo id
 * @route DELETE /jogos/:id
 */
export async function excluirJogo(req, res) {
  const idNumero = Number(req.params.id);

  if (Number.isNaN(idNumero)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const jogoRemovido = await JogoModel.excluirJogo(idNumero);

    if (!jogoRemovido) {
      return res.status(404).json({ erro: "Jogo não encontrado" });
    }

    res.json({
      mensagem: "Jogo excluído com sucesso!",
      jogo: jogoRemovido
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao excluir jogo", detalhes: error.message });
  }
}
