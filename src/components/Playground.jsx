import React, { useEffect, useState } from 'react';
import './playground.css'
import { useNavigate } from 'react-router-dom';


const Playground = () => {
    const navigate = useNavigate()
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [compGenNum, setCompGenNum] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [feedback, setFeedback] = useState("");
    const [guessCount, setGuessCount] = useState(0);
    const [gameFinished, setGameFinished] = useState(false);
    
    // Generate Unique 4-Digit Number
    const generateUniqueNumber = () => {
        let digits = [];
        while (digits.length < 4) {
            const randDigit = Math.floor(Math.random() * 10);
            if (!digits.includes(randDigit)) {
                digits.push(randDigit);
            }
        }
        return parseInt(digits.join(""), 10);
    };

    // Timer Function
    useEffect(() => {
        if (gameFinished) return
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 59) {
                    setMinutes((prevMinutes) => prevMinutes + 1);
                    return 0;
                }
                return prevSeconds + 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameFinished]);

    // Set Computer Generated Number
    useEffect(() => {
        setCompGenNum(generateUniqueNumber());
    }, []);


    // Validate User Input
    const handleValidation = () => {
        if (userInput.length !== 4 || isNaN(userInput)) {
            setFeedback("Please enter a valid 4-digit number.");
            return;
        }
        setGuessCount((prev)=> prev + 1);
        let plusCount = 0;
        let minusCount = 0;
        const compArray = compGenNum.toString().split("");
        const userArray = userInput.split("");

        userArray.forEach((digit, index) => {
            if (digit === compArray[index]) {
                plusCount++;
            } else if (compArray.includes(digit)) {
                minusCount++;
            }
        });

        if (plusCount === 4) {
            setFeedback("🎉 You guessed the correct number!");
            setGameFinished(true);

            // Save to local storage
            const gameData = {
                minutes,
                seconds,
                guessCount: guessCount + 1,
            };
            localStorage.setItem("gameData", JSON.stringify(gameData));
        } else {
            setFeedback(`(+${plusCount} ) (-${minusCount})`);
        }
    };

    // Start a New Game
    const handleNewGame = () => {
        setSeconds(0);
        setMinutes(0);
        setUserInput("");
        setFeedback("");
        setGuessCount(0);
        setCompGenNum(generateUniqueNumber());
        setGameFinished(false);
        navigate('/');
    };

    const savedGameData = localStorage.getItem("gameData");
    const parsedGameData = savedGameData ? JSON.parse(savedGameData) : null;

    return (
        <section id="playground">
            <h2>
                Timer: {minutes} mins : {seconds} secs
            </h2>

            {!gameFinished ? (
                <div className="user-input">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        maxLength="4"
                        placeholder="Enter your guess (4 digits)"
                    />
                    <button onClick={handleValidation}>Guess</button>
                    <button onClick={handleNewGame}>New Game</button>
                </div>
            ) : (
                <div className="game-over">
                    <h3>Game Finished!</h3>
                    <p>Best Time: {minutes} mins : {seconds} secs</p>
                    <p>Number of Guesses: {guessCount}</p>
                    <button onClick={handleNewGame}>Play Again</button>
                </div>
            )}

            <p>Feedback: {feedback}</p>

            {parsedGameData && !gameFinished && (
                <div className="last-game">
                    <h4>Last Game:</h4>
                    <p>Best Time: {parsedGameData.minutes} mins : {parsedGameData.seconds} secs</p>
                    <p>Guesses: {parsedGameData.guessCount}</p>
                </div>
            )}
        </section>
    );
};

export default Playground;
