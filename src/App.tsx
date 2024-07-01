import { useState } from "react";
import Keyboard from "./components/keyboard";
import "./App.css";

type TileState = "empty" | "present" | "matched";
type Tile = { number: number | null; state: TileState };

const initialBoard = Array.from({ length: 5 }, () =>
    Array(3).fill(() => ({ number: null, state: "empty" }))
);

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
    const [currentCode, setCurrentCode] = useState(400);
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCol, setCurrentCol] = useState(0);
    const [board, setBoard] = useState(initialBoard);

    const onKeyPress = (key: string | number) => {
        console.log(key);
        if (key === "Enter" && currentCol > 2) {
            setCurrentCol(0);
            setCurrentRow((prev) => prev + 1);
        } else if (key === "Backspace" && currentCol > 0) {
            setBoard((prev) => {
                const newBoard = [...prev];
                newBoard[currentRow][currentCol - 1] = {
                    number: null,
                    state: "empty",
                };
                return newBoard;
            });
            setCurrentCol(currentCol - 1);
        } else if (typeof key === "number" && key >= 0 && key <= 9) {
            if (currentCol > 2) return;
            setBoard((prev) => {
                const newBoard = [...prev];
                console.info("currentCol", currentCol);
                newBoard[currentRow][currentCol] = {
                    number: key,
                    state: "empty",
                };
                return newBoard;
            });
            setCurrentCol((prev) => prev + 1);
        }
    };

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
            <Keyboard onKeyPress={onKeyPress} />
        </>
    );
}

export default App;
