# Circuit timer

Phone timer for the Paisley RFC aerobic circuit class.

Each person opens the page, picks a starting station, and everyone presses Start together on the coach's "go". The phone then shows the station they are on, their level, the countdown and where they go next. It needs no account and no signal once the page has been opened once.

## Files

- `index.html` is the whole app.
- `sw.js` saves the page on each phone so it opens with no signal.

## Changing the session

Open `index.html` and find the block marked `THE SESSION: edit here`. The date, timings, stations and levels are all there. After uploading a new `index.html`, change the version name at the top of `sw.js` so phones pick up the update.

## Group sizes

| People | Stations | Sharing |
|---|---|---|
| 8 or fewer | 8 | One per station |
| 9 | 9, adds sled pull | One per station |
| 10 | 10, adds bodyweight | One per station |
| 11 to 16 | 8 | Up to two per station |
| 17 and 18 | 9 | Up to two per station |
| 19 and 20 | 10 | Up to two per station |
