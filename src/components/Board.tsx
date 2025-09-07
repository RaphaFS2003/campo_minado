// Componente Board: renderiza o tabuleiro do Campo Minado
// Recebe o campo, funções de clique e status do jogo
import React from 'react';
import Square from './Square';
import Flag from './Flag';
import Mine from './Mine';
import { Cell } from '../util/logic';

interface BoardProps {
  board: Cell[][];
  onClick: (row: number, col: number) => void;
  onRightClick: (row: number, col: number, e: React.MouseEvent) => void;
  status?: 'playing' | 'won' | 'lost';
}

// Monta o grid de células, repassando os valores e eventos para cada Square
const Board: React.FC<BoardProps> = ({ board, onClick, onRightClick, status }) => {
  return (
    <div className="inline-block">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => {
            let value: React.ReactNode = '';
            if (cell.isFlagged) {
              value = <Flag />;
            } else if (cell.isRevealed) {
              if (cell.isMine) {
                value = <Mine />;
              } else if (cell.adjacentMines > 0) {
                value = cell.adjacentMines;
              } else {
                value = '';
              }
            }
            // Renderiza cada célula como um Square
            return (
              <Square
                key={j}
                value={value}
                onClick={() => onClick(i, j)}
                onRightClick={e => onRightClick(i, j, e)}
                revealed={cell.isRevealed}
                disabled={status !== 'playing'}
                exploded={cell.isRevealed && cell.isMine && status === 'lost'}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
