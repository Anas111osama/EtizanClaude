// EP=ep01 O=h node frames.js 3.5 10 22 … → ../<ep>/build/tmp/<o>_<t>.jpg
const { open } = require('./lib'); const fs = require('fs'); const path = require('path');
const EP = process.env.EP || 'ep01', O = process.env.O || 'h', ts = process.argv.slice(2).map(Number);
(async () => {
  const { b, p } = await open(EP, O); const dir = path.join(__dirname, '..', EP, 'build', 'tmp'); fs.mkdirSync(dir, { recursive: true });
  for (const t of ts) { await p.evaluate(t => window.seek(t), t); await p.screenshot({ path: path.join(dir, O + '_' + t + '.jpg'), type: 'jpeg', quality: 82 }); }
  await b.close();
})();
