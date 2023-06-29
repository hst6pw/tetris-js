import { ROTATIONS } from "./constants.js"
import { Piece } from "./piece.js"

function main(currentTime) {
    update()
    draw()

    window.requestAnimationFrame(main)
}

function update() {
    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
    document.documentElement.style.setProperty("--hue", hue + 0.5)
}

const jPiece = new Piece(ROTATIONS.J)

function draw() {
    jPiece.draw()
}

window.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowRight":
            jPiece.moveRight()
            break
        case "ArrowLeft":
            jPiece.moveLeft()
            break
        case "ArrowDown":
            jPiece.moveDown()
            break
        case "ArrowUp":
            jPiece.rotate()
    }
})

// setInterval(() => jPiece.moveDown(), 1000)
window.requestAnimationFrame(main)
