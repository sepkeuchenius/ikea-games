import { useState } from "react";
import type { ActionFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { checkGuess, type GuessResult } from "~/utils/location";

export default function Location() {
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameWon, setGameWon] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentGuess.length !== 11) return;

    try {
      const result = checkGuess(currentGuess);
      setGuesses([...guesses, result]);
      setCurrentGuess("");
      
      if (result.isCorrect) {
        setGameWon(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 dark:bg-white">
      <h1 className="text-4xl font-bold mb-8 dark:text-black">Lingo</h1>
      
      {/* Display previous guesses */}
      <div className="mb-8">
        {guesses.map((guess, index) => (
          <div key={index} className="flex gap-2 mb-2 flex-wrap justify-center">
            {guess.letters.map((letter, letterIndex) => (
              <div
                key={letterIndex}
                className={`
                  w-5 h-5 flex items-center justify-center text-l font-bold rounded
                  ${letter.status === 'correct' ? 'bg-green-500 text-white' : ''}
                  ${letter.status === 'wrong-position' ? 'bg-yellow-500 text-white' : ''}
                  ${letter.status === 'incorrect' ? 'bg-gray-300 text-black' : ''}
                `}
              >
                {letter.letter}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Input form */}
      {!gameWon && (
        <Form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="text"
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
            maxLength={11}
            className="px-4 py-2 text-xl border-2 border-gray-300 rounded dark:text-black"
            placeholder="Type je gok"
          />
          <button
            type="submit"
            disabled={currentGuess.length !== 11}
            className="px-6 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Gok
          </button>
        </Form>
      )}

      {/* Win message */}
      {gameWon && (
        <div className="text-2xl font-bold text-green-500 mt-4">
          Gefeliciteerd! Je hebt IKEAONTBIJT gevonden!
        </div>
      )}

      {/* Game instructions */}
      <div className="mt-8 text-center text-gray-600 dark:text-gray-800">
        <p>Raad het woord van 10 letters!</p>
        <p className="mt-2">
          🟩 = Correcte letter en positie<br />
          🟨 = Letter bestaat, maar op de verkeerde plaats<br />
          ⬜ = Letter niet in het woord
        </p>
      </div>
    </div>
  );
}

export interface GuessResult {
    letters: LetterResult[];
    isCorrect: boolean;
}

export interface LetterResult {
    letter: string;
    status: 'correct' | 'wrong-position' | 'incorrect';
}

export function checkGuess(guess: string): GuessResult {
    const targetWord = "IKEAONTBIJT";
    const upperGuess = guess.toUpperCase();
    
    // Validate input
    if (upperGuess.length !== 11) {
        throw new Error("Guess must be exactly 10 letters");
    }

    const result: LetterResult[] = [];
    const targetLetters = targetWord.split('');
    const remainingTargetLetters = [...targetLetters];

    // First pass: Check for correct positions
    for (let i = 0; i < upperGuess.length; i++) {
        if (upperGuess[i] === targetWord[i]) {
            result[i] = {
                letter: upperGuess[i],
                status: 'correct'
            };
            remainingTargetLetters[i] = '';
        }
    }

    // Second pass: Check for wrong positions and incorrect letters
    for (let i = 0; i < upperGuess.length; i++) {
        if (result[i]) continue; // Skip already marked correct letters

        const letterIndex = remainingTargetLetters.indexOf(upperGuess[i]);
        if (letterIndex !== -1) {
            result[i] = {
                letter: upperGuess[i],
                status: 'wrong-position'
            };
            remainingTargetLetters[letterIndex] = '';
        } else {
            result[i] = {
                letter: upperGuess[i],
                status: 'incorrect'
            };
        }
    }

    return {
        letters: result,
        isCorrect: result.every(r => r.status === 'correct')
    };
}

// Example usage:
// const result = checkGuess("IDEA");
// Returns:
// {
//   letters: [
//     { letter: 'I', status: 'correct' },
//     { letter: 'D', status: 'incorrect' },
//     { letter: 'E', status: 'wrong-position' },
//     { letter: 'A', status: 'correct' }
//   ],
//   isCorrect: false
// }
