const gameBoard = document.querySelector("#game-board")

export class Piece {
    constructor(rotations) {
        this.rotations = JSON.parse(JSON.stringify(rotations))
        this.currentRotation = 0
        this.tetrominoElems = []
        this.rotations[this.currentRotation].forEach(coord => {
            const tetrominoElem = document.createElement("div")
            tetrominoElem.style.gridColumnStart = coord.x
            tetrominoElem.style.gridRowStart = coord.y
            tetrominoElem.classList.add("tetromino")
            gameBoard.appendChild(tetrominoElem)
            this.tetrominoElems.push(tetrominoElem)
        })
    }

    update() {

    }

    draw() {
        this.rotations[this.currentRotation].forEach((coord, index) => {
            // this.tetrominoElems[index].style.gridColumnStart = coord.x
            // this.tetrominoElems[index].style.gridRowStart = coord.y
            this.tetrominoElems[index].style.setProperty("grid-column-start", coord.x)
            this.tetrominoElems[index].style.setProperty("grid-row-start", coord.y)
        })
    }

    rotate() {
        this.currentRotation++
        if (this.currentRotation === 4) this.currentRotation = 0
        while (this.rotations[this.currentRotation].some(coord => coord.x < 1)) {
            this.moveRight()
        }
        while (this.rotations[this.currentRotation].some(coord => coord.x > 10)) {
            this.moveLeft()
        }
        this.tetrominoCoords = this.rotations[this.currentRotation]
    }

    moveDown() {
        this.rotations.forEach(rotation => {
            rotation.forEach(coord => {
                coord.y++
            })
        })
    }

    moveRight() {
        this.rotations.forEach(rotation => {
            rotation.forEach(coord => {
                coord.x++
            })
        })

        if (this.rotations[this.currentRotation].some(coord => coord.x > 10)) {
            this.moveLeft()
        }
    }

    moveLeft() {
        this.rotations.forEach(rotation => {
            rotation.forEach(coord => {
                coord.x--
            })
        })

        if (this.rotations[this.currentRotation].some(coord => coord.x < 1)) {
            this.moveRight()
        }
    }

    atBottom() {
        let pieceBelow = false
        Array.from(gameBoard.children).forEach(square => {
            // console.log(square.style.gridColumnStart)
            if (this.rotations[this.currentRotation].some(coord => {
                // console.log(`Current: (${coord.x}, ${coord.y})`)
                // console.log(`Other: (${square.style.gridColumnStart}, ${square.style.gridRowStart})`)
                // console.log (`${square.style.gridRowStart - 1 === coord.y} ${square.style.gridColumnStart == coord.x} ${!this.tetrominoElems.includes(square)}`)
                if (square.style.gridRowStart - 1 === coord.y && parseInt(square.style.gridColumnStart) === coord.x && !this.tetrominoElems.includes(square)) {
                    // console.log("TESTTEST")
                    return true
                }
            })) {
                pieceBelow = true
            }
        })
        return this.rotations[this.currentRotation].some(coord => coord.y >= 20) || pieceBelow
    }
}