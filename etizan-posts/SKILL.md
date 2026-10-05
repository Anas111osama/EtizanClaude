---
name: etizan-posts
description: Make Etizan (اتزان) social media post images (Facebook/Instagram, 1080×1350 or 1080×1080) in the Etizan design system — quote posts from the tips series, promo posts for the app, the «دليل اتزان» booklet and the consultant sessions. HTML templates rendered to PNG with Puppeteer; correct Arabic RTL. Use whenever the user asks for Etizan posts, social images, quote cards or promo images.
---

# Etizan posts

First batch: `D:\Anas\Nasieg\ETIZAN\Posts` (Oct 2026, 12 posts: `q1`–`q6` quotes, `p_booklet`, `p_booklet2`, `p_sessions`, `p_sessions2`, `p_app`, `p_adults`). The user approved this style. **The user had the carousels deleted and does not want carousels.**

## Setup
Copy `template/` (next to this file) into `<project>/build/`, add `node_modules` with `puppeteer-core` (copy from `D:\Anas\Nasieg\ETIZAN\Posts\build\node_modules` or `npm i puppeteer-core`). Chrome: `C:/Program Files/Google/Chrome/Application/chrome.exe`.

## Files
- `post.html` — the frame: blue gradient + dotted grid + glows, top bar (badge + white logo pill), bottom bar (handle). Renders the post whose `id` is in the URL (`post.html?id=q1`). CSS building blocks: `.c` (absolute content column, set `top`), `h1`/`h2` (`.y` = sticky yellow), `p.lead`, `.card`, `.sticky`, `.chip` (`white|ink|sticky2|ghost`), `.num`, `.ico`, `.strike` (`.strike.thin` keeps text readable), `.q` (big quote mark), `.phone` (real app screenshot inside a phone frame).
- `posts.js` — the content, one object per post: `{ id, kicker | ep, html }`. Helpers: `close(line1, line2, extra)` for quote posts, `li(icon, text, ok)` checklist rows (true = green check, false = red x), `chip(html, cls, style)`, `I(icon, bg, color)`.
- `shoot.js` — `node shoot.js [ids]` → `../out/<id>.png` at 1080×1350. `sheet.py out.jpg files…` makes a review sheet; always look at it before sending.

## Rules
- Content from the series/app only; no medical claims, no "علاج", no fake reviews/numbers; booklet without price unless the user says otherwise; sessions = «استشارية وتربوية… مش كشف ولا روشتة».
- Real app facts only (check the app code in `D:\Anas\Nasieg\ETIZAN\app\V2.2 - TESTING\www`): kids track has جدول بالصور / تايمر / مكافآت / ألعاب / تمارين تهدئة; adults (10+) has focus sessions, schedule, AI assistant, brain games; booklet sections: فهم العقل، ليه البداية صعبة، حلول من غير أدوية (write «حلول عملية»)، البيت والمدرسة.
- Arabic: keep `«»` away from other punctuation inside chips (bidi breaks); Cairo draws ٠ like a dot and ٦ like 1 → use Western digits on timers/clocks; the middle dot «·» looks like ٠ → use «|».
- Check every post for text wrapping into one-word lines, cards running into the bottom bar, and chips off the edge; fix and reshoot only those ids.
- Deliver the PNGs from `out/` plus one preview sheet (`معاينة.jpg`) via SendUserFile.
