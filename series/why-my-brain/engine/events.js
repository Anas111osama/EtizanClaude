// EP=ep01 node events.js → ../<ep>/build/plan.json (المدة، المؤثرات، الفواصل، العوالم) — من النسخة العريضة
const { open } = require('./lib'); const fs = require('fs'); const path = require('path');
const EP = process.env.EP || 'ep01';
(async () => {
  const { b, p } = await open(EP, 'h'); const plan = await p.evaluate(() => window.PLAN);
  fs.writeFileSync(path.join(__dirname, '..', EP, 'build', 'plan.json'), JSON.stringify(plan, null, 1));
  const c = {}; plan.sfx.forEach(e => c[e.name] = (c[e.name] || 0) + 1);
  console.log('duration', plan.duration, 'sfx', plan.sfx.length, JSON.stringify(c), 'cuts', plan.cuts.length); await b.close();
})();
