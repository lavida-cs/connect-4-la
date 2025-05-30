class Board {
    constructor(column = 7, row = 6) {
        this.cells = document.getElementById('cells')
        this.column = column;
        this.row = row;
        this.totalCell = this.column * this.row
    }
    
    init() {
        this.buildBoard()
    }
    
    buildBoard() {
        for (let i = 1; i <= this.totalCell; i++) {
            const cell = document.createElement('div')
            cell.className = 'cell'
            cell.innerHTML = `<div class="marker" id=${i-1}></div>`
            this.cells.appendChild(cell)
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const connect4Board = new Board()
    connect4Board.init()
})