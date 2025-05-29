import { gameState } from './gamestate.js'
import { Connect4Game } from './connect4.js'

const connect4 = {
    // dom
    el: {
        cpuBtn: document.getElementById('vs-cpu-btn'),
        playerBtn: document.getElementById('vs-player-btn'),
        rulesBtn: document.getElementById('rules-btn'),
        modalScreen: document.getElementById('modal-screen'),
        gameScreen: document.getElementById('connect-4'),
        setupModal: document.getElementById('setup-modal'),
        rulesModal: document.getElementById('rules-modal')
    },
    
    init() {
        this.bindListeners()
    },
    
    // bind listeners
    bindListeners() {
        this.el.cpuBtn.addEventListener('click', () => this.playGame('cpu'))
        this.el.playerBtn.addEventListener('click', () => this.playGame('player'))
        this.el.rulesBtn.addEventListener('click', () => this.renderRulesModal())
    },
    
    playGame(choosenMode) {
        gameState.running = true
        gameState.mode = choosenMode;
        this.renderGameScreen()
        const connect4Game = new Connect4Game()
        connect4Game.init()
    },
    
    renderGameScreen(){
        this.el.modalScreen.classList.toggle('hide')
        this.el.gameScreen.classList.toggle('hide')
    },
    
    renderRulesModal() {
        this.el.setupModal.classList.toggle('hide')
        this.el.rulesModal.classList.toggle('hide')
        document.getElementById('close-rules-btn').addEventListener('click', () => this.renderRulesModal())
        
    }
}

document.addEventListener('DOMContentLoaded', () => {
    connect4.init()
})