# Installation

* Clone the repository `git clone https://github.com/realdeepnandi/board-infinity-task.git`
* Change the directory `cd board-infinity-task`
* Run the server `npm start`
* The server is running at [localhost:3000](http://localhost:3000)

# Components of the code

<img src="https://cdn.discordapp.com/attachments/797498334133616701/827091018137731072/carbon_12.png" width="540px">

* The form through which we will add the tasks

<img src="https://cdn.discordapp.com/attachments/797498334133616701/827088110776746024/carbon_9.png" width="540px">

* This is the `/list (GET)` endpoint through which all the data is listed in a tabular structure

<img src="https://cdn.discordapp.com/attachments/797498334133616701/827088852602454016/carbon_10.png" width="540px">

* This is the `/add (POST)` endpoint through which we will add tasks into the database and the task is deleted after some minutes (as provided in duration)

<img src="https://cdn.discordapp.com/attachments/797498334133616701/827089382397575188/carbon_11.png" width="540px">

* Through this we will render the data in the database in a table.

# How to add a task

## Method 1 (Through Form)

<img src="https://cdn.discordapp.com/attachments/797498334133616701/827091596368674836/unknown.png" width="540px">

* Data is entered through form
  * Duration is of type `Integer`
  * Task Name, Description and Creator are of type `String`
  * The value of createdAt is set automatically (current time) and the type is `Date`

<img src="https://cdn.discordapp.com/attachments/797498334133616701/827096346456096798/unknown.png" width="540px">

* After form submission this page is displayed with a message "Task added successfully" and a link to the `/list` endpoint.

<img src="https://cdn.discordapp.com/attachments/797498334133616701/827096775584251924/unknown.png" width="540px">

* The tabular structure is visible with respective fields and values
* This data is automatically deleted (as per the example, in 5 minutes) as per the data provided in duration (minutes)

## Method 2 (Through Postman/Curl or other similar services)

<img src="https://cdn.discordapp.com/attachments/797498334133616701/827098164858454056/unknown.png" width="540px">

* With the help of Postman we are making a post request to `localhost:3000/add` with JSON body containing `task_name`, `description`, `creator` and `duration`.

<img src="https://cdn.discordapp.com/attachments/797498334133616701/827098975634194442/unknown.png" width="540px">

* We get the body of the response in HTML with message "Task added successfully" and HTTP status 200.
* We could've returned the response in JSON or plain text as well. However, we've added the link to the `/list` endpoint so we've used HTML.

# Verifying the data in Database

<img src="https://cdn.discordapp.com/attachments/797498334133616701/827099847134806016/unknown.png" width="540px">

* We can see the data being stored in the database which will be deleted soon.

# Requirements (Libraries, Plugins and Applications)

* Node.js
* ExpressJS
* body-parser
* uniqid
* pug
* CRON
* MongoDB (Used MongoDB Atlas for the hosted website)

# Website
(https://boardinfinity-task.herokuapp.com/)[https://boardinfinity-task.herokuapp.com/]


