//FUNZIONE PRICIPALE ATTACCATA AL BOTTONE GIOCA
function play(e){
    //resetto il refresh del bottone submit
    e.preventDefault();
    //prendo il campo di gioco e lo resetto
    let field = document.querySelector('.field');
    field.innerHTML = "";
    //dichiaro il numero di bombe
    const NUMBOMBS = 16;
    //prendo il livello selezionato dall'utente
    const level = document.getElementById('difficulty').value;
    //variabile che conterrà il numero di caselle da creare
    let squareNumbers;
    //tolgo la classe d-none al campo di gioco
    document.querySelector('.field').classList.remove('d-none');
    //variabile per determinare il game over
    let gameOver = false;
    //prendo il contenitore del punteggio
    const scoreBox = document.getElementById('score');

    let win = 0;

    //uso uno switch per determinare il numero di caselle da creare
    switch(level){
        case 'easy':
            squareNumbers = 100;
            break;
        case 'medium':
            squareNumbers = 81;
            break;
        case 'hard':
            squareNumbers = 49;
            break;
    }

    // console.log(squareNumbers);
    let squarePerRow = Math.sqrt(squareNumbers);
    // console.log(squarePerRow);

    //variabile contenente un array di bombe generate random
    const bombs = createBomb(NUMBOMBS, squareNumbers);
    console.log(bombs);
    let score = 0;
    
    //ciclo per creare i quadratini
    for (let i = 1; i <= squareNumbers; i++){
        //variabile in cui va a finire il singolo quadratino
        const square = drawSquare(i, squarePerRow);
        //funzione che al click cambia il colore del quadratino
        square.addEventListener('click', function(){
            //variabile che prende il contenuto di un quadrato
            let bombValue = parseInt(square.innerText);
            // console.log(bombValue);
            //controllo se nell'array di bombe c'è il numero cliccato
            win = squareNumbers - parseInt(bombs.length);
            //scelgo se applicare la classe bomba o scelta giusta
            if (!gameOver && !square.classList.contains('right-choice')){
               if (bombs.includes(bombValue)){
                    square.classList.add('bomb');
                    gameOver = true;
                    scoreBox.innerHTML = `<h3 class="text-center">Hai perso! il tuo punteggio è ${score}</h3>
                    <h4 class="text-center">Premi Gioca per ricominciare</h4>`;
                    showBombs(bombs);
                } else{
                    square.classList.add('right-choice');
                    score++;
                    scoreBox.innerHTML = `<h3>Il tuo punteggio è ${score}</h3>`;
                }
            }
            if (score === win){
                gameOver = true;
                scoreBox.innerHTML = `<h3>Complimenti! Hai vinto! Il tuo punteggio è ${score}</h3>`;
            }
            
            
        })
        //stampo il quadratino
        field.appendChild(square);
    }
    //funzione per mostrare le bombe quando si perde
    function showBombs(bombs){
        const squares = document.querySelectorAll('.square');
        for (square of squares){
            if(bombs.includes(parseInt(square.innerText))){
                square.classList.add('bomb');
            }
        }
    }
}

//funzione per creare i quadratini
function drawSquare(index, numSquares){
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `calc(100% / ${numSquares})`;
    square.style.height = `calc(100% / ${numSquares})`;
    square.innerHTML = `<span>${index}</span>`;
    return square;
}

//funzione per creare un array di bombe randomicamente
function createBomb(bombsNum, numsquares){
    const bombs = [];
    while (bombs.length < bombsNum){
        const bomb = getRndInteger(1, numsquares);
        if (bombs.indexOf(bomb) === -1){
            bombs.push(bomb);
        }
    }
    return bombs;
}

//funzione per generare un numero random
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

