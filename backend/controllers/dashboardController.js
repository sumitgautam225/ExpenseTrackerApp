const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose"); // ✅ Import Types

//dashboard data
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    //convert userId to ObjectId
    const userObjected = new Types.ObjectId(String(userId));

    //fetch total income
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjected } },
      { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
    ]);

    //fetch total expense
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjected } },
      { $group: { _id: null, totalExpense: { $sum: "$amount" } } },
    ]);

    //dates for filtering
    const now = Date.now();
    const last30Days = new Date(now - 30 * 24 * 60 * 60 * 1000);
    const last60Days = new Date(now - 60 * 24 * 60 * 60 * 1000);

    //get income transactions in the last 60 days
    const last60DaysIncomeTransaction = await Income.find({
      userId: userObjected,
      $or: [
        { date: { $gte: last60Days } },
        { createdAt: { $gte: last60Days } },
      ],
    }).sort({ date: -1 });

    //get total income for last 60 days
    const incomeLast60Days = last60DaysIncomeTransaction.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    //get expense transactions in the last 30 days
    const last30DaysExpenseTransaction = await Expense.find({
      userId: userObjected,
      $or: [
        { date: { $gte: last30Days } },
        { createdAt: { $gte: last30Days } },
      ],
    }).sort({ date: -1 });

    //get total expense for last 30 days
    const expenseLast30Days = last30DaysExpenseTransaction.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    //fetch last 5 transactions (income + expense)
    const lastTransaction = [
      ...(await Income.find({ userId: userObjected })
        .sort({ date: -1 })
        .limit(5)
        .then((txns) =>
          txns.map((txn) => ({
            ...txn.toObject(),
            type: "income",
          }))
        )),
      ...(await Expense.find({ userId: userObjected })
        .sort({ date: -1 })
        .limit(5)
        .then((txns) =>
          txns.map((txn) => ({
            ...txn.toObject(),
            type: "expense",
          }))
        )),
    ].sort((a, b) => new Date(b.date) - new Date(a.date)); //sort merged list by date

    //final response
    res.json({
      totalBalance:
        (totalIncome[0]?.totalIncome || 0) -
        (totalExpense[0]?.totalExpense || 0),
      totalIncome: totalIncome[0]?.totalIncome || 0,
      totalExpense: totalExpense[0]?.totalExpense || 0,
      last30DaysExpense: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransaction,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransaction,
      },
      lastTransaction,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Internal server error (getDashboardStats) and error is " + error,
    });
  }
};

module.exports = {
  getDashboardStats,
};
