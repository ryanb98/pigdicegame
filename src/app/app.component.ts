import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
public dice1 = 0;
public dice2 = 0;
public roundScore = 0;
public players = [
  {name: 'player1', isActive: true, currentScore: 0}, 
  {name: 'player2', isActive: false, currentScore: 0}
];

  rollDice() {
    this.dice1 = Math.floor(Math.random() * 6) + 1;
    this.dice2 = Math.floor(Math.random() * 6) + 1;
    this.calculateRoundScore();
  }

  calculateRoundScore() {
    this.roundScore += (this.dice1 + this.dice2);

    if (this.dice1 === 1 || this.dice2 === 1) {
      this.roundScore = 0;
      this.finishTurn();
    }
    this.winner();
   }

   finishTurn() {
    const activePlayer = this.players.filter(player => player.isActive);
    activePlayer[0].currentScore += this.roundScore;
    this.roundScore = 0;
    this.players.forEach((player) => {
        player.isActive = !player.isActive;
    });
  }
  
  winner() {
    const checkForWinner = this.players.filter(win => win.currentScore);
    checkForWinner.forEach((winner) => {
      if (winner.currentScore >= 100) {
        alert('winner');
      } 
    });
  }
  
  newGame() {
    this.players.forEach( (player) => {
      player.currentScore = 0;
      this.roundScore = 0;
    })
    location.reload();
  }

}
