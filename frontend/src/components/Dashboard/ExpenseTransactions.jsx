import moment from "moment";
import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const ExpenseTransactions = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>

        {transactions.length > 0 && (
          <button className="card-btn" onClick={onSeeMore}>
            See All <LuArrowRight className="text-base" />
          </button>
        )}
      </div>

      <div className="mt-6">
        {transactions.length > 0 ? (
          transactions.slice(0, 4).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={
                expense.date
                  ? moment(expense.date).format("DD MMM YYYY")
                  : "-"
              }
              amount={expense.amount}
              type={expense.type}
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No expenses found.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
