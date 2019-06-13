User auth:
- create users model migration +
- add facebook oauth related env params +
- create facebook test oauth login html page (koa route) for retreiving access token +
- create bookshelf User model
- create graphql login endpoint
- retreive facebook access token, exchange it to the facebook user info
- get user info from db
- create new user if not exists
- update user if exists
- add JWT related env params (credentials like secret etc.)
- generate and return JWT with custom payload (userId, issuedAt, expiresAt)
- create currentUser koa/graphql middleware
- create graphql User/Me endpoint which will return user info by provided JWT token

FACEBOOK:
Поля по умолчанию
Поля по умолчанию — это поднабор компонентов общедоступного профиля пользователя. Им соответствуют следующие свойства в объекте Пользователь:

id
first_name
last_name
middle_name
name
name_format
picture
short_name
В Интернете поля по умолчанию используются с каждым запросом. Заявлять их не обязательно, хотя мы рекомендуем сделать это с помощью public_profile. В iOS и Android вы должны вручную запрашивать эти поля с public_profile в процессе входа.

Поле id— это ID внутри приложения.
