const express = require("express");
const router = express.Router();
const categoryControllers = require("../Controllers/categoryControllers");

router.post("/add", (req, res) => {
  categoryControllers.addCategory(req, res);
});

router.get("/get", (req, res) => {
  categoryControllers.listCategory(req, res);
});

router.get("/get/admin", (req, res) => {
  categoryControllers.adminListCategory(req, res);
});

router.get("/:categoryId", categoryControllers.getcategoryDetails);

router.put("/update/:categoryId", (req, res) => {
  categoryControllers.updateCategory(req, res);
});

router.delete("/delete/:categoryId", (req, res) => {
  categoryControllers.softDeleteCategory(req, res);
});


module.exports = router;
