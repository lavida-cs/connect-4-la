import { gameState } from './gamestate.js';
import { winCombinations } from './combination.js';

export class Connect4Game {
    constructor() {
        this.board = this.getBoard();
        this.player = {
            cPlayer: 'pink',
            cpuMarker: this.cPlayer === 'pink' ? 'orange' : 'pink',
            winner: null
        };
        this.cpuState = {
            cpuGoesNext: false,
            isProcessing: false,
        };
        this.score = {
            p1Score: 0,
            p2Score: 0
        };
    }
    
    // =======================
    // === GAME LOGIC METHODS
    // =======================
    
    // Handles user clicks on game cells to process player moves
    handleClickedCell(e) {
        if (!gameState.running) return;
        if (this.cpuState.isProcessing) return;
        this.cpuState.cpuGoesNext = true;
        
        const marker = e.target.closest('.marker');
        if (!marker) return;
        
        const cellRow = this.getRow(marker.id);
        this.getDropPosition(cellRow);
    }
    
    // Determines the position to drop a marker in a column and updates the game state
    getDropPosition(row) {
        for (let i = row.length - 1; i >= 0; i--) {
            if (this.board[row[i]] === 0) {
                this.board[row[i]] = this.player.cPlayer;
                this.dropMarker(row[i]);
                this.checkWin();
                this.switchCurrentPlayer();
                break;
            }
        }
        this.checkCpuMode();
    }
    
    // Triggers the CPU's move in CPU mode with a slight delay
    checkCpuMode() {
        if (gameState.mode === 'cpu' && this.cpuState.cpuGoesNext && gameState.running) {
            this.cpuState.isProcessing = true;
            setTimeout(() => {
                this.makeCpuMove();
            }, 400);
        }
    }
    
    // Executes the CPU's move by selecting a random valid position
    makeCpuMove() {
        this.cpuState.cpuGoesNext = false;
        this.cpuState.isProcessing = false;
        
        const possibleMoves = [];
        this.board.forEach((c, i) => {
            if (c === 0) possibleMoves.push(i);
        });
        
        const cpuMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        const row = this.getRow(cpuMove);
        this.getDropPosition(row);
    }
    
    // Checks for a winning combination and ends game if found
    checkWin() {
        const combo = this.getWin();
        if (!combo) return;
        
        gameState.running = false;
        setTimeout(() => { this.animateWinMarkers(combo); }, 300);
        
        if (this.player.winner === 'pink') {
            this.score.p1Score++;
        } else {
            this.score.p2Score++;
        }
        
        this.updatePlayersScore();
        this.toggleWinnerScreen();
    }
    
    // Determines if the current board has a winner
    getWin() {
        for (let combination of winCombinations) {
            const [a, b, c, d] = combination;
            if (
                this.board[a] !== 0 &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c] &&
                this.board[a] === this.board[d]
            ) {
                this.player.winner = this.board[a].trim();
                return [a, b, c, d];
            }
        }
        return null;
    }
    
    // ========================
    // === HELPER/UTILITY METHODS
    // ========================
    
    // Updates the UI by adding a marker class to the specified cell
    dropMarker(indx) {
        const marker = document.getElementById(indx);
        marker.classList.add(this.player.cPlayer);
    }
    
    // Switches the current player between 'pink' and 'orange'
    switchCurrentPlayer() {
        this.player.cPlayer = this.player.cPlayer === 'pink' ? 'orange' : 'pink';
    }
    
    // Calculates the row indices for a given column
    getRow(i) {
        const col = parseInt(i) % 7;
        return [col, col + 7, col + 14, col + 21, col + 28, col + 35];
    }
    
    // Creates an empty game board with 42 cells
    getBoard() {
        return Array(42).fill(0);
    }
    
    // Animates the winning marker cells
    animateWinMarkers(combination) {
        let [a, b, c, d] = combination;
        let cell1 = document.getElementById(a).parentElement;
        let cell2 = document.getElementById(b).parentElement;
        let cell3 = document.getElementById(c).parentElement;
        let cell4 = document.getElementById(d).parentElement;
        
        const cells = [cell1, cell2, cell3, cell4];
        cells.forEach(cell => {
            cell.classList.add('shake');
        });
    }
    
    // Clears all markers from the board
    cleanBoard() {
        const markers = Array.from(this.cells.querySelectorAll('.marker'));
        markers.forEach((marker) => {
            marker.classList.remove('pink', 'orange');
        });
    }
    
    // ========================
    // === UI AND EVENT METHODS
    // ========================
    
    // Initializes the game by setting up the DOM cache and event listeners
    init() {
        this.cacheDom();
        this.bindListeners();
    }
    
    // Caches DOM elements for efficient access throughout the game
    cacheDom() {
        const $ = (s) => document.getElementById(s);
        this.modalScreen = $('modal-screen');
        this.gameScreen = $('connect-4');
        this.menuBtn = $('menu-btn');
        this.restartBtn = $('restart-btn');
        this.playAgainBtn = $('play-again-btn');
        this.cells = $('cells');
        this.player1Score = $('p1-score');
        this.player2Score = $('p2-score');
        this.winIndicator = $('win-indicator');
        this.turnIndicator = $('turn-indicator');
        this.winOverlay = $('win-overlay');
    }
    
    // Binds event listeners to handle user interactions
    bindListeners() {
        this.menuBtn.addEventListener('click', () => this.closeGameScreen());
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.playAgainBtn.addEventListener('click', () => this.startNewGame());
        this.cells.addEventListener('click', this.handleClickedCell.bind(this));
    }
    
    // Hides the game screen and shows the modal screen
    closeGameScreen() {
        this.modalScreen.classList.remove('hide');
        this.gameScreen.classList.add('hide');
    }
    
    // Starts a new round after a win
    startNewGame() {
        this.board = this.getBoard();
        this.toggleWinnerScreen();
        this.winOverlay.classList.remove(this.player.winner);
        this.cleanBoard();
        gameState.running = true;
    }
    
    // Restarts the entire game (scores and board)
    restartGame() {
        this.board = this.getBoard();
        this.score = {
            p1Score: 0,
            p2Score: 0
        };
        this.updatePlayersScore();
        this.cleanBoard();
    }
    
    // Toggles the winner UI screen
    toggleWinnerScreen() {
        this.winIndicator.classList.toggle('hide');
        this.turnIndicator.classList.toggle('hide');
        this.winOverlay.classList.add(this.player.winner);
    }
    
    // Updates the DOM to show current player scores
    updatePlayersScore() {
        this.player1Score.textContent = this.score.p1Score;
        this.player2Score.textContent = this.score.p2Score;
    }
}