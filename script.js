const msgEL = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:', randomNum);

window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

//Ved at initierer nedenstående varibel, får vi nu et objekt at arbejde med

let recognition = new window.SpeechRecognition();

// Start recognition and game

recognition.start(); //Her kalder vi start metoden på recognition objektet

// Capture user speak ved at vælge transcript værdien
function onSpeak(e) {
    const msg = e.results[0][0].transcript;

    WriteMessage(msg);
    checkNumber(msg);
}

// Write what user speaks
function WriteMessage(msg) {
    msgEL.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
    `;
}

// Check msg against number
function checkNumber(msg) {
    const num = +msg;

    // Check if valid number
    if(Number.isNaN(num)) {
        msgEL.innerHTML += '<div>That is not a valid number</div>';
        return;
    }

    // Check in range
    if(num > 100 || num < 1) {
        msgEL.innerHTML += '<div>Number must be between 1 and 100</div>';
        return;
    }

    // Check number
    if(num === randomNum) {
        document.body.innerHTML = `
        <h2>Congrats! You have guessed the number! <br><br>
        It was ${num}</h2>
        <button class="play-again" id="play-again">Play again
        </button>
        `;
    } else if(num > randomNum) {
        msgEL.innerHTML += '<div>GO LOWER</div>';
    } else {
        msgEL.innerHTML += '<div>GO HIGHER</div>';
    }
}

// Generate random number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Speak Result. Vi lytter efter result event

recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
    if(e.target.id == 'play-again') {
        window.location.reload();
    }
});
