const express = require("express");
const router = express.Router();
const Role = require("../model/Role");

router.get("/list", async (req, res) => {
  try {
    const data = await Role.findAll();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao buscar roles" });
  }
});

module.exports = router;
