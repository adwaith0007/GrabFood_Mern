const adminModel = require("../Models/admin");
const UserModel = require("../Models/userModels");
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
      const token = jwt.sign(
        {
          adminId: admin._id,
          email: admin.email,
          name: admin.name,
          role:"admin",
        },
        "secretkey",
        { expiresIn: "24h" }
      );

      return res.status(200).send({
        msg: "Login Successful...!",
        name: admin.name,
        token,
      });
    } else {
      return res.status(400).send({ error: "Password does not Match" });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};


/* GET: http://localhost:5000/api/admin/customers */
exports.getCustomers = async (req, res) => {
  try {
    const customers = await UserModel.find({});

    if (!customers || customers.length === 0) {
      return res.status(404).send({ error: "No customers found" });
    }

    res.status(200).json({ success: true, data: customers });

    
    // const formattedCustomers = customers.map(customer => {
    //   const { _id, username, email, phone, isBlocked } = customer.toJSON();
    //   return { id: _id, username, email, phone, isBlocked };
    // });

    // return res.status(200).send(formattedCustomers);

    
  } catch (error) {
    console.error("Error fetching customers:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

/* put: http://localhost:5000/api/admin/customers/?id*/
exports.updateUserBlock = async (req, res) => {

  const customerId = req.query.id;
 
  console.log(customerId);
  
  const { isBlocked } = req.body;

  console.log(isBlocked);
  

  try {
    
    const updatedCustomer = await UserModel.findByIdAndUpdate(
      customerId,
      { isBlocked },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).send({ success: false, message: 'Customer not found' });
    }

    return res.status(200).send({ success: true, message: 'Block status updated successfully' });
  } catch (error) {
    console.error('Error updating block status:', error);
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
}
