const express = require("express");
const router = express.Router();

//importer os controladores [2]
const employeeController = require("../controllers/employeeController")

//router.get('/testdata',employeeController.testdata);
router.get('/list',employeeController.list);
router.post('/create', employeeController.create);
router.get('/get/:id', employeeController.get);
router.post('/update/:id', employeeController.update);
router.post('/delete', employeeController.delete);
//router.get("/test", employeeController.test);
router.get("/save", (req, res) => {
  res.json({ status: "Employeed Saved" });
});
module.exports = router;
