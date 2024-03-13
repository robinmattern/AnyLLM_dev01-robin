#!/bin/bash 

 cd collector;    bash ./run-server.sh &
 cd ../server;    bash ./run-server.sh 4000 &
 cd ../frontend;  bash ./run-server.sh 4001 &
