# Operation Verb Heist

Open `index.html` in a modern browser. The complete game is one HTML file, with embedded CSS, JavaScript, and teaching content. It has no runtime network requests, backend, login, fonts, libraries, or external assets. You can distribute the file through your school’s usual platform or copy it to student devices.

## Run the lesson

| Activity | Minutes | Guidance |
| --- | ---: | --- |
| Introduction and pattern discovery | 8 | Enter a codename. Teach ouvrir/offrir/découvrir, then let students observe lire/écrire/dire signals, write their own rules, and test them before entering the museum. |
| Mission 1: Impostor Protocol | 17 | Select six rooms in any order. Inspect an object, judge each record, and repair corrupt forms. Collect six code fragments and clues. |
| Mission 2: Vault Break-In | 23 | Bypass five checkpoints, identify the culprit, and open six vault locks. |
| Individual assessment | 7 | Complete all 12 new sentences, review, and submit once. Resources are sealed during assessment. |
| Debrief | 5 | Review corrections, explain the disguised -ir pattern and vous dites, then download reports. |

Times are suggestions; there is no time limit or forced waiting. Classroom pacing has not been tested with a student cohort.

## Content and controls

- The opening signal lab teaches the three disguised -ir verbs first. Students then reveal singular and plural examples for lire, écrire and dire, write an ungraded hypothesis in their own words, and test two new sentences per verb. Grammar explanations appear after successful testing. Students can refine their own rule afterward.
- 36 investigation records cover all six subject groups for each verb. Each room mixes authentic and corrupt forms.
- Five checkpoints provide 22 responses through typing, a number cipher, dialogue selection, and three subject–verb wire matches.
- Six vault locks combine all six verbs. The final assessment has two typed questions per verb.
- Tap rooms and objects, use the on-screen choices, or type only the missing conjugated verb. The **é** button helps during découvrir practice. In assessment, students may copy the provided é character.
- Capitalization and extra spaces are ignored; accents count. Only the missing verb form is accepted.
- The **Evidence** notebook preserves recovered clues. **Field manual** shows all 36 forms only after a correct regular-verb access check, such as nous ___ (finir) → finissons. Closing the reference reseals it; each new lookup requires another check. **Teacher HQ** uses the same gate and includes the generated answer key and question-bank JSON download. The full reference and Teacher HQ stay sealed during learner discovery and assessment. The gate is a learning activity, not secure teacher authentication.

## Feedback and scoring

Incorrect responses never advance a language challenge. Incorrect classifications explain the correct analysis; a corrupted record still needs a typed repair. Repeated errors in typing or selection show a worked model that must be acknowledged and retyped. An incorrect wire match reveals the correct connection.

Mission challenges earn 10 points, minus 3 per error, with a minimum of 2. The three-wire puzzle is one challenge. A perfect mission score is 620. The 12-question final assessment has a separate score and does not add mission points. The culprit deduction, access-code gate, discovery lab and reference-access warm-ups do not add points.

## Student reports

Use **Download report** at the end. For an unfinished session, use **Teacher HQ → Download progress report**. The self-contained HTML report contains the student’s name, mission points, assessment result, performance by verb, every submitted question and answer, the expected answer, correctness, and whether earlier errors had triggered support.

Reports also preserve each learner’s own pattern hypotheses, all discovery-test submissions, and reference-access checks in separate sections. These do not affect mission or assessment performance.

Open the report in a browser to read or print it. Use the browser’s **Print → Save as PDF** for a PDF copy. No report is uploaded or automatically sent to a teacher.

First-attempt rates count the first submission to each question stage. Identification and repair are separate stages, so a corrupt investigation record can contribute two scored stages. Repeated attempts remain in the history but do not inflate first-attempt denominators. Each assessment verb has two questions.

## Saving and replay

Progress saves locally on the current browser and origin. After reopening, select **Resume Agent …**. Moving the HTML file, switching browser, clearing browser storage, or using private browsing can affect saved progress. If local storage is unavailable, the game displays a warning and continues in the open tab.

Use codenames on shared devices. Download the report before **New operation / replay**; confirming a replay replaces the current saved session. Students can also start a new codename from the opening screen. Only one active session is saved per browser/origin. Elapsed time in reports includes time with the tab closed.

## Edit and reuse

Find `const BANK = {` near the beginning of the HTML’s script. This object supplies the conjugation tables, sentence templates, impostor forms, room clues, pattern labs, reference-access checks, checkpoints, vault challenges, and assessment. The companion `question-bank.json` exports the same data and resolved key for convenient review; the HTML uses its embedded BANK, so edits to the companion JSON must be copied into the HTML to take effect.

- `verbs`: six present-tense forms in subject order, plus the grammar explanation.
- `patternLabs`: observation prompts, hints, and the two transfer sentences for each irregular verb.
- `referenceChecks`: simple regular-verb questions, exact answers, and hints; checks rotate on every lookup.
- `subjects`: the subject order used by the form arrays.
- `rooms`: six sentence templates and six presented forms per room. `{v}` is replaced by the presented or correct form.
- `checkpoints`: tasks with `mode` (`type`, `choice`, `decode`, or `match`), `verb`, subject index `p`, sentence `s`, and optional choices or pairs.
- `vault` and `assessment`: fresh tasks using the same schema.
- `settings`: the number of errors before a model appears and the point values.
- `code`: one code fragment for each room in floor-plan order.

The engine accepts a task-level `answer` override for explicitly authored answers. For other tenses or grammar topics, update the answer data, prompts, explanations, task instructions, and lesson labels together. The current number cipher assumes unaccented A–Z answers and is used only for lire; choose another mode for accented or multiword answers. Matching currently uses three pairs with distinct answers. This MVP’s map and pacing assume six investigation rooms and five checkpoints; expanding those counts requires layout changes. Editing question data after students start should be accompanied by a new storage key/version so old sessions do not conflict.

## Teacher answer essentials

Access code: **316245**. Culprit: **A. Moreau, chief curator**.

| Subject | écrire | lire | dire | ouvrir | offrir | découvrir |
| --- | --- | --- | --- | --- | --- | --- |
| je | écris | lis | dis | ouvre | offre | découvre |
| tu | écris | lis | dis | ouvres | offres | découvres |
| il / elle / on | écrit | lit | dit | ouvre | offre | découvre |
| nous | écrivons | lisons | disons | ouvrons | offrons | découvrons |
| vous | écrivez | lisez | dites | ouvrez | offrez | découvrez |
| ils / elles | écrivent | lisent | disent | ouvrent | offrent | découvrent |

Ouvrir, offrir, and découvrir use **-e, -es, -e, -ons, -ez, -ent** in the present tense. Remember **vous dites**.

## Verification

The complete route was played in the browser, including intentional classification, repair, wiring, code, and deduction errors. Assessment sealing, resuming across reloads, the accent control, and HTML report download were checked. Engine checks independently verified all 36 forms, 82 unique lesson/game prompts plus 6 reference-access questions, the 620-point perfect route, all 88 scored stages, corrective gating, report escaping, and saved progress.

The revised opening, all three discovery labs, wrong and correct reference checks, repeated-look-up gating, Teacher HQ gating, saved progress, and the additional report sections were also verified in the browser. The visual update uses inline SVG line icons, a faceted prism and a small neon museum skyline; it adds no assets to download or runtime dependencies.
