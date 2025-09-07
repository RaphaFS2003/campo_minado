import React from 'react';

interface SquareProps {
  value: React.ReactNode;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
  revealed?: boolean;
  disabled?: boolean;
  isMine?: boolean;
  exploded?: boolean;
}


// O botão recebe classes de cor e estado, e mostra o valor correto
// Se exploded for true, aplica animação de shake
const Square: React.FC<SquareProps> = ({ value, onClick, onRightClick, revealed, disabled, exploded }) => {
  return (
    <button
      className={`w-8 h-8 border flex items-center justify-center text-lg transition-all duration-200
        ${revealed ? 'bg-gray-900' : 'bg-green-600 hover:bg-green-300'}
        ${disabled ? 'cursor-not-allowed opacity-60' : ''}
        ${exploded ? 'animate-shake bg-red-600' : ''}`}
      onClick={onClick}
      onContextMenu={onRightClick}
      disabled={disabled}
    >
      {typeof value === 'number' && value > 0 ? (
        <span className="text-gray-100">{value}</span>
      ) : (
        value
      )}
    </button>
  );
};

export default Square;
