import { DISPLAY_ROTATIONS, ROTATIONS } from "./constants.js"
import { Piece } from "./piece.js"

const GAME_SPEED = 3
const gameBoard = document.querySelector("#game-board")
const scoreSpan = document.querySelector("#score")
const highScoreSpan = document.querySelector("#high-score")
const nextTetromino = document.querySelector("#next-tetromino")

let score = 0
let highScore = localStorage.getItem("high-score") ? localStorage.getItem("high-score") : 0

highScoreSpan.innerHTML = highScore

let currentPiece = new Piece(ROTATIONS[Object.keys(ROTATIONS)[Math.floor(Math.random() * 7)]])
let nextPieceRotations = ROTATIONS[Object.keys(ROTATIONS)[Math.floor(Math.random() * 7)]]

let lastTime = 0

function main(currentTime) {
    window.requestAnimationFrame(main)

    currentPiece.update()

    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
    document.documentElement.style.setProperty("--hue", hue + 0.5)

    let delta = currentTime - lastTime

    if (delta < (1 / GAME_SPEED) * 1000) {
        return
    }

    if (!currentPiece.atBottom()) {
        currentPiece.moveDown()
    } else {
        // check lines clear
        let rowsCleared = 0

        Array.from(gameBoard.children).forEach(square => {
            if (parseInt(square.style.gridColumnStart) === 1) {
                const squares = []
                for (let i = 2; i < 11; i++) {
                    const current = gameBoard.querySelector(`.tetromino[style*="grid-column-start: ${i};"][style*="grid-row-start: ${square.style.gridRowStart};"]`)
                    squares.push(current)
                    if (!current) {
                        return
                    }
                }
                square.remove()
                squares.forEach(div => {
                    div.remove()
                })
                rowsCleared++
                score 
                let counter = parseInt(square.style.gridRowStart)
                while (counter > 1) {
                    Array.from(gameBoard.querySelectorAll(`.tetromino[style*="grid-row-start: ${counter - 1};"]`)).forEach(squareAbove => {
                        squareAbove.style.gridRowStart = counter
                    })
                    counter--
                }
                
            }
        })

        score += rowsCleared * rowsCleared
        scoreSpan.innerHTML = score

        nextTetromino.innerHTML = ""
        let randIndex = Math.floor(Math.random() * 7)
        currentPiece = new Piece(nextPieceRotations)
        nextPieceRotations = ROTATIONS[Object.keys(ROTATIONS)[randIndex]]
        Array.from(DISPLAY_ROTATIONS[randIndex]) // [{x, y}, {x, y}, {x, y}, {x, y}]
        .forEach(coord => {
            const tetrominoElem = document.createElement("div")
            tetrominoElem.style.gridColumnStart = coord.x
            tetrominoElem.style.gridRowStart = coord.y
            const tetrominoLetter = Object.keys(ROTATIONS).find(key => ROTATIONS[key] === ROTATIONS[Object.keys(ROTATIONS)[randIndex]]).toString().toLowerCase()
            tetrominoElem.classList.add("tetromino", tetrominoLetter)
            nextTetromino.appendChild(tetrominoElem)
        })

        // check loss
        if (currentPiece.overlaps()) {
            gameBoard.innerHTML = ""
            if (score > highScore) highScore = score
            score = 0
            scoreSpan.innerHTML = score
            highScoreSpan.innerHTML = highScore
            localStorage.setItem("high-score", highScore)
            currentPiece = new Piece(nextPieceRotations)
            nextPieceRotations = ROTATIONS[Object.keys(ROTATIONS)[Math.floor(Math.random() * 7)]]
        }
    }

    lastTime = currentTime
}

window.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowRight":
            currentPiece.moveRight()
            break
        case "ArrowLeft":
            currentPiece.moveLeft()
            break
        case "ArrowDown":
            if (!currentPiece.atBottom()) {
                currentPiece.moveDown()
            }
            break
        case "ArrowUp":
            currentPiece.rotate()
    }
})

window.requestAnimationFrame(main)
