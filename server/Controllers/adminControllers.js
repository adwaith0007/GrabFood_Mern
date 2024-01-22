const adminModel = require("../Models/adminModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* POST: http://localhost:5000/api/admin/register */
exports.adminRegister = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new adminModel({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await newAdmin.save();
    console.log("New user registered:", newAdmin);

    res.json({ message: "Registration successful", user: newAdmin });
  } catch (error) {
    console.error("Error while Registration:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/* POST: http://localhost:5000/api/admin/login */
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log(email);

  try {
    const admin = await adminModel.findOne({ email });

    //check admin
    if (!admin) {
      res.json({ success: false, message: "user not found" });
    }
    if (await bcrypt.compare(password, admin.password)) {
      console.log(admin.name);
      // create jwt token
      const adminToken = jwt.sign(
        {
          adminId: admin._id,
          email: admin.email,
          name: admin.name,
        },
        "secretkey",
        { expiresIn: "24h" }
      );

      return res.status(200).send({
        msg: "Login Successful...!",
        name: admin.name,
        adminToken,
      });
    } else {
      return res.status(400).send({ error: "Password does not Match" });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};
