document.addEventListener('DOMContentLoaded', function () {
    const symptomsInput = document.getElementById('symptoms');
    const outputDiv = document.getElementById('output');
    const matchesDiv = document.getElementById('disease-matches');

    let vocabulary = null;
    let diseases = null;  // Will hold disease vectors

    // Load both JSON files
    Promise.all([
        fetch('data/vocab.json').then(res => {
            if (!res.ok) throw new Error('Failed to load vocab.json');
            return res.json();
        }),
        fetch('data/symptoms.json').then(res => {
            if (!res.ok) throw new Error('Failed to load symptoms.json');
            return res.json();
        }),
        fetch('data/prognosis.txt').then(res => {
            if (!res.ok) throw new Error('Failed to load prognosis.txt');
            return res.text();
        })
    ])
        .then(([vocabData, diseaseData, prognosisText]) => {
            vocabulary = vocabData;
            diseases = diseaseData;
            prognosisLines = prognosisText.split(/\r?\n/); // split by newline
            console.log('Vocabulary, diseases and prognosis loaded.');
        })
        .catch(error => {
            console.error('Error loading data:', error);
            alert('Failed to load data files. Check console for details.');
        });

    // ---------- Cosine Similarity Function ----------
    function cosineSimilarity(vecA, vecB) {
        if (!Array.isArray(vecA) || !Array.isArray(vecB) || vecA.length !== vecB.length) {
            console.warn('Invalid vectors for cosine similarity');
            return 0;
        }
        let dot = 0, magA = 0, magB = 0;
        for (let i = 0; i < vecA.length; i++) {
            dot += vecA[i] * vecB[i];
            magA += vecA[i] * vecA[i];
            magB += vecB[i] * vecB[i];
        }
        magA = Math.sqrt(magA);
        magB = Math.sqrt(magB);
        if (magA === 0 || magB === 0) return 0;  // Avoid division by zero
        return dot / (magA * magB);
    }

    // Handle Enter key
    symptomsInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();

            const userInput = symptomsInput.value.trim();
            if (!userInput) {
                alert('Please enter some symptoms.');
                return;
            }

            const tokens = userInput.match(/\b[-\w]+\b/g) || [];
            if (tokens.length === 0) {
                alert('No words found.');
                return;
            }

            // Clear previous outputs
            outputDiv.innerHTML = '';
            matchesDiv.innerHTML = '';

            if (!vocabulary || !diseases || !prognosisLines) {
                outputDiv.textContent = 'Data is still loading. Please try again in a moment.';
                return;
            }

            if (typeof vocabulary !== 'object' || vocabulary === null) {
                outputDiv.textContent = 'Vocabulary has unexpected format.';
                return;
            }

            const knownSymptoms = tokens.filter(token => token in vocabulary);
            const unknownSymptoms = tokens.filter(token => !(token in vocabulary));

            let outputText = '';

            // Display known symptoms with vectors
            if (knownSymptoms.length > 0) {
                outputText += 'Known symptoms with vectors:\n';
                knownSymptoms.forEach(symptom => {
                    const vector = vocabulary[symptom];
                    const vectorStr = Array.isArray(vector)
                        ? '[' + vector.join(', ') + ']'
                        : '[not an array]';
                    outputText += `  ${symptom}: ${vectorStr}\n`;
                });

                // Compute element-wise sum
                const firstVector = vocabulary[knownSymptoms[0]];
                if (Array.isArray(firstVector)) {
                    const vectorLength = firstVector.length;
                    const sumVector = new Array(vectorLength).fill(0);

                    knownSymptoms.forEach(symptom => {
                        const vector = vocabulary[symptom];
                        if (Array.isArray(vector) && vector.length === vectorLength) {
                            for (let i = 0; i < vectorLength; i++) {
                                sumVector[i] += vector[i];
                            }
                        } else {
                            console.warn(`Vector for "${symptom}" has unexpected length/type.`);
                        }
                    });

                    const sumVectorStr = '[' + sumVector.map(v => v.toFixed(8)).join(', ') + ']';
                    outputText += `\nSum of all symptom vectors:\n  ${sumVectorStr}\n`;

                    // ----- Disease similarity -----
                    if (diseases && typeof diseases === 'object') {
                        const similarities = [];
                        for (const [diseaseName, diseaseVec] of Object.entries(diseases)) {
                            if (Array.isArray(diseaseVec) && diseaseVec.length === vectorLength) {
                                const sim = cosineSimilarity(sumVector, diseaseVec);
                                similarities.push({ name: diseaseName, similarity: sim });
                            } else {
                                console.warn(`Disease "${diseaseName}" vector has wrong length or type.`);
                            }
                        }

                        // Sort by similarity descending and take top 3
                        similarities.sort((a, b) => b.similarity - a.similarity);
                        const topMatches = similarities.slice(0, 5);

                        let matchesText = 'Top disease matches (cosine similarity):\n';
                        topMatches.forEach((match, idx) => {

                            // Get prognosis line (assuming diseaseName is the line number as a string)
                            const lineNumber = parseInt(match.name, 10);
                            let prognosis = '';
                            if (!isNaN(lineNumber) && prognosisLines && lineNumber > 0 && lineNumber <= prognosisLines.length) {
                                prognosis = prognosisLines[lineNumber - 1]; // lines are 1-indexed in file
                            } else {
                                prognosis = '(prognosis not found)';
                            }

                            matchesText += `  ${idx + 1}. ${match.name}: ${match.similarity.toFixed(12)} ->`;
                            matchesText += `     Prognosis: ${prognosis}\n`;
                        });
                        matchesDiv.textContent = matchesText;
                    } else {
                        matchesDiv.textContent = 'Disease data not available or invalid.';
                    }
                } else {
                    outputText += '\nCould not compute sum: first symptom vector is not an array.\n';
                }
            } else {
                outputText += 'No known symptoms found.\n';
            }

            // Display unknown symptoms
            if (unknownSymptoms.length > 0) {
                outputText += '\nUnknown symptoms:\n';
                unknownSymptoms.forEach(symptom => {
                    outputText += `  ${symptom}\n`;
                });
            }

            outputDiv.textContent = outputText;
            console.log('Known:', knownSymptoms);
        }
    });
});