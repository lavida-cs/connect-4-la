import { gameState } from './gamestate.js'
import { Connect4Game } from './connect4.js'

class App {
    constructor() {
        this.connect4Game = new Connect4Game()
    }
    
    init() {
        this.cacheDom()
        this.bindListeners()
    }
    
    cacheDom() {
        const $ = (s) => document.getElementById(s)
        this.cpuBtn = $('vs-cpu-btn')
        this.playerBtn = $('vs-player-btn')
        this.rulesBtn = $('rules-btn')
        this.modalScreen = $('modal-screen')
        this.rulesModal = $('rules-modal')
        this.menuModal = $('menu-modal')
        this.gameScreen = $('connect-4')
        this.closeRulesBtn = $('close-rules-btn')
    }
    
    bindListeners() {
        this.cpuBtn?.addEventListener('click', () => this.playGame('cpu'))
        this.playerBtn?.addEventListener('click', () => this.playGame('player'))
        this.rulesBtn?.addEventListener('click', () => this.toggleRulesModal())
        this.closeRulesBtn?.addEventListener('click',()=> this.toggleRulesModal())
    }
    
    playGame(mode) {
        gameState.mode = mode
        gameState.running = true
        this.renderGameScreen()
        this.connect4Game.init()
    }
    
    renderGameScreen() {
        this.modalScreen.classList.toggle('hide')
        this.gameScreen.classList.toggle('hide')
    }
    
    toggleRulesModal() {
        this.menuModal.classList.toggle('hide')
        this.rulesModal.classList.toggle('hide')
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const connect4App = new App()
    connect4App.init()
})