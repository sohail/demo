# 🩺 A Demonstration Of Word2Vec Medical Symptoms Collocation Matcher

- Live Demo: [https://demo-mocha-delta.vercel.app/](https://demo-mocha-delta.vercel.app/) *(deployed on Vercel for free!)*
- Live Demo: [https://sohail.github.io/demo/](https://sohail.github.io/demo/) *(deployed on GitHub Pages for free!)*

A zero overhead web demo of from scratch **C++** [CBOW implementation](https://github.com/KHAAdotPK/CBOW) trained on just ~14 lines of medical text (symptoms, with 32 unique words/tokens) and [Skip-gram implementation](https://github.com/KHAAdotPK/Skip-gram) trained on just ~32 lines of medical text (symptoms, with 210 total words/tokens out of which 89 were unique). 

## What It Does
- **Input:** Type symptoms like "abdominal", "stools" or "sore".
- **Output:** Instantly shows the most similar tokens/concepts using cosine similarity between averaged embeddings:  
    - (u = (W₁[i] + W₂ᵀ[i])/2 , v = (W₁[j] + W₂ᵀ[j])/2)
    - cosine_similarity = dot(u, vᵀ) / (‖u‖₂ × ‖v‖₂)
    - (with the final value clamped to the range [-1, 1])    
- **Example:** "burning" → "pain (0.664)", so the demos try to get the medical associations between words.

Even on tiny data, the models have captured collocations like "burning pain", "patient has daily chills", "bloody stools", "sore joints" or "fever chills". Scale to bigger datasets for real magic.

## Tech Stack
- **Model:** Custom C++ CBOW and Skip-gram implementations (no libs, trained on 16GB consumer PC, no GPUs).
- **Frontend:** 100% static HTML/JS, loads `similarities.json` at client side.
- **Data:** Pre computed [top] similarities from [Chat-Bot-CBOW training](https://github.com/KHAAdotPK/Chat-Bot-CBOW) and [Chat-Bot-Skip-gram training](https://github.com/KHAAdotPK/Chat-Bot-Skip-gram).
- **Wrapper:** Use [Python port](https://github.com/KHAAdotPK/CBOW-Python-Wrapper) for easy training.

### Built with ❤️ on my workbench... Questions? Open an issue!

![The old guy and his workbench](./old-guy-and-his-work-bench.png)

## Related Repos
- [CBOW C++ Core for training](https://github.com/KHAAdotPK/CBOW)
- [Skip-gram C++ Core for training](https://github.com/KHAAdotPK/Skip-gram)
- [CBOW similarity scripts for pre-computing similarities](https://github.com/KHAAdotPK/Chat-Bot-CBOW)
- [Skip-gram similarity scripts for pre-computing similarities](https://github.com/KHAAdotPK/Chat-Bot-Skip-gram)
- [Python Wrapper over C++ CBOW Core](https://github.com/KHAAdotPK/CBOW-Python-Wrapper)