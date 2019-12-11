const Employee = require('./employee')

class Intern extends Employee {

    constructor(school, id, email, name) {

        super(id, email, name, 'intern');
        this.school = school;
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = 'intern';
    }
}

const intern1 = new Intern("paulrobhendrickson", 873455, 'realemail@email.email', 'internrName');

console.log(intern1);
