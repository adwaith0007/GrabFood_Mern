const { log } = require("handlebars");
const UserModel = require("../Models/userModels");
const jwt = require("jsonwebtoken");

exports.addMoney = async (req, res) => {
  const { addWallet: amount, userId } = req.body;

  try {
    const currentAmount = await UserModel.find(
      { _id: userId },
      { "wallet.balance": 1, _id: 0 }
    );
    const updatedAmount =
      parseInt(amount) + parseInt(currentAmount[0].wallet.balance);
    await UserModel.updateOne(
      { _id: userId },
      { $set: { "wallet.balance": updatedAmount } }
    );

    return res.json({ success: true, message: `${amount} added to wallet` });
  } catch (error) {
    console.log("error while adding money", error);
    return res.json({ success: false, message: "money not added " });
  }
};

exports.getBalance = async (req, res) => {
    const userId = req.params.userId;
try {
    const currentAmount = await UserModel.find(
      { _id: userId },
      { "walletBalance": 1, _id: 0 }
    );

    return res.json({ success: true, data: currentAmount[0]?.walletBalance });
  } catch (error) {
    console.log("error while getting balance", error);
    return res.json({ success: false, message: "balance not updated" });
  }
};

exports.getDeducted = async (req, res) => {
  const { amount, userId } = req.body;
  try {
    
    const currentAmount = await UserModel.find(
      { _id: userId },
      { "wallet.balance": 1, _id: 0 }
    );
    if (amount > parseInt(currentAmount[0].wallet.balance))
      return res.json({ success: false, message: "Insufficient Balance" });
    const newAmount =
      parseInt(currentAmount[0].wallet.balance) - parseInt(amount);
    await UserModel.updateOne(
      { _id: userId },
      { $set: { "wallet.balance": newAmount } }
    );
    return res.json({ success: true, message: `${amount} deducted` });
  } catch (error) {
    console.log("error while deducting from wallet", error);
    return res.json({ success: false, message: "not deducted" });
  }
};