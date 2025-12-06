// Load your pre-computed similarities (W2^T · W1 for context → target)
fetch('similarities.json')
    .then(res => res.json())
    .then(data => {
        window.simData = data;  // { "pain": [["burning", 0.664], ["swelling", 0.422], ...] }
        console.log('Loaded CBOW similarities!');
    });

function findMatches() {
    const input = document.getElementById('input').value.toLowerCase().trim();
    if (!input || !window.simData) return alert('Load data first or enter symptoms!');

    const words = input.split(/\s+/).filter(w => w);
    const matches = {};

    words.forEach(word => {
        if (window.simData[word]) {
            window.simData[word].forEach(([related, score]) => {
                if (score > 0.15) {  // Threshold for relevance
                    matches[related] = (matches[related] || 0) + score;
                }
            });
        }
    });

    const sorted = Object.entries(matches)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    let html = `<h3>Top Matches (from model trained on 14 lines of medical symptoms):</h3><ul>`;
    if (sorted.length) {
        sorted.forEach(([word, score]) => {
            html += `<li><strong>${word}</strong> (score: ${score.toFixed(3)})</li>`;
        });
    } else {
        html += '<li>No strong matches — try more training data next time!</li>';
    }
    html += '</ul>';
    document.getElementById('output').innerHTML = html;
}