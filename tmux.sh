#!/bin/bash

# Configurable variables
SESSION_NAME="todo list app"
VIM_COMMAND='LoadSession'  # Replace this with your desired Vim command
NPM_COMMAND="npm run dev"             # Replace with your desired npm command

# Start a new tmux session in the background
tmux new-session -d -s "$SESSION_NAME"

# Run Vim with the command in the first window
tmux send-keys -t "$SESSION_NAME:1" "vim +'$VIM_COMMAND'" C-m

# Create a new tmux window and run the npm command
tmux new-window -t "$SESSION_NAME" -n npm
tmux send-keys -t "$SESSION_NAME:2" "$NPM_COMMAND" C-m

# Attach to the tmux session
tmux attach-session -t "$SESSION_NAME"
