const BASE_URL = "http://api.genius.com";
const HEADERS = {
    'Authorization': 'Bearer TOKEN'
};
const SONG_TITLE = "Lake Song";
const ARTIST_NAME = "The Decemberists";

async function fetchLyrics(apiPath) {
    const songResponse = await fetch(BASE_URL + apiPath, { headers: HEADERS });
    const songData = await songResponse.json();
    const page = await fetch("http://genius.com" + songData.response.song.path);
    const htmlText = await page.text();
    const parser = new DOMParser();
    const lyricsDiv = parser.parseFromString(htmlText, 'text/html').querySelector("div.lyrics");
    return lyricsDiv ? lyricsDiv.innerText.trim() : "Lyrics not found";
}

async function getSongInfo() {
    const searchResponse = await fetch(`${BASE_URL}/search?q=${SONG_TITLE}`, { headers: HEADERS });
    const searchData = await searchResponse.json();
    const songInfo = searchData.response.hits.find(hit => hit.result.primary_artist.name === ARTIST_NAME);
    return songInfo ? fetchLyrics(songInfo.result.api_path) : "Song not found";
}

getSongInfo().then(console.log);


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