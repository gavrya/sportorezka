TODO:
- passport auth? 
- auth, save currentUser to context in graphql context.
- add mocha, chai, istanbul
- run tests on prepush, husky

// use middleware only with given path
// this will add currentUser obj to the ctx
router.use('/users', userAuth());

Фичи:
Возможность создать событие без локейшена.
Предложить возможность проголосовать за один из нескольких на выбор.

Requirements:
- nodejs LTS
- yarn (npm globally installed)
- knex (npm globally installed)
- docker
- mysql workbench
