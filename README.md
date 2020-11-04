# Fuerza Teste

## API

* post => '/auth/login', user.login'
*  post => '/auth/signup', user.signup'

*  get => '/journal/entries/:id', journal.getEntries'
*  get => '/journal/:id', journal.getJournal'

*  post => '/journal/', journal.create' _title : String_
*  post => '/journal/entry/:id', journal.addEntry' _{content,title} : Object_

*  put => '/journal/entry/:id', journal.updateEntry' _{content,title} : Object_
*  put => '/journal/:id', journal.updateJournal' _title : String_