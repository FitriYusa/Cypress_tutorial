//Define a Developer constructor function that takes a 'name' parameter
function Developer(name) {
    this.name = name;
    this.type = "Developer";
}

//Define a tester constuctor function that takes a 'name' parameter
function Tester(name) {
    this.name = name;
    this.type = "Tester";
}

//define an EmployeeFactory constructor function
function EmployeeFactory() {
    //create a 'create' method within the factory 
    this.create = (name, type) => {
        switch(type){
            case 1: 
                //return a new Developer instance with the given name
                return new Developer (name);
            case 2:
                //return a new Tester instance with the given name
                return new Tester(name);
        }
    };
}

//Define a 'say' function to print employee information
function say() {
    console.log("Hi, I am" + this.name + " and I am a " + this.type);
}

//Create an instance of EmployeeFactory
const employeeFactory = new EmployeeFactory();

//Create an empty array to store employees
const employees = [];

//Use the factory to create and store employee instances
employees.push(employeeFactory.create("Ali", 1));
employees.push(employeeFactory.create("Abu", 2));
employees.push(employeeFactory.create("Aminah", 1));
employees.push(employeeFactory.create("Atou", 2));
employees.push(employeeFactory.create("Akoi", 2));

//loop through the employees and call the 'say' function for each
employees.forEach(emp => {
    say.call(emp);
})
