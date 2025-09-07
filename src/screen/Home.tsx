// Componente principal da tela do jogo Campo Minado
// Controla o estado do campo, lógica de vitória/derrota e integra todos os outros componentes
"use client";

import React, { useState } from 'react';
import Board from '../components/Board';
import Header from '../components/Header';
import { criarCampo, alternarBandeira, revelarCelula, checarVitoria, checarDerrota, Cell } from '../util/logic';

const linhas = 8;
const colunas = 8;
const minas = 10;

// Função principal do componente Home
const Home: React.FC = () => {
  const [campo, setCampo] = useState<Cell[][]>(() => criarCampo(linhas, colunas, minas));
  const [minasRestantes, setMinasRestantes] = useState(minas);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  // Clique esquerdo: revela célula
  const handleClick = (row: number, col: number) => {
    if (status !== 'playing') return;
    if (campo[row][col].isFlagged) return;
    const novoCampo = revelarCelula(campo, row, col);
    setCampo(novoCampo);
    if (checarDerrota(novoCampo)) {
      setStatus('lost');
    } else if (checarVitoria(novoCampo)) {
      setStatus('won');
    }
  };

  // Clique direito: alterna bandeira
  const handleRightClick = (row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (status !== 'playing') return;
    const novoCampo = alternarBandeira(campo, row, col);
    setCampo(novoCampo);
    const novasMinas = minas - novoCampo.flat().filter(cell => cell.isFlagged).length;
    setMinasRestantes(novasMinas);
  };

  // Reinicia o jogo
  const handleReset = () => {
    setCampo(criarCampo(linhas, colunas, minas));
    setMinasRestantes(minas);
    setStatus('playing');
  };

  // Renderização da tela principal
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <Header mines={minasRestantes} onReset={handleReset} />
      <Board board={campo} onClick={handleClick} onRightClick={handleRightClick} status={status} />
      {status === 'won' && <div className="mt-4 text-green-600 font-bold">Você venceu!</div>}
      {status === 'lost' && <div className="mt-4 text-red-600 font-bold">Você perdeu!</div>}
    </div>
  );
};

export default Home;
