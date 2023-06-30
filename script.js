import { ROTATIONS } from "./constants.js"
import { Piece } from "./piece.js"

const GAME_SPEED = 3
const gameBoard = document.querySelector("#game-board")

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
                let counter = parseInt(square.style.gridRowStart)
                while (counter > 1) {
                    Array.from(gameBoard.querySelectorAll(`.tetromino[style*="grid-row-start: ${counter - 1};"]`)).forEach(squareAbove => {
                        squareAbove.style.gridRowStart = counter
                    })
                    counter--
                }
                
            }
        })

        currentPiece = new Piece(nextPieceRotations)
        nextPieceRotations = ROTATIONS[Object.keys(ROTATIONS)[Math.floor(Math.random() * 7)]]

        // check loss
        if (currentPiece.overlaps()) {
            gameBoard.innerHTML = ""
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

// setInterval(() => currentPiece.moveDown(), 1000)
window.requestAnimationFrame(main)
