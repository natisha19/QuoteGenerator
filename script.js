// Get DOM elements
const quoteText = document.getElementById("quote-text");
const authorText = document.getElementById("author-text");
const newQuoteBtn = document.getElementById("new-quote-btn");
const quoteBox = document.querySelector(".quote-box");

// Add event listener to the "Get Today's Quote" button
newQuoteBtn.addEventListener("click", fetchQuote);

// Fetches the Quote of the Day from ZenQuotes API using a proxy to bypass CORS
async function fetchQuote() {
    const url = `https://api.allorigins.win/get?url=https://zenquotes.io/api/today`;

    try {
        // Fetch data from the proxy API
        const response = await fetch(url);
        const data = await response.json();

        // Parse the inner data from the response contents
        const quoteData = JSON.parse(data.contents);

        // Extract the quote and author from the response
        const quote = quoteData[0];
        
        // Update the DOM with the fetched quote
        quoteText.textContent = `"${quote.q}"`;
        authorText.textContent = `- ${quote.a}`;

        // Fade in the quote box
        quoteBox.style.opacity = 1; // Show the quote box
        newQuoteBtn.style.display = 'none'; // Hide the button after clicking
    } catch (error) {
        // Display error message in case of API failure
        quoteText.textContent = "Sorry, something went wrong. Please try again.";
        authorText.textContent = "";
        console.error("Error fetching quote:", error);
    }
}
