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
    --> the configuration file will be at location /etc/nginx --> nginx.conf ( just edit this with the nginx.conf uploaded in the repository )
3. run the commands to start our nginx web server -->
   a) nginx -t (to validate if our nginx.conf is correct or not )
   b) Make sure the port 8080 is not in use by any other process on your system
   --> to check --> lsof -i :8080 --> if any process is using the port then just kill that process using --> kill process-id
   
   c) Now start the nginx web server by typing nginx
   d) systemctl status nginx --> to see the status of our nginx service

# B) Configuring Docker 

Just see the official docs on how to install docker on ubuntu [ https://docs.docker.com/engine/install/ubuntu/ ]

1. I have written Dockerfile to create the image and docker-compose.yaml to start our 3 containers.
2. On the Vm run : docker compose up --build -d to create containers
[Make sure you first move the nginx.conf file to /etc/nginx and then dockerize the code ]

3. run docker ps to see the status of our running containers

On the web browser type :
# https://localhost:443 and yes our web apps pops up !!!

The project is for learning purpose in my Devops Journey. Hope it puts some value in your learning as well.

# C) Monitoring and Logging 

We can see the log files under **/var/log/nginx**
There are two log files here : access.log and error.log 

But to be honest, reading the logs from these files are very hectic !!
Solution : we can configure our own custom log logic for nginx.

**Steps** :

1. Create a file under /var/etc/nginx and name it as access_custom.log
2. Make sure the owner of this file is **www-data** user --> this is the system user to handle nginx processes and it improves security to not let the root user handle nginx processes.
3. Now, we have to configure nginx.conf file and include the custom logging directive in http block.

    
   http {
    log_format custom_log 'Time=[$time_local]  Status=$status ClientIp=$remote_addr --> $upstream_addr';
    access_log /var/log/nginx/access_custom.log custom_log;
   }

Hence, now we can see custom logs under : /var/log/nginx/access_custom.log file

