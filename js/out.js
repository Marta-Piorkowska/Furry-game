/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


const Furry= __webpack_require__(1);
const Coin= __webpack_require__(2);





class Game {
    constructor(board, furry, coin, score){
        this.board = document.querySelectorAll('#board div');
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 1;
    }

    index(x,y) {
        return x + (y * 10);
    }

    showFurry() {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    }

    hideVisibleFurry() {
        document.querySelector('.furry').classList.remove('furry');
    }

    showCoin() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }

    moveFurry() {
        if(this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if ( this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if ( this.furry.direction === "up") {
            this.furry.y = this.furry.y - 1;
        } else if ( this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;
        }
        this.gameOver();
        this.hideVisibleFurry();
        this.showFurry();
        this.checkCoinCollision();
    }

    turnFurry(event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
        }
    }

    checkCoinCollision() {

        if (this.board[this.index(this.furry.x, this.furry.y)]
            ===
            this.board[this.index(this.coin.x, this.coin.y)]){

            this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');


            var strong = document.querySelector('strong');
            strong.innerText = this.score ++;
            this.coin=new Coin();
            this.showCoin();

        }
    }

    gameOver() {
        var body = document.querySelector('body');
        if (this.furry.x< 0
            || this.furry.x > 9
            || this.furry.y > 9
            || this.furry.y < 0){
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            body.innerHTML=`
            <div class="gameOver">
                <h1>GAME OVER</h1>
                    <br>
                <h1>YOUR SCORE: ${this.score -1}</h1>
            </div>
            `;
        }
    }

    startGame() {
        this.idSetInterval = setInterval(() =>
            this.moveFurry(), 250);

    }

}

const game = new Game();

game.showFurry();
game.showCoin();
game.startGame();

document.addEventListener('keydown', function(event){
    game.turnFurry(event);
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Furry{
    constructor(x, y, direction){
        this.x = 0;
        this.y = 0;
        this.direction = "right";
    }
}

module.exports = Furry;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Coin{
    constructor(x, y){
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }
}
module.exports = Coin;

/***/ })
/******/ ]);