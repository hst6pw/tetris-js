import { ROTATIONS } from "./constants.js"

const gameBoard = document.querySelector("#game-board")

export class Piece {
    constructor(rotations) {
        this.rotations = JSON.parse(JSON.stringify(rotations))
        this.currentRotationIndex = 0
        this.tetrominoElems = []
        this.rotations[this.currentRotationIndex]
        .forEach(coord => {
            const tetrominoElem = document.createElement("div")
            tetrominoElem.style.gridColumnStart = coord.x
            tetrominoElem.style.gridRowStart = coord.y
            const tetrominoLetter = Object.keys(ROTATIONS).find(key => ROTATIONS[key] === rotations).toString().toLowerCase()
            tetrominoElem.classList.add("tetromino", tetrominoLetter)
            gameBoard.appendChild(tetrominoElem)
            this.tetrominoElems.push(tetrominoElem)
        })
    }

    update() {
        this.rotations[this.currentRotationIndex].forEach((coord, index) => {
            this.tetrominoElems[index].style.gridColumnStart = coord.x
            this.tetrominoElems[index].style.gridRowStart = coord.y
        })
    }

    rotate() {
        this.currentRotationIndex++
        if (this.currentRotationIndex === 4) this.currentRotationIndex = 0

        if (this.overlaps()) {
            this.currentRotationIndex--
            if (this.currentRotationIndex === -1) this.currentRotationIndex = 3
            return
        }

        if (this.rotations[this.currentRotationIndex].some(coord => coord.y > 20)) {
            this.currentRotationIndex--
            if (this.currentRotationIndex === -1) this.currentRotationIndex = 3
            return
        }

        if (this.rotations[this.currentRotationIndex].some(coord => coord.x < 1)) {
            this.forceMoveRight()
            if (this.overlaps()) {
                this.currentRotationIndex--
                if (this.currentRotationIndex === -1) this.currentRotationIndex = 3
                this.forceMoveLeft()
                return
            }
        }

        if (this.rotations[this.currentRotationIndex].some(coord => coord.x < 1)) {
            this.forceMoveRight()
            if (this.overlaps()) {
                this.currentRotationIndex--
                if (this.currentRotationIndex === -1) this.currentRotationIndex = 3
                this.forceMoveLeft()
                this.forceMoveLeft()
                return
            }
        }

        if (this.rotations[this.currentRotationIndex].some(coord => coord.x > 10)) {
            this.forceMoveLeft()
            if (this.overlaps()) {
                this.currentRotationIndex--
                if (this.currentRotationIndex === -1) this.currentRotationIndex = 3
                this.forceMoveRight()
                return
            }
        }

        if (this.rotations[this.currentRotationIndex].some(coord => coord.x > 10)) {
            this.forceMoveLeft()
            if (this.overlaps()) {
                this.currentRotationIndex--
                if (this.currentRotationIndex === -1) this.currentRotationIndex = 3
                this.forceMoveRight()
                this.forceMoveRight()
                return
            }
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
        if (this.rotations[this.currentRotationIndex].some(coord => coord.x > 9)) return

        let pieceRight = false

        Array.from(gameBoard.children).forEach(square => {
            if (this.rotations[this.currentRotationIndex].some(coord => {
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

    forceMoveRight() {
        this.rotations.forEach(rotation => {
            rotation.forEach(coord => {
                coord.x++
            })
        })
    }

    forceMoveLeft() {
        this.rotations.forEach(rotation => {
            rotation.forEach(coord => {
                coord.x--
            })
        })
    }

    moveLeft() {
        if (this.rotations[this.currentRotationIndex].some(coord => coord.x < 2)) return

        let pieceLeft = false
        
        Array.from(gameBoard.children).forEach(square => {
            if (this.rotations[this.currentRotationIndex].some(coord => {
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
            if (this.rotations[this.currentRotationIndex].some(coord => {
                if (parseInt(square.style.gridRowStart) - 1 === coord.y && parseInt(square.style.gridColumnStart) === coord.x && !this.tetrominoElems.includes(square)) {
                    return true
                }
            })) {
                pieceBelow = true
            }
        })
        return this.rotations[this.currentRotationIndex].some(coord => coord.y >= 20) || pieceBelow
    }

    overlaps() {
        let overlap = false

        Array.from(gameBoard.children).forEach(square => {
            if (this.rotations[this.currentRotationIndex].some(coord => {
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