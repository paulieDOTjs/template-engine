const inquirer = require("inquirer");

let teamName;
let numberOfMembers;

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
            name: "numberOfMembers"
        }
    ])
        .then(function (response) {
            teamName = response.teamName;
            numberOfMembers = response.numberOfMembers;
        })
}

function sayGoodbye() {
    console.log('Okay. Goodbye.')
    return;
}

firstPrompt();