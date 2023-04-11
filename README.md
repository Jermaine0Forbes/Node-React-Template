# Quiz Trak
Express, React, and Typescript template


## Simple Commands
- run webpack : `npm run build`
- run webpack server: `npm run start:dev`
- run jest: `npm run test`
- run jest while watching: `npm run test:watch`

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

