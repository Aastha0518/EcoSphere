const express = require("express");

const router = express.Router();
const department = require("../controllers/departmentController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, department.getDepartments);
router.post("/", authMiddleware, department.createDepartment);
router.put("/:id", authMiddleware, department.updateDepartment);
router.delete("/:id", authMiddleware, department.deleteDepartment);

module.exports = router;
