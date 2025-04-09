## 4-8-25

- [classnames package](https://github.com/JedWatson/classnames)

I don't want to get rid of the example entry data that I needed to test to create and update entries while also 
removing/adding/creating tags that are associated with those entries. So I will just add them in here

```js

  const data =[
    {
      "title":"t1",
      "entry":"t1",
      "tags":[
          {
            name: 't1',
            userId: 3,
            id: 3,
          },
          {
            name: 't2',
            userId: 3,
            id: 4,
          },
          {
            name: 'w7',
            userId: 3,
            id: 19,
          },
          {
            name: 'q6',
            userId: 3,
            id: 14,
          },
          {
            name: 't5',
            userId: 3,
            id: 10,
          },

        ],
      "topicId":"3",
      "id":25
    },
    {
      "title":"t2",
      "entry":"t2",
      "tags":[
          // {
          // name: 't3',
          // userId: 3,
          // id: 5,
          // },
          // {
          //   name: 't4',
          //   userId: 3,
          //   id: 6,
          // },
          {
            name: 't2',
            userId: 3,
            id: 4,
          },
          // {
          //   name: 't1',
          //   userId: 3,
          //   id: 3,
          // },
          // {
          //   name: 't5',
          //   userId: 3,
          // },
          // {
          //   name: 't6',
          //   userId: 3,
          // },
          // {
          //   name: 'w7',
          //   userId: 3,
          // },
          // {
          //   name: 'q6',
          //   userId: 3, 
          // },


      ],
      "topicId":"3",
      "id":26
    }
  ];

  // const data =[
  //   {
  //     "title":"t5",
  //     "entry":"t5",
  //     "tags":[
  //         {
  //           name: 't1',
  //           userId: 3,
  //           id: 3,
  //           tte : {
  //             userId: 3,
  //             tagId:3,
  //           },
  //         },
  //         {
  //           name: 't2',
  //           userId: 3,
  //           id: 4,
  //           tte : {
  //             userId: 3,
  //             tagId:3,
  //           },
  //         },
  //       ],
  //     "topicId":"4",
  //   },
  // ];

```


## 1-11-25

Need to create a simple app that will allow me to create categories which which will have topics and even subtopics. Within the topcis or subtopics
there will be a question with an answer that is hidden. The user will have to write down what the answer is, then look at the answer and 
verify if the answer he wrote matches up to the predefined answer. He may choose the option right, wrong, mostly right, mostly wrong. These topics 
of questions will be generated in a quiz and after the quiz, the results will be counted.

Tables I need

Topics
- id
- subtopic
- parent topic id
- user id
- title

Questions
- id
- topic id
- quiz id
- entry id
- answer

Quiz
- id
- user id
- result

Entries 
- id
- title
- entry
- topic id






## 10/16/24
Need to remind myself that when you add a column to an existing table, you need to update the model so that the column can be 
modified when doing CRUD actions

## 5/21/23
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [library to validate input values](https://github.com/validatorjs/validator.js)
- [400 error codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400)
- [Password hashing in Node.js with bcrypt](https://blog.logrocket.com/password-hashing-node-js-bcrypt/)

## 5/14/23

-[Cannot update a component while rendering a different component warning](https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning)


## 5/9/23
Some links to tutorials that have helped me in just doing simple things like posting data and setting up environment variables. But at the current moment, I need to save the information from the form, create a loading icon while waiting for the post to finish, and then redirect the page to home page or something like that
- [Using environment variables in React](https://trekinbami.medium.com/using-environment-variables-in-react-6b0a99d83cf5)
- [TypeScript empty object for a typed variable](https://stackoverflow.com/questions/45339065/typescript-empty-object-for-a-typed-variable)
- [Element implicitly has an 'any' type because expression of type 'string' can't be used to index](https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b)
- [Error TS2339: Property 'entries' does not exist on type 'FormData'](https://stackoverflow.com/questions/50677868/error-ts2339-property-entries-does-not-exist-on-type-formdata)


## 4/30/23
- It seems like the only way to make the hot module reload with webpack is to have the html and the app.js be in the same directory. There might be another way to do it, but I have been trying for hours and I couldn't find it.

## 4/13/23
- [How to handle React Router with Node Express routing](https://stackoverflow.com/questions/52334591/how-to-handle-react-router-with-node-express-routing)
- [Writing Migrations with Foreign Keys Using SequelizeJS](https://stackoverflow.com/questions/29904939/writing-migrations-with-foreign-keys-using-sequelizejs/47428160#47428160)
- [Sequelize fields must be specified through options.field error](https://stackoverflow.com/questions/71052181/sequelize-fields-must-be-specified-through-options-field-error)
- [QueryInterface](https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface#instance-method-addConstraint)
- [express.static(root, [options])](https://expressjs.com/en/4x/api.html#express.static)