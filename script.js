var data;
let front = true;

// Getting the front and the back author boxes
const authors = document.querySelectorAll(".author");

// Getting the front and the back texts
const texts = document.querySelectorAll(".text");

// Getting the body
const body = document.getElementById("body");

// Getting the buttons
const button = document.querySelectorAll(".new-quote");

const blockFront = document.querySelector(".block__front");
const blockBack = document.querySelector(".block__back");

const authorFront = authors[0];
const authorBack = authors[1];

const textFront = texts[0];
const textBack = texts[1];

const buttonFront = button[0];
const buttonBack = button[1];

// An arrow function used to get a quote randomly
const displayQuote = () => {

    // Generates a random number between 0 
    // and the length of the dataset
    let index = Math.floor(Math.random() * data.length);

    // Stores the quote present at the randomly generated index
    let quote = data[index].content || data[index].text;

    // Stores the author of the respective quote
    let author = data[index].author;

    // Making the author anonymous if no author is present
    if (!author) {
        author = "Anonymous";
    }

    // Replacing the current quote and the author with a new one
    if (front) {
        // Changing the front if back-side is displayed
        textFront.innerHTML = quote;
        authorFront.innerHTML = author;
    } else {
        // Changing the back if front-side is displayed
        textBack.innerHTML = quote;
        authorBack.innerHTML = author;
    }

    front = !front;
}

// Local quote data in case of API failure
const localQuotes = [
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll" },
    { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    // Add more quotes as needed
];

// Fetching the quotes from the Quotable API using promises
fetch("https://api.quotable.io/quotes?limit=100")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // Storing the quotes internally upon successful completion of request
        this.data = data.results; // Quotable API returns an array in `results`

        // Displaying the quote When the Webpage loads
        displayQuote();
    })
    .catch(function (error) {
        console.error("Error fetching quotes:", error);

        // Fallback to local quotes in case of API failure
        data = localQuotes;
        displayQuote();
    });

// Adding an onclick listener for the button
function newQuote() {

    // Rotating the Quote Box
    blockBack.classList.toggle('rotateB');
    blockFront.classList.toggle('rotateF');

    // Displaying a new quote when the button is clicked
    displayQuote();
}
