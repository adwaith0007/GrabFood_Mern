const couponModel = require("../Models/coupon");

exports.addCoupon = async (req, res) => {
  try {
    const { couponName, description, discount, couponCode, expiryDate } =
      req.body;

    
    if (!couponName || !description || !discount || !couponCode || !expiryDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    
    if (couponName.trim().length < 5) {
      return res.status(400).json({ error: "Coupon name should be at least 5 characters long" });
    }

    
    const existingCoupon = await couponModel.findOne({ couponName });
    if (existingCoupon) {
      return res.status(400).json({ error: "A coupon with the same name already exists" });
    }

    
    const discountValue = parseFloat(discount);
    if (isNaN(discountValue) || discountValue < 0 || discountValue > 80) {
      return res.status(400).json({ error: "Discount must be a number between 0 and 100" });
    }

    
    const expiryDateObj = new Date(expiryDate);
    const currentDate = new Date();
    if (isNaN(expiryDateObj.getTime()) || expiryDateObj <= currentDate) {
      return res.status(400).json({ error: "Expiry date must be a valid future date" });
    }

    const couponDoc = new couponModel({
      couponName,
      description,
      couponCode,
      discount,
      expiryDate: expiryDateObj,
    });
    await couponDoc.save();

    res.status(201).json({ message: "Coupon created successfully" });
  } catch (error) {
    console.error("Error creating coupon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.adminGetCoupons = async (req, res) => {
  try {
    const data = await couponModel.find({});
    return res.json({ success: true, data: data });
  } catch (error) {
    console.log("error while getting coupons: ", error);
    return res.json({ success: false });
  }
};

exports.getCoupons = async (req, res) => {
  try {
    const currentDate = new Date(); 

    
    const data = await couponModel.find({ expiryDate: { $gt: currentDate } });

    return res.json({ success: true, data: data });
  } catch (error) {
    console.log("Error while getting coupons:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// exports.applyCoupon = async (req, res) => {
//   try {
//     const { couponCode } = req.body;

//     const coupon = await couponModel.findOne({ couponCode });

//     if (coupon) {
//       const discount = coupon.discount;

//       res.json({ success: true, discount });
//     } else {
//       res.json({ success: false, message: "Coupon not found" });
//     }
//   } catch (error) {
//     console.error("Error applying coupon:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };



exports.applyCoupon = async (req, res) => {
  try {
    const { couponCode } = req.body;

    const coupon = await couponModel.findOne({ couponCode });

    if (coupon) {
      const currentDate = new Date(); // Get the current date
      const expiryDate = new Date(coupon.expiryDate); // Convert expiryDate to Date object

      if (expiryDate > currentDate) {
        // Coupon is not expired
        const discount = coupon.discount;
        res.json({ success: true, discount });
      } else {
        // Coupon is expired
        res.json({ success: false, message: "Coupon has expired" });
      }
    } else {
      // Coupon not found
      res.json({ success: false, message: "Coupon not found" });
    }
  } catch (error) {
    console.error("Error applying coupon:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteCoupon = async (req, res) => {
  const { couponId } = req.params;
  try {
    await couponModel.deleteOne({ _id: couponId });
    const data = await couponModel.find({});
    return res
      .status(200)
      .json({ success: true, message: "coupon deleted", data });
  } catch (error) {
    console.log("error while deleting coupon", error);
    return res
      .status(500)
      .json({ success: false, message: "Error while deleting coupon" });
  }
};
