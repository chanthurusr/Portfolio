"use client"

import { useState, useEffect } from "react"
import { X, Brain, Code, Trophy } from "lucide-react"

export function EasterEggs() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [showCodebreaker, setShowCodebreaker] = useState(false)
  const [konami, setKonami] = useState("")

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const sequence = konami + e.key
      setKonami(sequence)

      // Konami code: ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba
      if (sequence.includes("ArrowUpArrowUpArrowDownArrowDown")) {
        setShowQuiz(true)
        setKonami("")
      }

      // Clear sequence after 5 seconds
      setTimeout(() => setKonami(""), 5000)
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [konami])

  return (
    <>
      {/* Hidden BRAINIACS trigger */}
      <div
        className="fixed bottom-4 left-4 w-8 h-8 opacity-0 cursor-pointer"
        onClick={() => setShowQuiz(true)}
        title="BRAINIACS Quiz"
      >
        <Brain className="w-8 h-8" />
      </div>

      {/* Hidden Codebreaker trigger */}
      <div
        className="fixed top-1/2 left-0 w-4 h-16 opacity-0 cursor-pointer"
        onClick={() => setShowCodebreaker(true)}
        title="Codebreaker Game"
      >
        <Code className="w-4 h-4" />
      </div>

      {/* BRAINIACS Quiz Modal */}
      {showQuiz && <BrainiacsQuiz onClose={() => setShowQuiz(false)} />}

      {/* Codebreaker Game Modal */}
      {showCodebreaker && <CodebreakerGame onClose={() => setShowCodebreaker(false)} />}
    </>
  )
}

function BrainiacsQuiz({ onClose }: { onClose: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const questions = [
    {
      question: "What does 'கலக்கலாம்' mean in Tamil?",
      options: ["Let's rock", "Let's code", "Let's study", "Let's eat"],
      correct: 0,
    },
    {
      question: "Which technology is used for the 3D elements in this portfolio?",
      options: ["WebGL", "Three.js", "React Three Fiber", "All of the above"],
      correct: 3,
    },
    {
      question: "What's Chanthuru's current LeetCode rating?",
      options: ["1200", "1535", "1800", "2000"],
      correct: 1,
    },
  ]

  const handleAnswer = (answerIndex: number) => {
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-teal-400 flex items-center space-x-2">
            <Brain className="w-6 h-6" />
            <span>BRAINIACS Quiz</span>
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!showResult ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-teal-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-white mb-4">{questions[currentQuestion].question}</h4>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-3 text-left rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors text-white"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
            <h4 className="text-2xl font-bold text-white">Quiz Complete!</h4>
            <p className="text-lg text-teal-400">
              You scored {score} out of {questions.length}
            </p>
            <p className="text-gray-300">
              {score === questions.length
                ? "Perfect! You're a true BRAINIAC! 🧠"
                : score >= questions.length / 2
                  ? "Great job! Keep learning! 📚"
                  : "Good try! Check out the portfolio for more info! 💡"}
            </p>
            <button onClick={onClose} className="px-6 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CodebreakerGame({ onClose }: { onClose: () => void }) {
  const [guess, setGuess] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [solved, setSolved] = useState(false)

  const techWords = ["REACT", "NODEJS", "PYTHON", "MONGODB", "OPENCV"]
  const [currentWord] = useState(techWords[Math.floor(Math.random() * techWords.length)])
  const [hints, setHints] = useState<string[]>([])

  const handleGuess = () => {
    if (guess.toUpperCase() === currentWord) {
      setSolved(true)
    } else {
      setAttempts(attempts + 1)
      // Add hint based on attempt
      const newHints = [...hints]
      if (attempts === 0) newHints.push(`Word length: ${currentWord.length}`)
      if (attempts === 1) newHints.push(`First letter: ${currentWord[0]}`)
      if (attempts === 2) newHints.push(`Category: ${getCategory(currentWord)}`)
      setHints(newHints)
    }
    setGuess("")
  }

  const getCategory = (word: string) => {
    if (["REACT", "NODEJS"].includes(word)) return "Framework/Runtime"
    if (["PYTHON"].includes(word)) return "Programming Language"
    if (["MONGODB"].includes(word)) return "Database"
    if (["OPENCV"].includes(word)) return "Computer Vision"
    return "Technology"
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-blue-400 flex items-center space-x-2">
            <Code className="w-6 h-6" />
            <span>Codebreaker</span>
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!solved ? (
          <div className="space-y-6">
            <p className="text-gray-300">Guess the technology word! It's something Chanthuru uses in his projects.</p>

            <div className="space-y-3">
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleGuess()}
                placeholder="Enter your guess..."
                className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-blue-500 focus:outline-none text-white"
              />
              <button
                onClick={handleGuess}
                className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              >
                Submit Guess
              </button>
            </div>

            {hints.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-400">Hints:</h4>
                {hints.map((hint, index) => (
                  <p key={index} className="text-sm text-gray-300">
                    • {hint}
                  </p>
                ))}
              </div>
            )}

            <p className="text-sm text-gray-400">Attempts: {attempts}</p>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-6xl">🎉</div>
            <h4 className="text-2xl font-bold text-white">Congratulations!</h4>
            <p className="text-lg text-blue-400">
              You cracked the code: <strong>{currentWord}</strong>
            </p>
            <p className="text-gray-300">Solved in {attempts + 1} attempts! You're a true codebreaker! 🔓</p>
            <button onClick={onClose} className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
