const GENIUS_API_URL = 'https://api.genius.com';
const GENIUS_ACCESS_TOKEN = 'YOUR_GENIUS_API_KEY';

function searchArtist(artistName) {
    return fetch(`${GENIUS_API_URL}/search?q=${artistName}`, {
        headers: {
            'Authorization': 'Bearer ' + GENIUS_ACCESS_TOKEN
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.response && data.response.hits && data.response.hits.length) {
            // Take the first hit (you can loop through hits if you want more songs)
            return data.response.hits[0].result;
        } else {
            throw new Error('No results found.');
        }
    });
}

function getLyrics(url) {
    // This fetches the page and extracts lyrics. Note: This method might not always be reliable.
    return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
        .then(response => response.json())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, 'text/html');
            const lyrics = doc.querySelector('.lyrics');
            return lyrics ? lyrics.innerText.trim() : 'Lyrics not found';
        });
}

// Example usage:
searchArtist('Eminem').then(song => {
    console.log(`Fetching lyrics for ${song.title} by ${song.primary_artist.name}`);
    return getLyrics(song.url);
}).then(lyrics => {
    console.log(lyrics);
}).catch(error => {
    console.error(error);
});


// code that is commented out can be used for a more advanced variant of a Markov chain but if you have small datasets, it can sometimes work better.
function generateMarkovChainLyrics(text) {
    // Split the input text into individual words
    const words = text.split(' ');
    const numWord = 100;
    const markovChain = {};

    // Create a Markov Chain using consecutive word pairs as keys and the subsequent word as value
    for (let i = 0; i < words.length - 2; i++) {
        const key = words[i]; /// const key = `${words[i]} ${words[i + 1]}`;
        const value = words[i + 2];

        // If the key exists, append the value to it. If not, create a new array for that key
        markovChain[key] = markovChain[key] || [];
        markovChain[key].push(value);
    }

    // Choose a random starting point from the Markov Chain keys
    const keys = Object.keys(markovChain);
    let key = keys[Math.floor(Math.random() * keys.length)];
    let result = key;

    // Generate a chain of words using the Markov Chain
    for (let i = 0; i < numWord; i++) {
        const words = key.split(' ');
        
        // If next word exists for the current key, pick a random next word
        // Otherwise, use an empty string
        const nextKeyWord = markovChain[key]
            ? markovChain[key][Math.floor(Math.random() * markovChain[key].length)]
            : '';

        const nextKey = `${words[1]} ${nextKeyWord}`;

        // Append the next word to the result if it's valid
        if (nextKeyWord){ ///(!nextKey.includes('undefined')) {
            result += ` ${nextKeyWord}` ///` ${nextKey.split(' ')[1]}`;
            key = nextKeyWord;
        } else {
            break;
        }
    }
    return result;
}