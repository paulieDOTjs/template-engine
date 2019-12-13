const inquirer = require("inquirer");
const fs = require("fs");

const Employee = require("./lib/employee")
const Engineer = require("./lib/engineer")
const Intern = require("./lib/intern")
const Manager = require("./lib/manager")
const layout = require("./layout")

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
            choices: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
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
    const employee = {};
    inquirer.prompt([
        {
            type: "input",
            message: `What is the name of team member ${teamMembers.length + 1}?`,
            name: "name"
        },
        {
            type: "list",
            message: "What is their role?",
            choices: ['Engineer', 'Intern', 'Manager'],
            name: "role"
        },
        {
            type: "input",
            message: `What is their ID number?`,
            name: "id"
        },
        {
            type: "input",
            message: `What is their email address?`,
            name: "email"
        }
    ])


        .then(function (response) {
            employee.name = response.name;
            employee.id = response.id;
            employee.email = response.email;

            switch (response.role) {
                case 'Engineer':
                    makeEngineer(employee)
                    break;
                case 'Intern':
                    makeIntern(employee)
                    break;
                case 'Manager':
                    makeManager(employee)
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

function makeEngineer(employee) {
    employee.role = 'Engineer'
    inquirer.prompt(
        {
            type: "input",
            message: "What is their GitHub username?",
            name: "github"
        }
    )
        .then(function (response) {
            employee.special = `GitHub: ${response.github}`;
            teamMembers.push(employee);
            checkIfDone()
        })
}

function makeIntern(employee) {
    employee.role = 'Intern'
    inquirer.prompt(
        {
            type: "input",
            message: "What is the name of their school?",
            name: "school"
        }
    )
        .then(function (response) {
            employee.special = `School: ${response.school}`
            teamMembers.push(employee);
            checkIfDone()
        })
}

function makeManager(employee) {
    employee.role = 'Manager'
    inquirer.prompt(
        {
            type: "input",
            message: "What is their office number?",
            name: "officeNumber"
        }
    )
        .then(function (response) {
            employee.special = `Office #: ${response.officeNumber}`
            teamMembers.push(employee);
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
        writeMiddleHTML()
    });
}

function writeMiddleHTML() {
    let i = 0;
    let numberOfRows = layout.getNumberofRows(numberOfMembersGiven);
    let rowsMade = 0
    let numberOfCards = layout.getRowOne(numberOfMembersGiven);
    let cardsMade = 0;

    function checkForCards() {
        if (cardsMade < numberOfCards) {
            makeCard()
        } else {
            checkForRows()
        }
    }
    function checkForRows() {
        if (rowsMade < numberOfRows) {
            makeExtraRow()
        } else {
            writeEndHTML()
        }
    }

    function makeExtraRow() {
        rowsMade += 1;
        cardsMade = 0;
        switch (rowsMade) {
            case 1:
                numberOfCards = layout.getRowTwo(numberOfMembersGiven);
                break;
            case 2:
                numberOfCards = layout.getRowThree(numberOfMembersGiven);
                break;
            case 3:
                numberOfCards = layout.getRowFour(numberOfMembersGiven);
                break;
        }
        fs.appendFile(`./html/${teamName}.html`, ` 
        </div><div class="row">
        `
            , (err) => {
                if (err) throw err;
                checkForCards();
            });
    }

    function makeCard() {
        cardsMade += 1;
        fs.appendFile(`./html/${teamName}.html`, `
         <div class="col card">
        <div class="row">
            <div class="col card-top">
                <h2>
                    Name: ${teamMembers[i].name}
                </h2>
                <h3>
                    Role: ${teamMembers[i].role}
                </h3>
            </div>
        </div>
        <div class="row">
            <div class="col card-bottom">
                <h4>
                ID: ${teamMembers[i].id}
                </h4>
                <h4>
                Email: ${teamMembers[i].email}           
                 </h4>
                <h4>
                ${teamMembers[i].special}
                </h4>
            </div>
        </div>
    </div>
        `, (err) => {
            if (err) throw err;
            i += 1;
            checkForCards();
        });
    }

    checkForCards()
}


function writeEndHTML() {
    fs.appendFile(`./html/${teamName}.html`, ` 
    </div>
    </div>
</body>
`, (err) => {
        if (err) throw err;
    });
    sayGoodbye();
}

function sayGoodbye() {
    console.log('Okay. My work here is done! Goodbye.')
    return;
}

firstPrompt();