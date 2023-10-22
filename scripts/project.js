function testChain() {
    const textCont = 'A Markov chain or Markov process is a stochastic model describing a sequence of possible events in which the probability of each event depends only on the state attained in the previous event. Informally, this may be thought of as, "What happens next depends only on the state of affairs now." A countably infinite sequence, in which the chain moves state at discrete time steps, gives a discrete-time Markov chain. A continuous-time process is called a continuous-time Markov chain. It is named after the Russian mathematician Andrey Markov. Markov chains have many applications as statistical models of real-world processes, such as studying cruise control systems in motor vehicles, queues or lines of customers arriving at an airport, currency exchange rates and animal population dynamics. Markov processes are the basis for general stochastic simulation methods known as Markov chain Monte Carlo, which are used for simulating sampling from complex probability distributions, and have found application in Bayesian statistics, thermodynamics, statistical mechanics, physics, chemistry, economics, finance, signal processing, information theory and speech processing. The adjectives Markovian and Markov are used to describe something that is related to a Markov process.'

    const generated = generateMarkovChainLyrics(textCont);

    document.getElementById('generatedLyricsOutput').textContent = generated;
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