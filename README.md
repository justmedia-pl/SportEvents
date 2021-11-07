#Sport Events Subscription Managment
##About
This is simple Events Subscription Management JAVA application with REST API interface.
With SportEvent you could create users who are players and organizers.
You can add events from organizers and add subscriptions for the events from players
It's easy to modify and add new features and additional data with DTO architecture for all requests.

##How to use it
Application runs on standard port of your server
So use you valid {url_addres} for http calls for example: http://localhost:8080/

see more on wiki page https://github.com/justmedia-pl/SportEvents/wiki
###VIEW
####Player
If you want to list all players use
***{url_addres}/players/***

for details of a user with subscriptions
***{url_addres}/players/{userId}***
####Organizer
If you want to list all organizers use
***{url_addres}/organizers/***

for details of a organizer with events
***{url_addres}/organizers/{userId}***

####Event
If you want to list all events use
***{url_addres}/events/***

for details of a event with subscriptions
***{url_addres}/events/{eventId}***

###ADD
For adding/changing user you should send JSON formatted data request with 
POST for input and PUT for change
####Player
Request POST/PUT template for **PLAYER** user
```
{
    "userPassword":"userpassword",
    "userLogin":"user login",
    "userEmail": "use remail",
    "userCity": "user city",
    "userStreet": "player street",
    "userCountry": "player country",
    "userZipCode": "player zipcode",
    "playerFirstName": "player name",
    "playerLastName": "player last name",
    "playerDOB": "player date of birth (YYYY-MM-DD)",
    "playerTeamName": "player team name",
    "playerWeight": "player weight (double)",
    "playerAdditionalInfo": "some addtional info",
    "playerLicence": "licence number",
    "playerPhone": "player phone"
}
```
Request template for **Organizer** user
```
{
    "userPassword":"userpassword",
    "userLogin":"user login",
    "userEmail": "use remail",
    "userCity": "user city",
    "userStreet": "organizer street",
    "userCountry": "organizer country",
    "userZipCode": "organizer zipcode",
    "orgnanizerName": "organizer name",
}
```
####Add subscriptions from player
***{url_addres}/events/{userId}/subscription***

Request POST template for **Add Subscription**
```
{
"eventId":"event ID"
}
```
####Remove subscriptions from player
***{url_addres}/events/{userId}/subscription***

Request DELETE template for **Remove Subscription**
```
{
"eventId":"event ID for subscription"
}
```

####Add events from organizer
***{url_addres}/events/{userId}/event***

Request POST template for **Add Event**
```
{
"eventId":"event ID for subscription"
}
```
####Remove events from organizer
***{url_addres}/events/{userId}/event***

***ALL SUBSCRIPTIONS MUST BE REMOVED BEFORE REMOVE EVENT***

Request DELETE template for **Remove Event**
```
{
"eventId":"event ID"
}
```