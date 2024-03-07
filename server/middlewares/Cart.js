exports.validateQuantity = (req, res, next) => {
    const maxQuantity = 5;
    const {
        product: {
          productId,
          productName,
          productImage,
          price,
          Description,
          category,
        },
        quantity,
      } = req.body;
  
    // Check if the quantity exceeds the maximum allowed
    if (quantity > maxQuantity) {
      return res.status(400).json({
        error: `Cannot add more than ${maxQuantity} items to the cart.`,
      });
    }
  
    // Continue with the next middleware or route handler if validation passes
    next();
  };