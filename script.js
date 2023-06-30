import { ROTATIONS } from "./constants.js"
import { Piece } from "./piece.js"

const GAME_SPEED = 6

function main(currentTime) {
    update(currentTime)
    draw()

    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
    document.documentElement.style.setProperty("--hue", hue + 0.5)

    window.requestAnimationFrame(main)
}

let currentPiece = new Piece(ROTATIONS[Object.keys(ROTATIONS)[Math.floor(Math.random() * 7)]])
let nextPieceRotations = ROTATIONS[Object.keys(ROTATIONS)[Math.floor(Math.random() * 7)]]

let lastTime = 0

function update(currentTime) {
    let delta = currentTime - lastTime

    if (delta < (1 / GAME_SPEED) * 1000) {
        return
    }

    // currentPiece.moveDown()
    // currentPiece.moveDown()
    // let newPiece = new Piece(nextPieceRotations)
    // currentPiece.draw()
    // newPiece.draw()
    // console.log(newPiece.atBottom())

    if (!currentPiece.atBottom()) {
        currentPiece.moveDown()
    } else {
        currentPiece = new Piece(nextPieceRotations)
        nextPieceRotations = ROTATIONS[Object.keys(ROTATIONS)[Math.floor(Math.random() * 7)]]
    }

    lastTime = currentTime
}

// update(1000)

function draw() {
    currentPiece.draw()
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
