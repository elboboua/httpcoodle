import { useState } from "react";
import "./App.css";

type TileState = "empty" | "present" | "matched";
type Tile = { number: number | null; state: TileState };

const initialBoard = Array.from({ length: 5 }, () =>
    Array(3).fill({ number: null, state: "empty" })
);
const keyboard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["Enter", 0, "Backspace"],
];

interface TileProps {
    number: number | null;
    state: TileState;
    active: boolean;
}
const Tile = ({ number, state, active }: TileProps) => {
    return (
        <div className={`tile ${state} ${active ? "active" : ""}`}>
            {number}
        </div>
    );
};

function App() {
    const [currentRow, setCurrentRow] = useState(3);
    const [currentCol, setCurrentCol] = useState(2);
    const [board, setBoard] = useState(initialBoard);
    return (
        <>
            {/* board */}
            {board.map((row, i) => (
                <div key={i} className="row">
                    {row.map((tile, j) => (
                        <Tile
                            key={j}
                            {...tile}
                            active={currentRow == i && currentCol == j}
                        />
                    ))}
                </div>
            ))}
            {/* keyboard */}
            <div className="keyboard">
                {keyboard.map((row, i) => (
                    <div key={i} className="row">
                        {row.map((key, j) => (
                            <button key={j} className="key">
                                {key}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
