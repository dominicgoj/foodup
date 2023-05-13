#!/bin/bash

# Define the log file path
LOG_FILE="/home/ec2-user/foodup/shells/logs/averagerating.log"

# Get the current date and time
CURRENT_DATE=$(date +"%Y-%m-%d")
CURRENT_TIME=$(date +"%H:%M:%S")

# Activate the virtual environment
source /home/ec2-user/virtualenv/bin/activate

# Change directory to the Django project
cd /home/ec2-user/test/foodup/foodupdjango

# Execute the Django management command and redirect the output to the log file
python manage.py averagerating >> "$LOG_FILE" 2>&1

# Check the exit status of the previous command
if [ $? -eq 0 ]; then
  # If the exit status is 0, the script executed successfully
  echo "[$CURRENT_DATE $CURRENT_TIME] Script executed successfully" >> "$LOG_FILE"
else
  # If the exit status is non-zero, the script encountered an error
  echo "[$CURRENT_DATE $CURRENT_TIME] Script encountered an error" >> "$LOG_FILE"
fi
