// all of our quotes
const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];
// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const modalElement = document.getElementById("modalMessage");
const modalContent = document.getElementsByClassName("modal-content")[0];
var j = -1;

document.getElementById('start').addEventListener('click', () => {
    // enables the input textbox
    typedValueElement.hidden = false;
    // get a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    // Put the quote into an array of words
    words = quote.split(' ');
    // reset the word index for tracking
    wordIndex = 0;

    // UI updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map(function (word) { return `<span>${word} </span>` });
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    // Clear any prior messages
    messageElement.innerText = '';

    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';
    // set focus
    typedValueElement.focus();
    // set the event handler

    modalContent.innerHTML = `<span class="close">&times;</span>
    <p>successMessage</p>`

    // Start the timer
    startTime = new Date().getTime();
});

window.onclick = function (event) {
    if (event.target == modalElement) {
        modalElement.style.display = "none";
    }
}

typedValueElement.addEventListener('input', () => {
    // Get the current word
    const currentWord = words[wordIndex];
    // get the current value
    const typedValue = typedValueElement.value;
    const span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modalElement.style.display = "none";
    }

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        // end of sentence
        const elapsedTime = new Date().getTime() - startTime;
        
        // Add score to localstorage
        window.sessionStorage.setItem(`${j++} run`, elapsedTime / 1000);
        let strhistory = '';
        for (let i = 0; i < sessionStorage.length; i++) {
            strhistory = strhistory + `${i} run elapsed time: ${sessionStorage.getItem(sessionStorage.key(`${i} run`))}<br>`;
          }
        // Display success
        const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.<br>${strhistory}`;
        //messageElement.innerText = message;

        modalContent.innerHTML = modalContent.innerHTML.replace("successMessage", message);
        modalElement.style.display = "block";

        typedValueElement.hidden = true;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        // end of word
        // clear the typedValueElement for the new word
        typedValueElement.value = '';
        // move to the next word
        wordIndex++;
        // reset the class name for all elements in quote
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        // highlight the new word
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
        // currently correct
        // highlight the next word
        typedValueElement.className = '';
    } else {
        // error state
        typedValueElement.className = 'error';
    }
});