#!/bin/bash

git add -A
git commit -m 'New Deployment'
git push
pm2 deploy production
pm2 deploy production exec "pm2 reload all"
