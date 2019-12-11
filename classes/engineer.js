const Employee = require('./employee')

class Engineer extends Employee {

    constructor(github, id, email, name) {

        super(id, email, name, 'engineer');
        this.github = github;
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = 'engineer';
    }
}

const engineer1 = new Engineer("paulrobhendrickson", 873455, 'realemail@email.email', 'engineerName');

console.log(engineer1);
