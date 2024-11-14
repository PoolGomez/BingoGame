
export const BingoCard = () => {
  const generateCardNumbers = () => {
    const B = Array.from({ length: 5 }, () => Math.floor(Math.random() * 15) + 1);
    const I = Array.from({ length: 5 }, () => Math.floor(Math.random() * 15) + 16);
    const N = Array.from({ length: 5 }, () => Math.floor(Math.random() * 15) + 31);
    const G = Array.from({ length: 5 }, () => Math.floor(Math.random() * 15) + 46);
    const O = Array.from({ length: 5 }, () => Math.floor(Math.random() * 15) + 61);
    return [B, I, N, G, O];
  };

  const cardNumbers = generateCardNumbers();

  return (
    <div className="grid grid-cols-5 gap-1 bg-white rounded-lg w-full p-2">
      {['B', 'I', 'N', 'G', 'O'].map((letter, i) => (
        <div key={letter} className="space-y-1">
          <div className="text-sm font-bold text-center text-purple-900">{letter}</div>
          {cardNumbers[i].map((num, j) => (
            <div
              key={`${letter}-${j}`}
              className="flex h-12 items-center justify-center bg-purple-100 rounded
                       text-purple-900 font-semibold hover:bg-purple-200 transition-colors"
            >
              {/* {num} */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}