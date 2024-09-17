const data = {
  employees: require("../data/employees.json"),
  setEmployees:function(data) {
    this.employees = data;
  }
};

data.employees = require("../data/employees.json");

const getAllEmployees = (req, res) => {
  return res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id:data.employees[data?.employees?.length - 1]?.id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  }

  if( !newEmployee.firstname || !newEmployee.lastname ) {
    return res.status(400).json({'message': "First Name And Last Name Are Requried !"});
  }
  data.employees.push(newEmployee);
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find((emp) => (emp.id == parseInt(req.body.id)));

  if( ! employee ) {
    return res.status(400).json({'message':`Employee Id ${req.body.id} Not Found !`})
  }

  if(req.body.firstname || req.body.lastname) {
    employee.firstname = req.body.firstname;
    employee.lastname = req.body.lastname;
  }

  const filteredArray = data.employees.filter((emp) => ( emp.id != parseInt( req.body.id )));
  const unsortedArray = [...filteredArray, employee];

  data.setEmployees(unsortedArray.sort((a,b) => a?.id > b?.id ? 1 : a.id < b.id ? -1 : 0));

  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find((emp) => (emp.id == parseInt(req.body.id)));

  if( ! employee ) {
    return res.status(400).json({'message':`Employee Id ${req.body.id} Not Found !`})
  }

  const filteredArray = data.employees.filter((emp) => (emp.id != req.body.id));
  data.setEmployees([...filteredArray]);
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find((emp) => (emp.id == parseInt(req.body.id)));
  res.json(employee);
};

module.exports = {
    getAllEmployees,
    createNewEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployee,
    getEmployee
}
