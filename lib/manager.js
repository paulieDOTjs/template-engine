const Employee = require('./employee')

class Manager extends Employee {

    constructor(id, email, name, officeNumber) {

        super(id, email, name, 'Manager');
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = 'Manager';
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}

const manager1 = new Manager("paulrobhendrickson", 873455, 'realemail@email.email', 'managerName');

module.exports = Manager;