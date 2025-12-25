let simData = null;

fetch('https://demo-mocha-delta.vercel.app/skipgram/similarities.json')
    .then(res => res.json())
    .then(data => {
        simData = data;
        console.log('Skip-gram similarities loaded – ready for queries!');
    })
    .catch(err => console.error('Failed to load skipgram/similarities.json', err));

function findMatches() {
    const input = document.getElementById('input').value.toLowerCase().trim();
    const outputDiv = document.getElementById('output');

    if (!input) {
        outputDiv.innerHTML = '<p style="color:#e63946;">Please enter at least one word.</p>';
        return;
    }
    if (!simData) {
        outputDiv.innerHTML = '<p>Loading model data… please wait.</p>';
        return;
    }

    const words = input.split(/\s+/).filter(w => w.length > 0);
    const matches = {};

    words.forEach(word => {
        if (simData[word]) {
            simData[word].forEach(([fullToken, score]) => {
                if (score > 0.10) {  // Slightly lower threshold for better results
                    matches[fullToken] = (matches[fullToken] || 0) + score;
                }
            });
        }
    });

    const sorted = Object.entries(matches)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15);  // Show top 15

    let html = `<h3>Top Similar Symptoms (from 32-line trained Skip-gram model):</h3>`;

    if (sorted.length === 0) {
        html += `<p>No strong matches found. Try common words like "pain", "burning", "diarrhea".</p>`;
    } else {
        html += `<ul class="results-list">`;
        sorted.forEach(([fullToken, totalScore]) => {
            const cleanWord = fullToken.split('(')[0];
            const positionMatch = fullToken.match(/\(([\d]+),([\d]+)\)/);
            const positionText = positionMatch
                ? `First seen at line ${positionMatch[1]}, position ${positionMatch[2]} in training text`
                : '';

            html += `
                <li class="result-item">
                    <strong>${cleanWord}</strong>
                    <span class="score">(score: ${totalScore.toFixed(3)})</span>
                    ${positionText ? `<span class="tooltip">ℹ️<span class="tooltiptext">${positionText}</span></span>` : ''}
                </li>`;
        });
        html += `</ul>`;
    }

    outputDiv.innerHTML = html;
}