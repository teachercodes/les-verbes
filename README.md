# Operation Verb Heist

A browser-based French conjugation adventure for Grade 7. Investigate a sabotaged museum, bypass its security, and recover the Prism of Voices.

**Single-file game · Works offline · No installation · No backend · No external assets**

## Play locally

Download and extract this pack, then open **`index.html`** in a modern web browser. Enter an agent name or codename to begin.

The HTML file contains the complete game, CSS, JavaScript, question bank, and SVG graphics. The companion files support teaching and editing; they are not required to play.

## Publish with GitHub Pages

1. Create a GitHub repository, for example `operation-verb-heist`.
2. Upload the files inside this extracted folder to the repository root. Keep `index.html` at the top level.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select **main** and **/(root)**, then **Save**.
6. When publishing finishes, open the link shown by GitHub Pages.

No build command or package installation is needed. The included `.nojekyll` file marks the pack as static content.

Official instructions: [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and [Configuring its publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Learning sequence

1. Learn how **ouvrir, offrir, découvrir** use regular -er endings in the present tense.
2. Observe **lire, écrire, dire**, record a hypothesis in your own words, and test it in new sentences.
3. Investigate six rooms containing authentic and corrupted records.
4. Complete five heist checkpoints and a final vault combining all six verbs.
5. Submit a separate 12-question assessment and download an individual report.

Each reference lookup requires a correct regular-verb warm-up. The reference is sealed during pattern discovery and final assessment. The interface uses a restrained cyberpunk palette with inline neon museum, prism, and room graphics.

See [teacher-guide.md](teacher-guide.md) for the 60-minute lesson plan, answer key, scoring, reports, and classroom guidance.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Complete standalone game; GitHub Pages entry point |
| `question-bank.json` | Exported teaching data and resolved answers |
| `teacher-guide.md` | Lesson plan, teaching notes, and answer key |
| `.nojekyll` | Static GitHub Pages publishing marker |
| `.gitignore` | Keeps common temporary files out of Git |
| `tests/verify-game.mjs` | Optional dependency-free engine checks |
| `tools/export-question-bank.mjs` | Regenerates the JSON companion from the HTML |

## Customize the content

Edit **`const BANK = { … }`** inside `index.html`. It supplies forms, sentences, pattern labs, reference-access questions, mission tasks, hints, and scoring settings.

The game reads its embedded BANK. Editing the companion JSON alone does not change gameplay. After changing the embedded data, you can regenerate the companion export with the optional developer command below. Teacher HQ can also download the current question bank.

## Optional developer commands

With Node.js 18 or newer installed, run these commands from the repository folder:

```sh
node tests/verify-game.mjs
node tools/export-question-bank.mjs
```

No npm install is needed. The checks cover the conjugation data, discovery progression, reference-access gate, mission route, scoring, assessment, report escaping, and saved progress. They use a simulated DOM; browser playtesting is still useful after interface changes. The included tests describe the current lesson, so intentional question-count or scoring changes require corresponding test updates.

## Progress and reports

Progress and answers remain in the browser's local storage. Reports are downloaded locally as printable HTML. Use a codename on shared devices. Only one active session is saved per browser and origin; a new operation replaces it. Local-file and hosted versions keep separate progress.

The pack contains game source and teaching materials. It does not include saved student sessions or sample student reports.
