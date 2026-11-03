import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
const boundary = script?.indexOf('const KEY=');
if (!script || boundary < 0) throw new Error('Cannot find the embedded game data.');

// Evaluate only the local, authored data and pure helpers before runtime state.
const data = vm.runInNewContext(script.slice(0, boundary) + `
JSON.stringify({
  BANK,
  resolvedKey: [
    ...BANK.patternLabs.flatMap(lab => lab.tasks),
    ...BANK.rooms.flatMap(records),
    ...BANK.checkpoints.flatMap(checkpoint => checkpoint.tasks.flatMap(q =>
      q.mode === 'match'
        ? q.pairs.map((pair, i) => ({...q, ...pair, id: q.id + '-' + i, mode: 'match'}))
        : [q]
    )),
    ...BANK.vault,
    ...BANK.assessment.map(q => ({...q, mode: 'assessment'}))
  ].map(q => ({...q, correctAnswer: answer(q)}))
}, null, 2)
`, {}, {timeout: 1000});

const output = new URL('../question-bank.json', import.meta.url);
fs.writeFileSync(output, data + '\n');
const result = JSON.parse(data);
console.log(`Exported ${result.resolvedKey.length} lesson/game prompts and ${result.BANK.referenceChecks.length} reference checks.`);
