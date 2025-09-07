// Componente Header: mostra o número de minas restantes e o botão de reiniciar
import React from 'react';

interface HeaderProps {
  mines: number;
  onReset: () => void;
}

// Layout do topo da tela do jogo
const Header: React.FC<HeaderProps> = ({ mines, onReset }) => (
  <div className="flex justify-between items-center mb-4">
    <span className="text-white mr-6">Minas: {mines}</span>
    <button onClick={onReset} className="bg-blue-500 text-white px-4 py-1 rounded">Reiniciar</button>
  </div>
);

export default Header;
