const gameBoard = document.querySelector("#game-board")

export class Piece {
    constructor(rotations) {
        this.rotations = rotations
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
            this.tetrominoElems[index].style.gridColumnStart = coord.x
            this.tetrominoElems[index].style.gridRowStart = coord.y
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
}