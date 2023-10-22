async function generateLyrics() {
    const artist = document.getElementById('artist').value;
    try {
        // Fetching the top songs of the artist from Deezer (as Lyrics.ovh uses it)
        const songsResponse = await fetch(`https://api.deezer.com/search?q=${artist}`);
        const songsData = await songsResponse.json();
        const songTitle = songsData.data[0].title;  // Taking the first song for simplicity

        // Fetching the lyrics of the song from Lyrics.ovh
        const lyricsResponse = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`);
        const lyricsData = await lyricsResponse.json();

        const markovGeneratedLyrics = generateMarkovChainLyrics(lyricsData.lyrics);
        document.getElementById('generatedLyrics').textContent = markovGeneratedLyrics;

    } catch (error) {
        console.error("Error generating lyrics:", error);
    }
}

function generateMarkovChainLyrics(text) {
    const words = text.split(' ');
    const markovChain = {};

    for (let i = 0; i < words.length - 2; i++) {
        const key = words[i] + ' ' + words[i + 1];
        const value = words[i + 2];
        markovChain[key] = markovChain[key] || [];
        markovChain[key].push(value);
    }

    const keys = Object.keys(markovChain);
    let key = keys[Math.floor(Math.random() * keys.length)];
    let result = key;

    for (let i = 0; i < 50; i++) { // Generate 50 words for simplicity
        const words = key.split(' ');
        const nextKey = words[1] + ' ' + (markovChain[key] ? markovChain[key][Math.floor(Math.random() * markovChain[key].length)] : '');
        if (!nextKey.includes('undefined')) {
            result += ' ' + nextKey.split(' ')[1];
            key = nextKey;
        } else {
            break;
        }
    }

    return result;
}