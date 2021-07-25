import { Quotes } from "./Quotes.js";

export class Game {
  constructor(){
    this.quotes = new Quotes();
    this.currentStep = 0;
    this.maxStep = 8;
    this.endGame = false;
    this.keyPressed = [];
    this.lifes = document.querySelectorAll('.life');
    this.elementCategory = document.querySelector('.category');
    this.elementBoard = document.querySelector('.board');
    this.elementKeyboard = document.querySelector('.keyboard');
    this.start();
  }

  start() {
    this.drawLetters();
    this.drawQuote();
    this.drawCategory();
  }

  drawLetters() {
    const letters = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŻŹ";

    for(let i = 0; i < letters.length; i++){  
      const button = document.createElement('button');
      button.classList.add('transition');
      button.innerHTML = letters[i];
      button.addEventListener('click', (event) => this.checkLetter(letters[i], event));
      this.elementKeyboard.appendChild(button);
    }
  }

  drawCategory() {
    this.elementCategory.textContent = "Kategoria: " + this.quotes.category;
  }

  drawQuote() {
    const result = this.quotes.checkQuote();
    this.elementBoard.textContent = result;
    this.checkGameStatus(result);
  }

  checkLetter(letter, event) {
    if(this.endGame) return 
    if(this.keyPressed.indexOf(letter) != -1) return 

    this.keyPressed.push(letter);

    const result = this.quotes.checkLetter(letter);
    event.target.classList.remove('transition');
    if(result){
      event.target.classList.add('correct');
    } else {
      this.currentStep++;
      event.target.classList.add('incorrect');
      this.lifes[this.maxStep-this.currentStep].classList.add('gray');
    }
    this.drawQuote();
  }

  checkGameStatus(result) {
    const quoteGuessed = result.includes('_');
    const remainSteps = this.maxStep - this.currentStep;

    if(remainSteps > 0){
      if(!quoteGuessed){
        this.win()
      }
    } else {
      this.lose();
    }
  }

  win() {
    this.endGame = true;
    this.elementBoard.innerHTML = `
    <span style="color: #55E052;">Wygrałeś!</span><br> 
    Hasło: <span style="color: #55E052;">${this.quotes.title}</span><br>
    <a href=''> Zagraj ponownie</a>`;
    this.elementBoard.classList.add('finish');
  }

  lose() {
    this.endGame = true;
    this.elementBoard.innerHTML = `
    <span style="color: #E05252; margin-bottom: 5px">Przegrałeś!</span><br> 
    Hasło: <span style="color: #E05252;">${this.quotes.title}</span><br>
    <a href=''> Zagraj ponownie</a>`;
    this.elementBoard.classList.add('finish');
  }
}