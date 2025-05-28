# nginx-project

In this setup i have configured nginx web server locally on an Ubuntu VM on port 8080. 
The nginx server can handle https request and also can redirect any http request to the https connection. 
The nginx will act as the load balancer with least connection load balancing rule and also as reverse proxy.

# Backend Setup :-

I have created a basic node.js application using express js to serve the application on port 3000. 
The application is deployed across 3 docker containers configured on port 3001,3002 and 3003. 
The request is sent to node.js server using port forwarding done in the container.

How to Run the setup :-

# A) Configuring NGINX web server

1. Make sure you have a Linux VM 
2. On it install nginx [ https://ubuntu.com/tutorials/install-and-configure-nginx#2-installing-nginx ]
    --> the configuration file will be at location /etc/nginx --? nginx.conf ( just edit this with the nginx.conf uploaded in the repository )
3. run the commands to start our nginx web server -->
   a) nginx -t (to validate if our nginx.conf is correct or not )
   b) Make sure the port 8080 is not in use by any other process on your system
   --> to check --> lsof -i :8080 --> if any process is using the port then just kill that process using --> kill <process-id>
   c) Now start the nginx web server by typing nginx
   d) systemctl status nginx --> to see the status of our nginx service

# B) Configuring Docker 

Just see the official docs on how to install docker on ubuntu [ https://docs.docker.com/engine/install/ubuntu/ ]

1. I have written Dockerfile to create the image and docker-compose.yaml to start our 3 containers.
2. On the Vm run : docker compose up --build -d to create containers
3. run docker ps to see the status of our running containers

On the web browser type :
# https://localhost:8080 and yes our web apps pops up !!!

The project is for learning purpose in my Devops Journey. Hope it puts some value in your learning as well.
