# Week 7: JavaScript Best Practices

## Author
- **Name:** Claire Gakuru
- **GitHub:** [@gakuruclaire39-cmd](https://github.com/gakuruclaire39-cmd)
- **Date:** November 16, 2026

## Project Description
For this week I took my Week 5 to-do app and rebuilt it using better practices. Now it keeps data after refresh using localStorage, the code is broken into small ES modules, it has no lint errors, and all tests pass with `npm test`. I also added the cart project inside `cart/` folder as practice for state handling.

## Technologies Used
- HTML5, CSS3, JavaScript ES Modules
- Browser Storage (localStorage, sessionStorage)
- ESLint 9 + Prettier
- Vitest for testing
- Node 22
- Git / GitHub PR workflow

## Features
**Main To-Do App:**
- Saves todos and keeps them after reload
- Saves completed status and filter choice
- Handles empty storage and broken JSON safely
- Logic split: `todo-logic.js` only does pure array work, no DOM or storage
- `storage.js` handles all localStorage read/write
- Lint passes, code formatted

**Cart Project (cart/):**
- Product list, add to cart, change quantity, remove
- Total price and item count calculated, not stored
- Cart saved in localStorage, survives refresh
- Single state object with clear update functions

## How to Run
1. `git clone` this repo
2. `npm install` - installs deps from package-lock.json (node_modules is ignored)
3. `npm test` - runs the pure function tests
4. `npm run lint` - checks code quality
5. Open with Live Server - must run on a server because modules fail on file://


## Lessons Learned
I learned why keeping the array as source of truth matters and why we save right after changing it instead of reading storage everywhere. Making logic pure made testing easy because it runs without a browser. I also learned how ESLint 9 config is different and why formatting before a PR is important so reviewers see real changes.

## Challenges Faced
My Codespaces were full so I finished the merge on GitHub web. I also struggled to find Approve - it is hidden inside the Submit review button. I fixed `dataset.id` being a string by converting to Number before compare, and added try/catch around JSON.parse so bad data does not crash.

## Collaboration
- **Team / partner:** [@gracewambui0432](https://github.com/gracewambui0432)
- **Shared repo:** https://github.com/gakuruclaire39-cmd/iyf-s12-week-07-gakuruclaire39-cmd
- **PR I opened:** https://github.com/gakuruclaire39-cmd/iyf-s12-week-07-gakuruclaire39-cmd/pull/1
- **PR I reviewed:** https://github.com/gracewambui0432/iyf-s12-week-07-gracewambui0432/pull/1
- **Review I wrote:** https://github.com/gakuruclaire39-cmd/iyf-s12-week-07-gakuruclaire39-cmd/pull/1changes#r4589991717
- **Merge conflict resolved:** Not needed in Week 7

## Live Demo
[Live Link](https://gakuruclaire39-cmd.github.io/iyf-s12-week-07-gakuruclaire39-cmd/)
