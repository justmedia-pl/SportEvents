# Sport Events Subscription Managment
## About
This is simple Events Subscription Management in JAVA application by Spring with basic Spring Security and Hibernate. 
Everything works on REST API interface.
With SportEvent you could create users who are players and organizers.
You can add events from organizers and add subscriptions for the events from players
It's easy to modify and add new features and additional data with DTO architecture for all requests.

## How to use it
Application runs on standard port of your server
So use you valid {url_addres} for http calls for example: http://localhost:8080/
You can run it on several Spring profiles, see application.properties (prod,dev).

see more on wiki page https://github.com/justmedia-pl/SportEvents/wiki

***And if you want IT ON THE DOCKER - take a look on Packages :)***

## Sample requests without authorization
### GET
http://localhost:8080/api/events - returns event list
http://localhost:8080/api/events/{eventId} - returns event details
### POST
http://localhost:8080/api/register/

***Sample post JSON/body***

{
"userPassword":"userPassword",
"userLogin":"testOrganizer",
"userEmail": "organizer{{$randomInt}}@player.com",
"userCity": "City",
"userStreet": "Street",
"userCountry": "Country",
"userZipCode": "00000",
"organizerName":"Organizer Sample"
}

Response after post will be (mail or java console link with registration token to activate account)

### For more samples ###
Check postman collection attached to this project.

## Future
In the next releases there will be some new methods and integrations with google and some payments gateways.
The web interface will be also available (Thymeleaf or React).



