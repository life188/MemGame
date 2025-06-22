import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import background from "./assets/gameBackground.jpg";

const categories = ["Countries", "Sports"];
const difficulties = ["Untimed", "Timed"];

const fullWordList = {
  Countries: [
    "Egypt",
    "Argentina",
    "Australia",
    "America",
    "Brazil",
    "Canada",
    "China",
    "Denmark",
    "Ethiopia",
    "France",
    "Finland",
    "Germany",
    "Greece",
    "Hungary",
    "India",
    "Indonesia",
  ],
  Sports: [
    "Basketball",
    "Boxing",
    "Cricket",
    "Cycling",
    "Archery",
    "Badminton",
    "Baseball",
    "Diving",
  ],
};

const getRandomWord = (category) => {
  const list = fullWordList[category];
  return list[Math.floor(Math.random() * list.length)];
};

export default function WordChainGame() {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [wordChain, setWordChain] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(30);
  const [startTime, setStartTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [warning, setWarning] = useState("");
  const [currentStreak, setCurrentStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);

  const resetGameState = () => {
    setWordChain([]);
    setCurrentWord("");
    setInput("");
    setTimer(30);
    setIsRunning(false);
    setStartTime(null);
    setWarning("");
    setCurrentStreak(0);
  };

  const startGame = () => {
    const first = getRandomWord(category);
    setWordChain([first]);
    setCurrentWord(first);
    setStartTime(Date.now());
    setTimer(30);
    setIsRunning(true);
    setWarning("");
    setCurrentStreak(0);
  };

  const handleSubmit = () => {
    if (!input) return;
    const lastCharacter = currentWord.slice(-1).toLowerCase();

    if (input[0].toLowerCase() === lastCharacter) {
      setWordChain([...wordChain, input]);
      setCurrentWord(input);
      setInput("");
      setWarning("");
      setCurrentStreak(currentStreak + 1);
      if (currentStreak + 1 > highestStreak) {
        setHighestStreak(currentStreak + 1);
      }
      if (difficulty === "Timed") {
        setTimer((t) => t + 2);
      }
    } else {
      setWarning(`Word must start with "${lastCharacter.toUpperCase()}"`);
      setInput("");
      setCurrentStreak(0);
    }
  };

  useEffect(() => {
    resetGameState();
  }, [category, difficulty]);

  useEffect(() => {
    let interval;
    if (difficulty === "Timed" && isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [difficulty, isRunning, startTime]);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 text-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div>
        <motion.h1
          layout
          className="text-4xl font-extrabold mb-2 text-purple-700 "
        >
          Word Chain Game
        </motion.h1>
        <p className="mb-6 text-gray-700">
          Select a category and difficulty, then keep the word chain going!
        </p>

        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <select
            className="p-3 rounded-lg shadow-sm bg-blue-300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            className="p-3 rounded-lg shadow-sm bg-blue-300"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Select Difficulty</option>
            {difficulties.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        {category && difficulty && (
          <motion.div
            layout
            className="bg-blue-300 shadow-lg rounded-xl p-6 max-w-4xl mx-auto "
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {category} | {difficulty} Mode
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-lg">
              <div>
                <p className="text-blue-600 font-bold">
                  {wordChain.length * 10}
                </p>
                <p className="text-sm">Score</p>
              </div>
              <div>
                <p className="text-blue-600 font-bold">{currentStreak}</p>
                <p className="text-sm">Current Streak</p>
              </div>
              <div>
                <p className="text-blue-600 font-bold">{highestStreak}</p>
                <p className="text-sm">Highest Streak</p>
              </div>
              <div>
                <p className="text-blue-600 font-bold">{wordChain.length}</p>
                <p className="text-sm">Words</p>
              </div>
            </div>

            {!isRunning && (
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={startGame}
                  className="bg-blue-400 hover:bg-blue-500 text-white px-5 py-2 rounded-xl shadow"
                >
                  Start Game
                </button>
                <button
                  onClick={resetGameState}
                  className="border px-5 py-2 rounded-xl shadow text-gray-700"
                >
                  Reset
                </button>
              </div>
            )}
          </motion.div>
        )}

        {isRunning && (
          <motion.div layout className="mt-8">
            {difficulty === "Timed" && (
              <p className="text-xl text-red-500 font-semibold mb-2">
                {timer}s remaining
              </p>
            )}
            <p className="mb-3 text-lg">
              Type a word starting with:{" "}
              <span className="font-bold text-indigo-600">
                {currentWord.slice(-1).toUpperCase()}
              </span>
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex justify-center items-center gap-3"
            >
              <input
                className="p-3 bg-blue-300 rounded-lg shadow-sm w-64 text-center"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Start with "${currentWord
                  .slice(-1)
                  .toUpperCase()}"`}
                autoFocus
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
              >
                Submit
              </button>
            </form>

            <div className="mt-6 max-w-md mx-auto text-left">
              <h3 className="font-semibold text-gray-800 mb-2">Word Chain</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {wordChain.map((word, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-300 text-indigo-800 px-3 py-1 rounded-full text-sm shadow"
                  >
                    {word}
                  </span>
                ))}
              </div>
              {warning && (
                <div className="text-center">
                  <p className="text-red-600 text-sm mt-2 animate-pulse">
                    {warning}
                  </p>
                  <p className="text-red-500 text-xs mt-1">
                    Streak reset to 0!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
