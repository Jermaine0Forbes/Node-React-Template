# Node React Template
Express & React template

- [Current Tasks](cur-tas)
- [Sequelize Commands](seq-cmd)
- [Simple Commands](pkg-cmd)
- [Other Tasks](oth-tas)

[cur-tas]:#current-tasks
[home]:#node-react-template
[pkg-cmd]:#simple-commands
[seq-cmd]:#sequelize-commands
[oth-tas]:#other-tasks

## Current Tasks

- ~~get public api, and have it list out at least 10 items~~
- ~~have a scrolling count down timer, that will redirect to another page when it hits 0~~
- ~~have a scrolling button, that can redirect you before timer runs out~~
- have redirect page to allow items to ordered with [drag and drop feature](https://github.com/atlassian/react-beautiful-dnd)
- create a settings page that can change the amount of items or timer
- save info if you got the answers correct/incorrect
- create a pokemon service file
- migrate functions that should be in a util file
- add stop timer to test page 

[go back home](home)

## Other Tasks
- create apilog function that would have info about url, method, body, etc
- create dashboard for admins that will have settings, traffic, permissions, image gallery, theme colors, events?
- add linter and prettier as commands
- track user information, url, os, mobile, dimension, ip address
- add password confirmation & strength validation in register
- allow visibility of password in register & login
- create script to create a User model and insert sysadmin as first user
- create script to either use mongodb or sequelize as database
- add styling
- create event system
- reset password email
- multi authentication logging
- login limit
- create tests

[go back home](home)

## Simple Commands
- run webpack : `npm run build`
- run webpack server: `npm run start:dev`
- run jest: `npm run test`
- run jest while watching: `npm run test:watch`

[go back home](home)

## Sequelize Commands

### To create a model

find all the different data types [here](https://sequelize.org/docs/v6/moved/data-types/)
`npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`

### To create a migration file
`npx sequelize-cli migration:create --name insert-file-name`

### To migrate files
`npx sequelize-cli db:migrate`

### To create a seed
`npx sequelize-cli seed:generate --name demo-user`

### To run a seed
`npx sequelize-cli db:seed:all`

[go back home](home)