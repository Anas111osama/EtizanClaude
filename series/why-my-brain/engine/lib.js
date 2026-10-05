// مشترك: فتح صفحة المحرك لحلقة واتجاه — EP=ep01 O=h|v
const puppeteer = require('../../../etizan-explainer-video/pipeline/node_modules/puppeteer-core');
const path = require('path');
exports.open = async (ep, o) => {
  const W = o === 'v' ? 1080 : 1920, H = o === 'v' ? 1920 : 1080;
  const b = await puppeteer.launch({ executablePath: process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new',
    args: ['--allow-file-access-from-files', '--disable-gpu-vsync', '--force-color-profile=srgb'] });
  const p = await b.newPage(); await p.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  p.on('pageerror', e => console.log('ERR', e.message)); p.on('console', m => { if (/error|warn/i.test(m.type())) console.log('console:', m.text()); });
  await p.goto('file:///' + path.resolve(__dirname, 'video.html').split(path.sep).join('/') + '?ep=' + ep + '&o=' + o);
  await p.evaluate(() => window.READY);
  return { b, p };
};
