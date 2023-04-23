# Time Bandit 
“Stealing” your time back, one command at a time!

TimeBandit is a command-line interface (CLI) tool designed to help you track and manage your time. With TimeBandit, you can easily record the time you spend on different tasks and projects, and generate reports to help you analyze and optimize your time management.

## Installation
To install TimeBandit, you will need to have Node.js installed on your computer. You can then install TimeBandit using npm, by running the following command:

```bash
npm install -g @jorenrothman/timebandit
```

## Usage
To start using TimeBandit, simply open your terminal and type timebandit followed by a command. Here are some of the most common commands you can use:

`timebandit track <project> [description]`

This command starts a new time-tracking session for the specified project. For example, to start tracking time for a project called "Doomsday Device", you would type:

```bash
timebandit track "Doomsday Device"
```

adding a description with the text "Peace of mind" can be done in the following way
```bash
timebandit track "Doomsday Device" "Peace of mind"
```

`timebandit list`

This command will list out all your entries

`timebandit export <path>`

This command will export all your entries as a CSV file to a given path. The filename uses the following format `yyyyMMdd`, to export your entries to the downloads folder, you would type the following:
```bash
timebandit export ~/Downloads
```
or if you want to specify a filename, you would type the following:
```bash
timebandit export ~/Downloads/my-export.csv

