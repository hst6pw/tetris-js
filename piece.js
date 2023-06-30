import { ROTATIONS } from "./constants.js"

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