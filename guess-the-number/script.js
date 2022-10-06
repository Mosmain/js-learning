let randomNumber = Math.floor(Math.random() * 100) + 1
console.log(randomNumber)

const guesses = document.querySelector(".guesses")
const lastResult = document.querySelector(".lastResult")
const lowOrHi = document.querySelector(".lowOrHi")
const guessSubmit = document.querySelector(".guessSubmit")
const guessField = document.querySelector(".guessField")

let guessCount = 1
let resetButton

let guessesArr = []
let gameResult = {}
let win = false
const url = "http://localhost:3000/attempts"

fetch(url)
  .then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
  })
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    console.log("data", data)
  })
  .catch(function (error) {
    console.log("error", error)
  })

function checkGuess() {
  let userGuess = Number(guessField.value)
  guessesArr.push(userGuess)
  if (guessCount === 1) {
    guesses.textContent = "Предыдущие предположения: "
  }

  guesses.textContent += userGuess + " "

  if (userGuess === randomNumber) {
    lastResult.textContent = "Молодцом, угадал"
    lastResult.style.backgroundColor = "green"
    lowOrHi.textContent = ""
    win = true
    setGameOver()
  } else if (guessCount === 10) {
    lastResult.textContent = "Попыточки-то всё, закончились"
    setGameOver()
  } else {
    lastResult.textContent = "Не угадал, браток"
    lastResult.style.backgroundColor = "red"

    if (userGuess > randomNumber) {
      lowOrHi.textContent = "Много берешь, пробуй еще"
    } else {
      lowOrHi.textContent = "Мало берешь, пробуй еще"
    }
  }

  guessCount++
  guessField.value = ""
  guessField.focus()
}

guessSubmit.addEventListener("click", checkGuess)

guessField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkGuess()
    event.preventDefault()
  }
})

function setGameOver(event) {
  gameResult = {
    randNum: randomNumber,
    guesses: guessesArr,
    win: win,
  }
  win = false

  fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameResult),
  })

  // (async () => {

  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json, text/plain, */*",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(gameResult)
  //   }) 

  // const result = await response.json() 

  // console.log(result) 
  // })() 

  guessesArr = []
  guessField.disabled = true
  guessSubmit.disabled = true
  guessField.value = ""
  resetButton = document.createElement("button")
  resetButton.textContent = "Начать новую игру"
  document.body.appendChild(resetButton)
  resetButton.addEventListener("click", resetGame)
  resetButton.focus()
  event.preventDefault()
}

function resetGame() {
  guessCount = 1

  let resetParas = document.querySelectorAll(".resultParas p")
  for (let i = 0; i < resetParas; i++) {
    resetParas[i].textContent = ""
  }
  guesses.textContent = ""

  resetButton.parentNode.removeChild(resetButton)

  guessField.disabled = false
  guessSubmit.disabled = false
  guessField.value = ""
  guessField.focus()

  lastResult.style.backgroundColor = "#1b1b1b"
  lastResult.textContent = ""
  lowOrHi.textContent = ""

  randomNumber = Math.floor(Math.random() * 100) + 1
}
