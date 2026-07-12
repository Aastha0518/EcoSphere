const Department = require("../models/Department");

const normalizeDepartment = (department) => ({
  id: department._id,
  name: department.name,
  parent: department.parent || "",
  employees: department.employees,
  createdAt: department.createdAt,
  updatedAt: department.updatedAt,
});

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      data: departments.map(normalizeDepartment),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const { name, parent = "", employees } = req.body;

    if (!name || employees === undefined || employees === null) {
      return res.status(400).json({
        success: false,
        message: "Department name and employee count are required",
      });
    }

    if (Number(employees) < 0) {
      return res.status(400).json({
        success: false,
        message: "Employee count cannot be negative",
      });
    }

    const exists = await Department.findOne({ name: name.trim() });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Department already exists",
      });
    }

    const department = await Department.create({
      name: name.trim(),
      parent: parent.trim(),
      employees: Number(employees),
    });

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: normalizeDepartment(department),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const { name, parent = "", employees } = req.body;

    if (!name || employees === undefined || employees === null) {
      return res.status(400).json({
        success: false,
        message: "Department name and employee count are required",
      });
    }

    if (Number(employees) < 0) {
      return res.status(400).json({
        success: false,
        message: "Employee count cannot be negative",
      });
    }

    const duplicate = await Department.findOne({
      _id: { $ne: req.params.id },
      name: name.trim(),
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Department already exists",
      });
    }

    const department = await Department.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        parent: parent.trim(),
        employees: Number(employees),
      },
      { new: true, runValidators: true }
    );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department updated successfully",
      data: normalizeDepartment(department),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    await Department.updateMany(
      { parent: department.name },
      { $set: { parent: "" } }
    );

    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
