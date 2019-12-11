const Employee = require('./employee')

class Manager extends Employee {

    constructor(officeNumber, id, email, name) {

        super(id, email, name, 'manager');
        this.officeNumber = officeNumber;
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = 'manager';
    }
}

const manager1 = new Manager("paulrobhendrickson", 873455, 'realemail@email.email', 'managerName');

console.log(manager1);
