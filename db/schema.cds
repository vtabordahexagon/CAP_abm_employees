namespace ABM_Empleados;
using{
    managed
} from '@sap/cds/common';

entity Employees : managed {
    key employeeID      : UUID @title: 'Employee ID';
    firstName           : String(100);
    lastName            : String(100);
    position            : String(100);
    dateOfBirth         : Date;
    hireDate            : Date;
    phones              : Composition of many Phones on phones.employeeID = $self;
    emails              : Composition of many Emails on emails.employeeID = $self;
    
}

entity Phones : managed {
    key phoneID         : UUID @title: 'Phone ID';
    employeeID          : Association to Employees;
    phoneNumber         : String(255);
    type                : String(50);
}

entity Emails : managed {
    key emailID         : UUID @title: 'Email ID';
    employeeID          : Association to Employees;
    emailAddress        : String(255);
    type                : String(50);
}