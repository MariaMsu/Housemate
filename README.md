# Housemate

Housemate is a centralized platform de

signed to help people engaged in communal
living resolve the mess with their household chores and expenses with easy-to-use
scheduling and messaging system.

## Launch the application

Our application uses docker. In order to launch the app you need to run docker-compose:

```bash
# if you have changed some DB settings and want to remove all the saved data,
# run the following commands
# docker-compose down && docker-compose rm
# docker volume rm -f housemate_mongodbdata

docker compose build
docker compose up
```

## Screenshots

![Landing_page.png](screenshots%2FLanding_page%0A.png)  
![Login_Sign-up.png](screenshots%2FLogin_Sign-up%0A.png)  
![Member_list.png](screenshots%2FMember_list%0A.png)  
![Messaging_system.png](screenshots%2FMessaging_system.png)  
![Task_system.png](screenshots%2FTask_system%0A.png)  
![Bill_Tracker.png](screenshots%2FBill_Tracker.png)  
![bill.png](screenshots%2Fbill.png)  

### Debug

You can connect to each of these containers by running

```bash
docker exec -it <containerID> bash
```

To connect to mongodb database console you should connect to the database container and run
```bash
mongosh "mongodb://houseApp:housePass@localhost:27017/houseDB"
```

Backend is managed by docker, but you can also run it outside the container. 
To do that set environment variables like it is done in the [docker compose file](docker-compose.yml) and run the backend

```bash
cd backend
source env.sh
npm i  # initialize js packages
npm start  # run the project
```

For the backend endpoints, we have tests that could be launched with following command.
Run it with launched backend only, from the `backend` directory. 
The environment variable `VERTICAL` should be set to `"test"`
```bash
export VERTICAL="test"
mocha backend-tests
```
