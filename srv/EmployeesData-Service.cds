using ABM_Empleados from '../db/schema';

@path:'servicedb/EmployeesData'
service CatalogService {
  entity Employees as projection on ABM_Empleados.Employees;
  entity Phones as projection on ABM_Empleados.Phones;
  entity Emails as projection on ABM_Empleados.Emails;
}
