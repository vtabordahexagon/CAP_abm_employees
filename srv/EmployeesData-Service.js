const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
  const { Employees, Phones, Emails } = this.entities;

  // Validación de datos al crear un empleado
  this.before('CREATE', 'Employees', async (req) => {
    const { firstName, lastName, position, dateOfBirth } = req.data;
    if (!firstName || !lastName) {
      req.error(400, 'First Name and Last Name are required fields.');
    }
    if (new Date(dateOfBirth) > new Date()) {
      req.error(400, 'Date of Birth must be a valid date in the past.');
    }
    const existingEmployee = await SELECT.one.from(Employees).where({ firstName, lastName, position });
    if (existingEmployee) {
      req.error(400, 'An employee with the same First Name, Last Name, and Position already exists.');
    }
  });

  // Validación de la fecha de contratación (antes del año 2000 deja de funcionar, TO-DO: FIX)
  this.before('UPDATE', 'Employees', (req) => {
    const { dateOfBirth, hireDate } = req.data;
    if (new Date(hireDate) < new Date(dateOfBirth)) {
      req.error(400, 'Hire Date cannot be earlier than Date of Birth.');
    }
  });

  //CREACION de Telefonos
  this.before('CREATE', 'Phones', async (req) => {
    const { phoneNumber, type } = req.data;
    const validTypes = ['Work', 'Personal'];
    // Validar el tipo de teléfono
    if (!validTypes.includes(type)) {
      req.error(400, `Phone type must be one of the following: ${validTypes.join(', ')}.`);
    }
    // Eliminar caracteres no numéricos excepto el +
    const formattedPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');
    // Validar el formato del número de teléfono
    if (!/^\+\d{10,15}$/.test(formattedPhoneNumber)) {
      req.error(400, 'Phone number must be in international format (e.g., +549999999999).');
    }
    // Verificar duplicados
    const existingPhone = await SELECT.one.from(Phones).where({ phoneNumber: formattedPhoneNumber });
    if (existingPhone) {
      req.error(400, 'This phone number already exists.');
    }
    req.data.phoneNumber = formattedPhoneNumber; // Guardar el número formateado
  });

  //Validacion de ACTUALIZACION de Telefonos
  this.before('UPDATE', 'Phones', async (req) => {
    const { phoneNumber } = req.data;
    // Eliminar caracteres no numéricos excepto el +
    const formattedPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');
    // Validar el formato del número de teléfono
    if (!/^\+\d{10,15}$/.test(formattedPhoneNumber)) {
      req.error(400, 'Phone number must be in international format (e.g., +549999999999).');
    }
    req.data.phoneNumber = formattedPhoneNumber; // Guardar el número formateado
  });

  // Validación de datos al crear un email
  this.before('CREATE', 'Emails', async (req) => {
    const { emailAddress, type } = req.data;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validTypes = ['Work', 'Personal'];
    if (!validTypes.includes(type)) {
      req.error(400, `Email type must be one of the following: ${validTypes.join(', ')}.`);
    }
    if (!emailRegex.test(emailAddress)) {
      req.error(400, 'Invalid email address.');
    }
    const existingEmail = await SELECT.one.from(Emails).where({ emailAddress });
    if (existingEmail) {
      req.error(400, 'This email address already exists.');
    }
  });

  // Registro de cambios en empleados
  this.after('UPDATE', 'Employees', async (data, req) => {
    const { employeeID, firstName, lastName, position } = data;
    console.log(`Employee ${employeeID} updated: ${firstName} ${lastName}, Position: ${position}`);
    // Aquí podrías guardar el registro en una tabla de auditoría
  });
});