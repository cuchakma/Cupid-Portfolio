 const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');

router.route('/')
.get(employeesController.getAllEmployees)
.post(employeesController.createNewEmployee)
.put(employeesController.updateEmployee)
.delete(employeesController.deleteEmployee); //method chaining for api

router.route('/:id').get(employeesController.getEmployee);

module.exports = router;