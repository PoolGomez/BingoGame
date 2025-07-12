
type Props = {
  selectedCells: boolean[][];
  setSelectedCells: React.Dispatch<React.SetStateAction<boolean[][]>>;
};

const BingoCard = ({ selectedCells, setSelectedCells }: Props) => {
  const letters = ["B", "I", "N", "G", "O"];

  const handleClick = (row: number, col: number) => {
    if (row === 2 && col === 2) return; // FREE space
    const updated = selectedCells.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? !cell : cell))
    );
    setSelectedCells(updated);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-5 gap-2 max-w-6xl mx-auto mb-4">
        {letters.map((letter, i) => (
          <div
            key={i}
            className="w-48 h-48 flex items-center justify-center text-8xl font-bold text-gray-700 rounded-md bg-blue-50"
          >
            {letter}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2 max-w-6xl mx-auto">
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 5 }).map((_, col) => {
            const isCenter = row === 2 && col === 2;
            const isSelected = selectedCells[row][col];

            return (
              <div
                key={`${row}-${col}`}
                onClick={() => handleClick(row, col)}
                className={`
                  w-48 h-48 flex items-center justify-center rounded-md
                  text-white font-bold text-lg cursor-pointer
                  ${isCenter ? "bg-gray-400 cursor-not-allowed" : isSelected ? "bg-red-500" : "bg-blue-200 hover:bg-blue-600"}
                `}
              >
                {isCenter ? "" : ""}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BingoCard;