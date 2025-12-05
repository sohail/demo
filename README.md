# 🩺 CBOW Medical Symptom Matcher Demo

Live Demo: [https://demo-sohail.vercel.app](https://demo-sohail.vercel.app) *(deploy on Vercel for free!)*

A zero-overhead web demo of my from-scratch C++ [CBOW implementation](https://github.com/KHAAdotPK/CBOW) trained on just ~60 lines of medical text. 

## What It Does
- **Input:** Type symptoms like "abdominal pain burning" or "bloody stools swelling".
- **Output:** Instantly shows the most similar concepts/phrases learned by the model (using pre-computed W2ᵀ · W1 cosine similarities).
- **Example:** "burning" → "pain (0.664)" — it already gets medical associations!

Even on tiny data, it captures stuff like "burning pain" or "bloody swelling". Scale to bigger datasets for real magic.

## Tech Stack
- **Model:** Custom C++ CBOW (no libs, 16GB consumer PC, no GPU).
- **Frontend:** 100% static HTML/JS — loads `similarities.json` client-side.
- **Data:** Pre-computed top similarities from [Chat-Bot-CBOW training](https://github.com/KHAAdotPK/Chat-Bot-CBOW).
- **Wrapper:** Use my [Python port](https://github.com/KHAAdotPK/CBOW-Python-Wrapper) for easy integration.

## Quick Start
1. Clone & open `index.html` locally.
2. Or deploy to [Vercel](https://vercel.com) (free, 1-click from this repo).
3. Export your own weights: Run the Python snippet to generate `similarities.json`.

## Screenshots
*(Add a GIF here later — e.g., input "pain" → output list)*

Built with ❤️ on a workbench after school pickup. Questions? Open an issue!

## Related Repos
- [CBOW C++ Core](https://github.com/KHAAdotPK/CBOW)
- [Training Scripts](https://github.com/KHAAdotPK/Chat-Bot-CBOW)
- [Python Wrapper](https://github.com/KHAAdotPK/CBOW-Python-Wrapper)