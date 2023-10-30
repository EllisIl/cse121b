const BASE_URL = 'https://api.datamuse.com/words';  // Datamuse API

async function getRelatedWord(word) {
    const response = await fetch(`${BASE_URL}?rel_syn=${word}`);
    const data = await response.json();

    // Return the original word if no synonym is found, else return the first synonym
    return (data.length > 0) ? data[0].word : word;
}

async function generateMarkovChain() {
    const userText = document.getElementById('userText').value;
    const words = userText.split(' ');

    const markovChain = {};

    for (let i = 0; i < words.length - 1; i++) {
        const key = words[i];
        const value = words[i + 1];

        if (!markovChain[key]) {
            markovChain[key] = [];
        }
        markovChain[key].push(value);
    }

    const numWords = 100;  
    const keys = Object.keys(markovChain);
    let key = keys[Math.floor(Math.random() * keys.length)];
    let result = key;

    for (let i = 0; i < numWords; i++) {
        const nextWords = markovChain[key];
        if (!nextWords) {
            // If no next words, pick another random word to continue
            key = keys[Math.floor(Math.random() * keys.length)];
        } else {
            const nextWord = nextWords[Math.floor(Math.random() * nextWords.length)];

            // Use getRelatedWord once every 5 iterations
            if (i % 5 === 0) {
                const relatedWord = await getRelatedWord(nextWord);
                result += ` ${relatedWord}`;
                key = relatedWord;
            } else {
                result += ` ${nextWord}`;
                key = nextWord;
            }
        }
    }
    document.getElementById('result').textContent = result;
}
