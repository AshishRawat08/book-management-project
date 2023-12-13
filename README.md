# book-management-project

Server >> Storing certain book data >> User Register >> Subscriber

This is a book record managemnt API Server/ Backend for the library system or managemnet of records or manuals or books

Fine System: User: 06/03/2023 - 06/06/2023 09/06/2023 => 50\*3=150/-

# Subscription Types

3 months (Basic) 6 months (Standard) 12 months (Premium)

If the subscription type is standard && if the subscription date is 06/03/2023 => then subscription valid till 06/09/2023

within subscription date >> if we miss the renewal >>50/- day subscription date is also been missded >> and also missed the renewal >> 100 + 50/- day

book1 basic 06/03/2023 -> subscription date 07/03/2023 => borrowed a book from library book1 renewal date is on 21/03/2023 23/03/2023 => we need to pay a fine of 50

book2 basic 06/03/2023 -> subscription date 07/03/2023 => borrowed a book from library book2 renewal date is on 21/03/2023 23/06/2023 => we need to pay a fine of 100+50

missed by renewal date >> 50/- missed by subscription date >> 100/- missed by renewal && subscription date >> 150/-

# Routes and Endpoints

/users
POST: Creating a new user
GET: Getting all users

## /users/{id}

GET: Get user by id
PUT: Updating a user by their ID
DELETE: Delete a user by id (chk if he/she still have an issued book) && (is there any fine to paid)

## /users/subscription-details/{id}

GET: Get user subscription details >> Date of Subscription >> Valid till >> Is there any fine

# books

GET: Get all the books
POST: Create/Add a new book

## /books/{id}

GET: Get a dingle book by id
PUT: Update a book by id

## /books/issued

GET: Get all issued books

## /books/issued/withFine

GET: Get all issued books with their fine

npm init
npm i nodemon --save-dev
npm run dev

...each
"name": "Jane",
"surname": "Doe",
"email": "user@email.com",
"subscriptionType": "Premium",
"subscriptionDate": "01/01/2022"

...data
"data":{
"name" : "rahul",
"surname" : "negi"

    }

    days count from 1-jan-1970
    new Date()

Tue Dec 12 2023 10:23:36 GMT+0530 (India Standard Time)
new Date("02/01/2012")
Wed Feb 01 2012 00:00:00 GMT+0530 (India Standard Time)
const date = new Date("02/01/2012;");
undefined
date;
Wed Feb 01 2012 00:00:00 GMT+0530 (India Standard Time)
Math.floor(date/(1000*60*60\*24));
15370
let date = new Date();
VM408:1 Uncaught SyntaxError: Identifier 'date' has already been declared

VM408:1 Uncaught SyntaxError: Identifier 'date' has already been declared
VM415:2 Uncaught SyntaxError: Unexpected identifier 'Uncaught'
let dateNew = new Date();
undefined
Math.floor(dateNew/(1000*60*60\*24));
19703
