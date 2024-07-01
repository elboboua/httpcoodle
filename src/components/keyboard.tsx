import { useEffect } from "react";

const keyboard_keys = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["Enter", 0, "Backspace"],
];

type KeyboardProps = {
    onKeyPress: (key: string | number) => void;
};

export default function keyboard({ onKeyPress }: KeyboardProps) {
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                onKeyPress("Enter");
            } else if (e.key === "Backspace") {
                onKeyPress("Backspace");
            } else if (e.key >= "0" && e.key <= "9") {
                const key = parseInt(e.key);
                onKeyPress(key);
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [onKeyPress]);

    return (
        <div className="keyboard">
            {keyboard_keys.map((row, i) => (
                <div key={i} className="row">
                    {row.map((key, j) => (
                        <div
                            key={j}
                            className="key"
                            onClick={() => {
                                onKeyPress(key);
                            }}
                        >
                            {key}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
