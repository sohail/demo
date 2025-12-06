# 🩺 CBOW Medical Symptom Matcher Demo

- Live Demo: [https://demo-mocha-delta.vercel.app/](https://demo-mocha-delta.vercel.app/) *(deployed on Vercel for free!)*
- Live Demo: [https://sohail.github.io/demo/](https://sohail.github.io/demo/) *(deployed on GitHub Pages for free!)*

A zero overhead web demo of from scratch **C++** [CBOW implementation](https://github.com/KHAAdotPK/CBOW) trained on just ~14 lines of medical text (symptoms). 

## What It Does
- **Input:** Type symptoms like "abdominal pain burning" or "bloody stools swelling".
- **Output:** Instantly shows the most similar concepts/phrases learned by the model (using pre computed W1 . W1 and W1 . W2ᵀ cosine similarities).
- **Example:** "burning" → "pain (0.664)", it gets medical associations.

Even on tiny data, it captures stuff like "burning pain" or "bloody swelling". Scale to bigger datasets for real magic.

## Tech Stack
- **Model:** Custom C++ CBOW (no libs, trained on 16GB consumer PC, no GPUs).
- **Frontend:** 100% static HTML/JS, loads `similarities.json` at client side.
- **Data:** Pre computed [top] similarities from [Chat-Bot-CBOW training](https://github.com/KHAAdotPK/Chat-Bot-CBOW).
- **Wrapper:** Use [Python port](https://github.com/KHAAdotPK/CBOW-Python-Wrapper) for easy training.

### Built with ❤️ on my workbench... Questions? Open an issue!

![The old guy and his workbench](./old-guy-and-his-work-bench.png)

## Related Repos
- [CBOW C++ Core for training](https://github.com/KHAAdotPK/CBOW)
- [Similarity Scripts for pre-computing similarities](https://github.com/KHAAdotPK/Chat-Bot-CBOW)
- [Python Wrapper over C++ CBOW Core](https://github.com/KHAAdotPK/CBOW-Python-Wrapper)