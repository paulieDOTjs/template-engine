const inquirer = require("inquirer");
const fs = require("fs");

const Employee = require("./lib/employee")
const Engineer = require("./lib/engineer")
const Intern = require("./lib/intern")
const Manager = require("./lib/manager")

const teamMembers = [];

let teamName;
let numberOfMembersGiven;

function firstPrompt() {

    inquirer.prompt(
        {
            type: "list",
            message: "Do you want to make a team?",
            choices: ['Oh, fer sure!', 'Eh, nah'],
            name: "desire"
        }
    )

        .then(function (response) {
            if (response.desire === 'Oh, fer sure!') {
                doubleCheck();
            } else {
                sayGoodbye();
            }
        })
}

function doubleCheck() {
    inquirer.prompt(
        {
            type: "list",
            message: "Okay! Great, so I can better assist you, would it be okay if I asked you a few more questions?",
            choices: ["Absolutely!", "No, thanks!"],
            name: "doubleCheck"
        }
    )
        .then(function (response) {
            if (response.doubleCheck === 'Absolutely!') {
                console.log("Okay, great! Thank you!")
                askAboutTeam();
            } else {
                sayGoodbye();
            }
        })
}

function askAboutTeam() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of your team?",
            name: "teamName"
        },
        {
            type: "list",
            message: "How many people are on your team?",
            choices: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            name: "numberOfMembersGiven"
        }
    ])
        .then(function (response) {
            teamName = response.teamName;
            numberOfMembersGiven = response.numberOfMembersGiven;
            askAboutTeamMembers();
        })
}

function askAboutTeamMembers() {
    inquirer.prompt([
        {
            type: "input",
            message: `What is the name of team member ${teamMembers.length + 1}?`,
            name: "employeeName"
        },
        {
            type: "list",
            message: "What is their role?",
            choices: ['Engineer', 'Intern', 'Manager'],
            name: "employeeRole"
        },
        {
            type: "input",
            message: `What is their ID number?`,
            name: "employeeId"
        },
        {
            type: "input",
            message: `What is their email address?`,
            name: "employeeEmail"
        }
    ])
        .then(function (response) {
            switch (response.employeeRole) {
                case 'Engineer':
                    makeEngineer(response)
                    break;
                case 'Intern':
                    makeIntern(response)
                    break;
                case 'Manager':
                    makeManager(response)
                    break;
            }
        })
}

function checkIfDone() {
    if (teamMembers.length < numberOfMembersGiven) {
        askAboutTeamMembers();
    } else {
        writeTopHTML();
    }
}

function makeEngineer(response) {
    let engineer = new Engineer(response.id, response.email, response.name);
    inquirer.prompt(
        {
            type: "input",
            message: "What is their GitHub username?",
            name: "github"
        }
    )
        .then(function (response) {
            engineer.github = response.github
            teamMembers.push(engineer);
            checkIfDone()
        })
}

function makeIntern(response) {
    let intern = new Intern(response.id, response.email, response.name);
    inquirer.prompt(
        {
            type: "input",
            message: "What is the name of their school?",
            name: "school"
        }
    )
        .then(function (response) {
            intern.school = response.school
            teamMembers.push(intern);
            checkIfDone()
        })
}

function makeManager(response) {
    let manager = new Manager(response.id, response.email, response.name);
    inquirer.prompt(
        {
            type: "input",
            message: "What is their office number?",
            name: "officeNumber"
        }
    )
        .then(function (response) {
            manager.officeNumber = response.officeNumber
            teamMembers.push(manager);
            checkIfDone()
        })
}

function writeTopHTML() {
    fs.writeFile(`./html/${teamName}.html`, `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
            <link rel="stylesheet" href="../css/style.css">
            <title>Document</title>
        </head>
        
        <body>
            <header>
                <h1 class='d-flex justify-content-center'>
                    MY TEAM
                </h1>
            </header>
        
            <div class="container">
                <div class="row">
                    `, function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("Success on top part!");
        writeMiddleHTML()
    });
}

writeMiddleHTML(){
    for (let i = 0; teamMembers.length < numberOfMembersGiven) {
        fs.appendFile('message.txt', ` 
        <div class="col-3 card">
        <div class="row">
            <div class="col card-top">
                <h2>
                    ${teamMembers[i].name}
                    </h2>
                <h3>
                ${teamMembers[i].role}
                    </h3>
            </div>
        </div>
        <div class="row">
            <div class="col card-bottom">
                <h4>
                ${teamMembers[i].id}
                    </h4>
                <h4>
                ${teamMembers[i].email} 
                    </h4>
                <h4>
                    Office number: 1
                    </h4>
            </div>
        </div>
    </div>`, (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });

    }
}

function sayGoodbye() {
    console.log('Okay. Goodbye.')
    return;
}

firstPrompt();