#!/bin/bash

B='\033[0;34m'
N='\033[0m'

echo -e "${B}Creating commit.${N}"

git add .

if [[ $* == *-m* ]];
then
	git commit -m $2
else
	git commit -m "Sync to server"
fi;

echo -e "${B}Pushing to github.${N}"

git push



echo -e "${B}Starting build on remote server.${N}"

ssh Server "cd production-apps/IntrShop-backend; screen -S build_intrshop_be -d -m ./build.sh"