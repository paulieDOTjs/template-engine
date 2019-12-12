const Employee = require('./employee')

class Intern extends Employee {

    constructor(id, email, name, school) {

        super(id, email, name, 'Intern');
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = 'Intern';
        this.school = school;
    }

    getSchool(){
        return this.school;
    }
}

const intern1 = new Intern("paulrobhendrickson", 873455, 'realemail@email.email', 'internrName');

module.exports = Intern;