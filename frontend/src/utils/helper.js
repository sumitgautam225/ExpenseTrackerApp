import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split("");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addThousandSeparator = (number) => {
  if (number == null || isNaN(number)) return "";

  const [integerPart, fractionalPart] = number.toString().split(".");
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  return fractionalPart
    ? `${formattedIntegerPart}.${fractionalPart}`
    : formattedIntegerPart;
};

export const prepareExpenseBarChartData = (data = []) => {
  if (!data || data.length === 0) return [];

  // Group expenses by month
  const monthlyData = {};

  data.forEach((item) => {
    const date = new Date(item.date || item.createdAt);
    const monthKey = date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthKey,
        amount: 0,
        category: "Expenses", // Generic category for monthly totals
      };
    }

    monthlyData[monthKey].amount += item.amount || 0;
  });

  // Convert to array and sort by date
  const chartData = Object.values(monthlyData).sort((a, b) => {
    return new Date(a.month) - new Date(b.month);
  });

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("MMM YYYY"),
    amount: item.amount,
    category: item.source,
  }));

  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {

  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    category: item?.category,
  }));
  return chartData;
}
