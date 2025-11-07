const Income = require("../models/Income");
const xlsx = require("xlsx");

//add income source
const addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const {icon, source, amount, date} = req.body;

        //validation check for missing fields
        if(!icon || !source || !amount || !date){
            return res.status(400).json({message: "All fields are required"});
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });

        await newIncome.save();
        res.status(201).json({message: "Income added successfully",
            newIncome
        });
    } catch (error) {
        return res.status(500).json({message: "Internal server error (addIncome) and error is " + error});
    }
}

const getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({userId}).sort({date: -1});
        res.json(income);
    } catch (error) {
        return res.status(500).json({message: "Internal server error (getAllIncome) and error is " + error});
    }
}

const downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({userId}).sort({date: -1});

        //prepare data for excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');
        
    } catch (error) {
        return res.status(500).json({message: "Internal server error (downloadIncomeExcel) and error is " + error});
    }
}

const deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({message: "Income deleted Successfully"})
    } catch (error) {
        return res.status(500).json({message: "Internal server error (deleteIncome) and error is " + error});
    }
}

module.exports = {
    addIncome,
    getAllIncome,
    downloadIncomeExcel,
    deleteIncome
}
