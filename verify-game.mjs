import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const script=html.split('<script>')[1].split('</script>')[0];
new vm.Script(script); // Parse the exact shipped JavaScript.
const els=new Map(),memory=new Map();
const el=id=>{if(!els.has(id))els.set(id,{innerHTML:'',textContent:'',value:'',disabled:false,isConnected:false,focus(){},scrollIntoView(){},querySelectorAll(){return[];}});return els.get(id);};
const context=vm.createContext({console,Date,Map,Set,URL,Blob,setTimeout,innerWidth:1280,localStorage:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k)},window:{scrollTo(){}},document:{getElementById:el,querySelector:()=>el('modal'),querySelectorAll:()=>[],addEventListener(){},activeElement:null,body:{appendChild(){}}},assert});
vm.runInContext(script,context);
vm.runInContext(`
const expectedForms={
'écrire':['écris','écris','écrit','écrivons','écrivez','écrivent'],
'lire':['lis','lis','lit','lisons','lisez','lisent'],
'dire':['dis','dis','dit','disons','dites','disent'],
'ouvrir':['ouvre','ouvres','ouvre','ouvrons','ouvrez','ouvrent'],
'offrir':['offre','offres','offre','offrons','offrez','offrent'],
'découvrir':['découvre','découvres','découvre','découvrons','découvrez','découvrent']};
Object.entries(expectedForms).forEach(([v,forms])=>assert.equal(JSON.stringify(BANK.verbs[v].forms),JSON.stringify(forms)));
const resolved=resolvedBank();assert.equal(resolved.length,82);assert.equal(new Set(resolved.map(q=>q.id)).size,82);
resolved.forEach(q=>{assert.equal(typeof answer(q),'string');assert.ok(q.s.includes('{v}'));});
BANK.rooms.forEach(r=>{const rr=records(r);assert.ok(rr.some(q=>q.given===answer(q)));assert.ok(rr.some(q=>q.given!==answer(q)));});
assert.equal(norm('  DÉCOUVRE  '),norm('découvre'));assert.notEqual(norm('decouvre'),norm('découvre'));
// Learning order: teach disguised -ir first; hypotheses and correct transfer forms gate all three labs.
start('Lab QA');assert.equal(S.phase,'discovery');assert.equal(S.learning.step,0);assert.ok($('console').innerHTML.includes('First: learn the disguise.'));assert.ok(!$('console').innerHTML.includes('vous dites'));
manual();assert.equal(activeReference,null);assert.equal($('manualBtn').disabled,true);
$('beginLab').onclick();advanceLab();assert.equal(S.phase,'discovery');assert.equal(S.learning.index,0);
for(let i=0;i<3;i++){const L=S.learning,lab=BANK.patternLabs[i];assert.equal(L.index,i);L.revealed=true;L.notes[lab.verb]='I notice a pattern in these signals.';L.draft=Object.fromEntries(lab.tasks.map(q=>[q.id,answer(q)]));if(i===0){L.draft[lab.tasks[0].id]='lis';submitPattern();assert.equal(L.passed.length,0);advanceLab();assert.equal(L.index,0);L.draft[lab.tasks[0].id]=answer(lab.tasks[0]);}submitPattern();assert.ok(L.passed.includes(lab.verb));advanceLab();}
assert.equal(S.phase,'investigate');assert.equal(S.learning.passed.length,3);assert.equal(S.score,0);assert.equal(S.log.length,0);assert.equal(S.learning.attempts.length,8);
// Every opening requires its own regular-verb check. Wrong answers keep the table out of the DOM.
manual();assert.equal(activeReference.q.verb,'finir');assert.ok(!$('modalRoot').innerHTML.includes('<table'));submitReference('finons');assert.ok(activeReference);assert.ok(!$('modalRoot').innerHTML.includes('<table'));submitReference('finissons');assert.equal(activeReference,null);assert.ok($('modalRoot').innerHTML.includes('<table'));closeModal();manual();assert.equal(activeReference.q.verb,'parler');assert.ok(!$('modalRoot').innerHTML.includes('<table'));submitReference('parles');closeModal();teacher();assert.ok(!$('modalRoot').innerHTML.includes('Question bank & answer key'));submitReference(activeReference.q.answer);assert.ok($('modalRoot').innerHTML.includes('Question bank & answer key'));assert.equal(S.score,0);
const learningReport=learningReportHTML();assert.ok(learningReport.includes('learner hypotheses'));assert.ok(learningReport.includes('finons'));S.phase='assessment';closeModal();manual();assert.equal(activeReference,null);teacher();assert.equal(activeReference,null);
// Complete the exact game progression using the engine, independently of DOM rendering.
start('Engine QA');S.phase='investigate';
for(const r of BANK.rooms){S.room=r.id;S.active=true;S.index=0;clearTask();for(let i=0;i<6;i++){const q=currentTask();classify(q.given===answer(q));if(!S.solved)submitAnswer(answer(q));assert.equal(S.solved,true);nextQuestion();}}
assert.equal(S.roomDone.length,6);assert.equal(S.score,360);assert.equal(S.log.length,48);
S.unlock=true;S.phase='infiltrate';S.checkpoint=0;S.index=0;S.active=true;
for(let c=0;c<5;c++){const cp=BANK.checkpoints[c];for(let i=0;i<cp.tasks.length;i++){S.active=true;const q=currentTask();if(q.mode==='match'){for(let j=0;j<3;j++){S.selected=j;matchAnswer(j);}}else submitAnswer(answer(q));assert.equal(S.solved,true);nextQuestion();}}
assert.equal(S.phase,'vault');assert.equal(S.inventory.length,5);assert.equal(S.cpDone.length,5);S.deduction=true;
for(let i=0;i<6;i++){submitAnswer(answer(currentTask()));assert.equal(S.solved,true);nextQuestion();}
assert.equal(S.phase,'assessment');assert.equal(S.score,620);assert.equal(S.log.length,76);
S.assessment=Object.fromEntries(BANK.assessment.map(q=>[q.id,answer(q)]));S.assessment.f5='disez';renderAssessment();$('assessmentForm').onsubmit({preventDefault(){}});
assert.equal(S.phase,'results');assert.equal(assessmentRows().filter(x=>x.correct).length,11);assert.equal(S.log.length,88);
assert.equal(metrics('dire','assessment').correct,1);assert.equal(metrics('dire','assessment').total,2);
S.name='<script>alert(1)</script>';const report=reportHTML();assert.ok(report.includes('&lt;script&gt;'));assert.ok(!report.includes('<script>alert(1)</script>'));assert.ok(report.includes('11 / 12'));assert.ok(report.includes('disez'));assert.ok(report.includes('dites'));
// Wrong answers cannot advance or earn points; a repeated selected error becomes a typed restoration.
S=fresh();S.name='Error QA';S.phase='infiltrate';S.checkpoint=2;S.active=true;render();
submitAnswer('disez');assert.equal(S.index,0);assert.equal(S.solved,false);assert.equal(S.score,0);
submitAnswer('disent');assert.equal(S.feedback.action,'Type the model to restore the system →');
submitAnswer('dites');assert.equal(S.solved,false); // Must first read and acknowledge the model.
$('feedbackAction').onclick();assert.equal(S.guided,true);assert.ok($('console').innerHTML.includes('id="answerForm"'));assert.ok(!$('console').innerHTML.includes('data-choice'));
submitAnswer('dites');assert.equal(S.solved,true);assert.equal(S.score,4);assert.equal(S.index,0);nextQuestion();assert.equal(S.index,1);
// Existing saved progress must survive repeated visits to the briefing screen.
S=fresh();S.name='Saved Agent';save();const saved=localStorage.getItem(KEY);S=fresh();render();assert.equal(localStorage.getItem(KEY),saved);render();assert.equal(localStorage.getItem(KEY),saved);
console.log('PASS: 36 forms, 82 unique prompts plus 6 reference checks, full 620-point route, 88 scored stages, 11/12 assessment, safe report escaping, corrective gate, typed choice restoration, persistent resume.');
`,context);
