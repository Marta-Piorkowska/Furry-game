
const Furry= require('./Furry.js');
const Coin= require('./Coin.js');





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