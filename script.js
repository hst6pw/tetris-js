const ROTATIONS = {
    J: [
        [{ x: 4, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }],
        [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }],
        [{ x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 6, y: 3 }],
        [{ x: 5, y: 1 }, { x: 5, y: 2 }, { x: 4, y: 3 }, { x: 5, y: 3 }]
    ],

    L: [
        [{ x: 6, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }],
        [{ x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 6, y: 3 }],
        [{ x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 4, y: 3 }],
        [{ x: 4, y: 1 }, { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }]
    ],

    I: [
        [{ x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 }],
        [{ x: 6, y: 1 }, { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 6, y: 4 }],
        [{ x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }],
        [{ x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 5, y: 4 }]
    ],

    O: [
        [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 5, y: 2 }, { x: 6, y: 2 }],
        [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 5, y: 2 }, { x: 6, y: 2 }],
        [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 5, y: 2 }, { x: 6, y: 2 }],
        [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 5, y: 2 }, { x: 6, y: 2 }]
    ],

    S: [
        [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 2 }],
        [{ x: 5, y: 1 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 6, y: 3 }],
        [{ x: 5, y: 2 }, { x: 6, y: 2 }, { x: 4, y: 3 }, { x: 5, y: 3 }],
        [{ x: 4, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 5, y: 3 }]
    ],

    Z: [
        [{ x: 4, y: 1 }, { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 6, y: 2 }],
        [{ x: 6, y: 1 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 5, y: 3 }],
        [{ x: 4, y: 2 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 6, y: 3 }],
        [{ x: 5, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 4, y: 3 }]
    ],

    T: [
        [{ x: 5, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }],
        [{ x: 5, y: 1 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 5, y: 3 }],
        [{ x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 5, y: 3 }],
        [{ x: 5, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 5, y: 3 }]
    ]
}

const gameBoard = document.querySelector("#game-board")
const scoreSpan = document.querySelector("#score")
let score = 0

class Piece {
    constructor(rotations) {
        this.rotations = JSON.parse(JSON.stringify(rotations))
        this.currentRotation = 0
        this.tetrominoElems = []
        this.rotations[this.currentRotation].forEach(coord => {
            const tetrominoElem = document.createElement("div")
            tetrominoElem.style.gridColumnStart = coord.x
            tetrominoElem.style.gridRowStart = coord.y
            tetrominoElem.classList.add("tetromino")
            tetrominoElem.classList.add(Object.keys(ROTATIONS).find(key => ROTATIONS[key] === rotations).toString().toLowerCase())
            gameBoard.appendChild(tetrominoElem)
            this.tetrominoElems.push(tetrominoElem)
        })

        console.log(Object.keys(ROTATIONS).find(key => ROTATIONS[key] === rotations))
    }

    update() {
        this.rotations[this.currentRotation].forEach((coord, index) => {
            this.tetrominoElems[index].style.gridColumnStart = coord.x
            this.tetrominoElems[index].style.gridRowStart = coord.y
            this.tetrominoElems[index].style.setProperty("grid-column-start", coord.x)
            this.tetrominoElems[index].style.setProperty("grid-row-start", coord.y)
        })
    }

    rotate() {
        this.currentRotation++
        if (this.currentRotation === 4) this.currentRotation = 0

        let pieceNextRotation = false

        Array.from(gameBoard.children).forEach(square => {
            if (this.rotations[this.currentRotation].some(coord => {
                if (parseInt(square.style.gridColumnStart) === coord.x && parseInt(square.style.gridRowStart) === coord.y && !this.tetrominoElems.includes(square)) {
                    return true
                }
            })) {
                pieceNextRotation = true
            }
        })

        if (pieceNextRotation) {
            this.currentRotation--
            return
        }

        while (this.rotations[this.currentRotation].some(coord => coord.x < 1)) {
            this.moveRight()
        }
        while (this.rotations[this.currentRotation].some(coord => coord.x > 10)) {
            this.moveLeft()
        }
    }

    moveDown() {
        this.rotations.forEach(rotation => {
            rotation.forEach(coord => {
                coord.y++
            })
        })
    }

    moveRight() {
        if (this.rotations[this.currentRotation].some(coord => coord.x > 9)) return

        let pieceRight = false

        Array.from(gameBoard.children).forEach(square => {
            if (this.rotations[this.currentRotation].some(coord => {
                if (parseInt(square.style.gridColumnStart) - 1 === coord.x && parseInt(square.style.gridRowStart) === coord.y && !this.tetrominoElems.includes(square)) {
                    return true
                }
            })) {
                pieceRight = true
            }
        })

        if (pieceRight) return

        this.rotations.forEach(rotation => {
            rotation.forEach(coord => {
                coord.x++
            })
        })
    }

    moveLeft() {
        if (this.rotations[this.currentRotation].some(coord => coord.x < 2)) return

        let pieceLeft = false
        
        Array.from(gameBoard.children).forEach(square => {
            if (this.rotations[this.currentRotation].some(coord => {
                if (parseInt(square.style.gridColumnStart) + 1 === coord.x && parseInt(square.style.gridRowStart) === coord.y && !this.tetrominoElems.includes(square)) {
                    return true
                }
            })) {
                pieceLeft = true
            }
        })

        if (pieceLeft) return

        this.rotations.forEach(rotation => {
            rotation.forEach(coord => {
                coord.x--
            })
        })
    }

    atBottom() {
        let pieceBelow = false
        Array.from(gameBoard.children).forEach(square => {
            if (this.rotations[this.currentRotation].some(coord => {
                if (parseInt(square.style.gridRowStart) - 1 === coord.y && parseInt(square.style.gridColumnStart) === coord.x && !this.tetrominoElems.includes(square)) {
                    return true
                }
            })) {
                pieceBelow = true
            }
        })
        return this.rotations[this.currentRotation].some(coord => coord.y >= 20) || pieceBelow
    }

    overlaps() {
        let overlap = false

        Array.from(gameBoard.children).forEach(square => {
            if (this.rotations[this.currentRotation].some(coord => {
                if (parseInt(square.style.gridColumnStart) === coord.x && parseInt(square.style.gridRowStart) === coord.y && !this.tetrominoElems.includes(square)) {
                    return true
                }
            })) {
                overlap = true
            }
        })

        return overlap
    }
}

const GAME_SPEED = 3

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
        let rowsRemoved = 0
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
                
                rowsRemoved += 1

                let counter = parseInt(square.style.gridRowStart)
                while (counter > 1) {
                    Array.from(gameBoard.querySelectorAll(`.tetromino[style*="grid-row-start: ${counter - 1};"]`)).forEach(squareAbove => {
                        squareAbove.style.gridRowStart = counter
                    })
                    counter--
                }
                
            }
        })

        score += (rowsRemoved * rowsRemoved)

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
    scoreSpan.innerHTML = score
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
