// ========================================
// ROUTES - CAMADA DE ROTAS
// ========================================

import express from "express";
import * as JogoController from "../controllers/tarefaController.js";

const router = express.Router();

// ========================================
// DEFINIÇÃO DAS ROTAS DE JOGOS
// ========================================

/**
 * GET /jogos - Lista todos os jogos
 */
router.get("/jogos", JogoController.listarJogos);

/**
 * GET /jogos/:id - Obtém um jogo específico
 */
router.get("/jogos/:id", JogoController.obterJogo);

/**
 * POST /jogos - Cria um novo jogo
 */
router.post("/jogos", JogoController.criarJogo);

/**
 * PUT /jogos/:id - Atualiza um jogo
 */
router.put("/jogos/:id", JogoController.atualizarJogo);

/**
 * DELETE /jogos/:id - Remove um jogo
 */
router.delete("/jogos/:id", JogoController.excluirJogo);

export default router;
