import { gameState } from './gamestate.js'

export class Connect4Game {
    constructor() {
        this.board = this.getBoard()
        this.track = {
            p1Score: 0,
            p2Score: 0,
            duration: 30,
            pause: false
        }
        console.log(this.board)
    }
    
    init() {
        this.cacheDom()
        this.bindListeners()
    }
    
    cacheDom() {
        this.menuBtn = document.getElementById('menu-btn')
        this.restartBtn = document.getElementById('restart-btn')
        this.p1Score = document.getElementById('p1-score')
        this.p2Score = document.getElementById('p2-score')
        this.cells = document.getElementById('cells')
        this.playerTurn = document.getElementById('player-turn')
        this.timer = document.getElementById('timer')
        this.playerWinner = document.getElementById('player-winner')
        this.playAgainBtn = document.getElementById('play-again-btn')
        this.modalScreen = document.getElementById('modal-screen')
        this.gameScreen = document.getElementById('connect-4')
    }
    
    bindListeners() {
        this.menuBtn.addEventListener('click', () => this.renderMenuScreen())
    }
    
    getBoard() {
        return new Array(42).fill(0)
    }
    
    renderMenuScreen() {
        this.modalScreen.classList.remove('hide')
        this.gameScreen.classList.add('hide')
    }
}