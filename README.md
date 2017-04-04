## BusBoss
*Web application providing arrival and departure times for public transit routes in the city of Seattle.*

#### About

BusBoss is a web application that provides arrival and departure times for public transit in Seattle. It is built with React and Express with data from the OneBusAway API. It was built in **two weeks** as a capstone project for the Galvanize Web Development Immersive program in Seattle.

City buses are the primary mode of transportation for many urbanites, but timing one's departure can be difficult. Here in Seattle there is a popular app called OneBusAway that helps by providing arrival and departure estimates for buses, trains, and ferries. OBA is a great app but only on mobile, a robust desktop-friendly web app is missing. BusBoss solves this problem and works seamlessly on both mobile and desktop browsers.

BusBoss was built on the premise that most riders are taking the same one or two buses every day. They need a way to quickly jump to those routes and avoid the firehose of information that most public transit apps provide. Users can favorites both routes and entire stops to quickly access that information, and because favorites are stored on the server they are accessible on all of that user's devices.

#### Features

* Map view showing all stops
* Click on a stop to view arrival and departure times
* Hover over a departure to view just that route on the map
* Click on a departure to view the full route and all of its stops on the map
* Both stops and routes can be favorited for quick access
* Users can search for both routes and locations
* Clean, modern design makes information easily digestible
* Responsive design looks good on both desktop and mobile browsers
* Sign mode removes the header

#### Technologies

* React
* Node
* Express
* Socket.io
* Knex
* PostgreSQL
* Google Maps JavaScript API
* Google places API
