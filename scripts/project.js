const BASE_URL = "https://cors-anywhere.herokuapp.com/https://api.genius.com";
const HEADERS = {
    'Authorization': 'Bearer ssE0vadaB3sDJxXIagoLgUTTHzyst7jMXE2CzpnTtMMENy2IdrblqmnF1dr1Li1H'
};

async function lyricsFromSongApiPath(songApiPath) {
    const songUrl = BASE_URL + songApiPath;
    const songResponse = await fetch(songUrl, { headers: HEADERS });
    const songData = await songResponse.json();
    const path = songData.response.song.path;

    const pageUrl = "https://genius.com" + path;
    const pageResponse = await fetch(`https://cors-anywhere.herokuapp.com/${pageUrl}`);
    const pageText = await pageResponse.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(pageText, 'text/html');

    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => script.remove());

    const lyricsDiv = doc.querySelector("div[data-lyrics-container]");
    return lyricsDiv ? lyricsDiv.innerText.trim() : "Lyrics not found";
}

// ... (rest of the code remains the same)

async function generateLyrics() {
    const artistInput = document.getElementById("artist");
    const songTitleInput = document.getElementById("songTitle");

    const ARTIST_NAME = artistInput.value;
    const SONG_TITLE = songTitleInput.value;

    const searchResponse = await fetch(`${BASE_URL}/search?q=${SONG_TITLE}`, { headers: HEADERS });
    const searchData = await searchResponse.json();
    const song = searchData.response.hits.find(hit => hit.result.primary_artist.name === ARTIST_NAME);

    if (!song) {
        document.getElementById("generatedLyrics").textContent = "Song not found";
        return;
    }

    const lyrics = await lyricsFromSongApiPath(song.result.api_path);
    const generatedLyrics = generateMarkovChainLyrics(lyrics);

    document.getElementById("generatedLyrics").textContent = generatedLyrics;
}

// ... (rest of the code remains the same)


function generateMarkovChainLyrics(text) {
    const words = text.split(' ');
    const numWord = 50;
    const markovChain = {};

    for (let i = 0; i < words.length - 2; i++) {
        const key = words[i];
        const value = words[i + 2];

        markovChain[key] = markovChain[key] || [];
        markovChain[key].push(value);
    }

    const keys = Object.keys(markovChain);
    let key = keys[Math.floor(Math.random() * keys.length)];
    let result = key;

    for (let i = 0; i < numWord; i++) {
        const words = key.split(' ');
        const nextKeyWord = markovChain[key] ? markovChain[key][Math.floor(Math.random() * markovChain[key].length)] : '';

        if (nextKeyWord) {
            result += ` ${nextKeyWord}`;
            key = nextKeyWord;
        } else {
            break;
        }
    }
    return result;
}
