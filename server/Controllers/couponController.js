const couponModel = require("../Models/coupon");

exports.addCoupon = async (req, res) => {
  try {
   
    const { couponName, description, discount, couponCode , expiryDate } = req.body;

    
    if (!couponName || !description || !discount || !couponCode || !expiryDate) {
        return res.status(400).json({ error: "All fields are required" });
    }

   
    const discountValue = parseFloat(discount);
    if (isNaN(discountValue) || discountValue < 0 || discountValue > 100) {
        return res.status(400).json({ error: "Discount must be a number between 0 and 100" });
    }

    const couponDoc = new couponModel({
      couponName,
      description,
      couponCode,
      discount,
      expiryDate
      
    });
    await couponDoc.save();

    
    res.status(201).json({ message: "Coupon created successfully" });
} catch (error) {
    // Return an error response if something goes wrong
    console.error("Error creating coupon:", error);
    res.status(500).json({ error: "Internal Server Error" });
}
  };


  exports.getCoupons = async (req, res) => {
    try {
      const data = await couponModel.find({});
      return res.json({ success: true, data: data });
    } catch (error) {
      console.log("error while getting coupons: ", error);
      return res.json({ success: false });
    }
  };

  exports.applyCoupon = async (req, res) => {
    try {
        const { couponCode } = req.body;

       
        const coupon = await couponModel.findOne({ couponCode });

        if (coupon) {
            
            const discount = coupon.discount; 

            res.json({ success: true, discount });
        } else {
            res.json({ success: false, message: 'Coupon not found' });
        }
    } catch (error) {
        console.error('Error applying coupon:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
  
  exports.deleteCoupon = async (req, res) => {
    const { couponId } = req.params;
    try {
      await couponModel.deleteOne({ _id: couponId });
      const data = await couponModel.find({});
      return res.status(200).json({ success: true, message: "coupon deleted", data});
    } catch (error) {
      console.log("error while deleting coupon", error);
      return res.status(500).json({ success: false, message: "Error while deleting coupon" });
    }
  };