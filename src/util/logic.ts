

// Tipo que representa cada célula do campo minado

export type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

// Cria o campo minado com minas e números

export function criarCampo(linhas: number, colunas: number, minas: number): Cell[][] {
  const campo: Cell[][] = Array.from({ length: linhas }, () =>
    Array.from({ length: colunas }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    }))
  );

  let minasRestantes = minas;
  while (minasRestantes > 0) {
    const i = Math.floor(Math.random() * linhas);
    const j = Math.floor(Math.random() * colunas);
    if (!campo[i][j].isMine) {
      campo[i][j].isMine = true;
      minasRestantes--;
    }
  }

// Calcula o número de minas adjacentes para cada célula

  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      if (!campo[i][j].isMine) {
        campo[i][j].adjacentMines = contarMinasAdjacentes(campo, i, j);
      }
    }
  }
  return campo;
}

// Conta quantas minas existem ao redor da célula (x, y)

function contarMinasAdjacentes(campo: Cell[][], x: number, y: number): number {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const ni = x + i;
      const nj = y + j;
      if (
        ni >= 0 &&
        ni < campo.length &&
        nj >= 0 &&
        nj < campo[0].length &&
        campo[ni][nj].isMine
      ) {
        count++;
      }
    }
  }
  return count;
}

// Revela a célula (x, y) e, se for vazia, revela recursivamente as vizinhas

export function revelarCelula(campo: Cell[][], x: number, y: number): Cell[][] {
  const novoCampo = campo.map(row => row.map(cell => ({ ...cell })));
  if (novoCampo[x][y].isRevealed || novoCampo[x][y].isFlagged) return novoCampo;
  novoCampo[x][y].isRevealed = true;
  if (novoCampo[x][y].adjacentMines === 0 && !novoCampo[x][y].isMine) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const ni = x + i;
        const nj = y + j;
        if (
          ni >= 0 &&
          ni < novoCampo.length &&
          nj >= 0 &&
          nj < novoCampo[0].length &&
          !novoCampo[ni][nj].isRevealed
        ) {
          revelarCelula(novoCampo, ni, nj);
        }
      }
    }
  }
  return novoCampo;
}

// Alterna a bandeira na célula (x, y)

export function alternarBandeira(campo: Cell[][], x: number, y: number): Cell[][] {
  const novoCampo = campo.map(row => row.map(cell => ({ ...cell })));
  if (!novoCampo[x][y].isRevealed) {
    novoCampo[x][y].isFlagged = !novoCampo[x][y].isFlagged;
  }
  return novoCampo;
}

// Verifica se o jogador venceu (todas as células sem mina foram reveladas)

export function checarVitoria(campo: Cell[][]): boolean {
  for (let i = 0; i < campo.length; i++) {
    for (let j = 0; j < campo[0].length; j++) {
      const cell = campo[i][j];
      if (!cell.isMine && !cell.isRevealed) return false;
    }
  }
  return true;
}

// Verifica se o jogador perdeu (alguma mina foi revelada)

export function checarDerrota(campo: Cell[][]): boolean {
  for (let i = 0; i < campo.length; i++) {
    for (let j = 0; j < campo[0].length; j++) {
      if (campo[i][j].isMine && campo[i][j].isRevealed) return true;
    }
  }
  return false;
}


