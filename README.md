# angular-spotify-api

**How to Run project**

**Requirements**:

Node.js 18+

Angular CLI (run: npm install -g @angular/cli)

MySQL 8+

Git


1. Clone the repository:
2. 
git clone https://github.com/alvarezcolombo95/angular-spotify-api.git

cd angular-spotify-api


**BACKEND**

**2**. Set up the backend:

cd backend

npm install


**3**. Copy the example file:

cp .env.example .env


**4**. Fill it with your MySQL credentials:

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=YOUR_MYSQL_PASSWORD

DB_NAME=spotifyapp

PORT=3000



**5**.Start the backend

npm start



**FRONTEND**

**6**. Set up the frontend:

cd ../angular-app 

npm install



**7**. Start the frontend:
ng serve --host 127.0.0.1 --port 4200
