import { gameState } from './gamestate.js'
import { winCombinations } from './combination.js'

export class Connect4Game {
    constructor() {
        this.board = this.getBoard()
        this.player = {
            cPlayer: 'pink',
            cpuMarker: this.cPlayer === 'pink' ? 'orange' : 'pink',
        }
        this.cpuGoesNext = true
    }
    
    init() {
        this.cacheDom()
        this.bindListeners()
    }
    
    cacheDom() {
        const $ = (s) => document.getElementById(s)
        this.modalScreen = $('modal-screen')
        this.gameScreen = $('connect-4')
        this.menuBtn = $('menu-btn')
        this.cells = $('cells')
    }
    
    bindListeners() {
        this.menuBtn.addEventListener('click', () => this.closeGameScreen())
        this.cells.addEventListener('click', this.handleClickedCell.bind(this))
    }
    
    handleClickedCell(e) {
        const marker = e.target.closest('.marker')
        if (!marker) return
        const cellRow = this.getRow(marker.id)
        this.cpuGoesNext = true
        this.getDropPosition(cellRow)
    }
    
    makeCpuMove() {
        this.cpuGoesNext = false;
        const possibleMoves = []
        this.board.forEach((c, i) => {
            if (c === 0) possibleMoves.push(i)
        })
        const cpuMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length) + 1]
        const row = this.getRow(cpuMove)
        this.getDropPosition(row)
    }
    
    getDropPosition(row) {
        for (let i = row.length; i >= 0; i--) {
            if (this.board[row[i]] === 0) {
                this.board[row[i]] = this.player.cPlayer;
                this.dropMarker(row[i])
                this.switchCurrentPlayer();
                break;
            }
        }
        this.checkCpu()
    }
    
    checkCpu() {
        if (gameState.mode === 'cpu' && this.cpuGoesNext) {
            setTimeout(() => {
                this.makeCpuMove()
            }, 400)
        } else { return }
        
    }
    
    dropMarker(indx) {
        const marker = document.getElementById(indx)
        marker.classList.add(this.player.cPlayer)
    }
    
    getRow(i) {
        const col = parseInt(i) % 7
        return [col, col + 7, col + 14, col + 21, col + 28, col + 35]
    }
    
    switchCurrentPlayer() {
        this.player.cPlayer = this.player.cPlayer === 'pink' ? 'orange' : 'pink'
    }
    
    closeGameScreen() {
        this.modalScreen.classList.remove('hide')
        this.gameScreen.classList.add('hide')
    }
    
    getBoard() {
        return Array(42).fill(0)
    }
    
}