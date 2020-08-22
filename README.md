# [Picross-R](https://picross-r.com)

A react port of my first web project Picross ! 
[Picross or Nonograms or Griddlers](https://en.wikipedia.org/wiki/Nonogram) are picture logic puzzles in which cells in a grid must be colored or left blank according to numbers at the side of the grid to reveal a hidden picture. In this puzzle type, the numbers are a form of discrete tomography that measures how many unbroken lines of filled-in squares there are in any given row or column.

### Frontend :
made using [React](https://fr.reactjs.org/), [redux](https://github.com/reduxjs/redux), and [sass](https://sass-lang.com/).

### Backend :
made using [express](https://github.com/expressjs/express), [passport](https://github.com/jaredhanson/passport) with the [local](https://github.com/jaredhanson/passport-local) and [jwt](https://github.com/mikenicholson/passport-jwt) strategies for authentification, [bcrypt](https://www.npmjs.com/package/bcrypt) for password encryption
and [mysql](https://www.npmjs.com/package/mysql) for database comunication.

### Database :
mysql using [dokku-mysql](https://github.com/dokku/dokku-mysql)

### Prodution :
Everything was put into production using [dokku](https://github.com/dokku/dokku) on an OVH VPS.

### Features :
Current website features: 
* Complete puzzles and save your progression via creating an account and retrieve it upon logging in.
* Stay connected upon closing and reopening the browser.
* Create and make avalaible for everyone your own puzzles if you possess the creator status! 
* Automaticaly merge your progression if you completed puzzles without beeing logged or having an account by logging in or creating an account afterwards, even if you already had a progression on your account. 

##  [Link : https://picross-r.com](https://picross-r.com)
