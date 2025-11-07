const Expense = require("../models/Expense");
const xlsx = require("xlsx");

//add expense
const addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const {icon, category, amount, date} = req.body;

        //validation check for missing fields
        if(!icon || !category || !amount || !date){
            return res.status(400).json({message: "All fields are required"});
        }

        const newExpense = new Expense({
            userId,
            icon,   
            category,
            amount,
            date: new Date(date),
        });

        await newExpense.save();
        res.status(201).json({message: "Expense added successfully",
            newExpense
        });
    } catch (error) {
        return res.status(500).json({message: "Internal server error (addExpense) and error is " + error});
    }
}

//get all expense
const getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expense);
    } catch (error) {
        return res.status(500).json({message: "Internal server error (getAllExpense) and error is " + error});
    }
}

const downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({userId}).sort({date: -1});

        //prepare data for excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
        
    } catch (error) {
        return res.status(500).json({message: "Internal server error (downloadExpenseExcel) and error is " + error});
    }
}

const deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "Expense deleted Successfully"})
    } catch (error) {
        return res.status(500).json({message: "Internal server error (deleteExpense) and error is " + error});
    }
}

module.exports = {
    addExpense,
    getAllExpense,
    downloadExpenseExcel,
    deleteExpense
}
