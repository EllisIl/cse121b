async function fetchArtistID(artistName) {
    const response = await fetch(`https://musicbrainz.org/ws/2/artist/?query=${artistName}&limit=1&fmt=json`);
    const data = await response.json();
    return data.artists[0].id;
}

async function fetchAllSongsByArtist(artistName) {
    const artistID = await fetchArtistID(artistName);
    const response = await fetch(`https://musicbrainz.org/ws/2/recording?artist=${artistID}&limit=100&fmt=json`);
    const data = await response.json();
    const songTitles = data.recordings.map(recording => recording.title);

    // Log all song titles to the console
    console.log("Song titles:", songTitles);

    return songTitles;
}

async function fetchLyrics(artist, songTitle) {
    try {
        const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`);
        const data = await response.json();
        return data.lyrics;
    } catch (error) {
        console.error("Error fetching lyrics:", error);
        throw error;  // Re-throwing the error to handle it in the caller function
    }
}

async function generateLyrics() {
    const artist = document.getElementById('artist').value;

    try {
        // Fetch song titles by the artist
        const songs = await fetchAllSongsByArtist(artist);

        // Fetch lyrics of the first song (you could loop through to fetch multiple)
        const songLyrics = await fetchLyrics(artist, songs[0]);

        // Generate Markov Chain lyrics from the fetched lyrics
        const generatedLyrics = generateMarkovChainLyrics(songLyrics);

        // Display the generated lyrics
        document.getElementById('generatedLyricsOutput').textContent = generatedLyrics;

    } catch (error) {
        console.error("Error generating lyrics:", error);
    }
}


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