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

    getSpecial(){
        return this.school
    }
}


module.exports = Intern;