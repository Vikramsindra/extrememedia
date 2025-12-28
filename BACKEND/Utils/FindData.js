//data search function 
const findData = (data, fromDate, toDate) => {
    return data.filter((obj) => {
        const [d, m, y] = obj.date.split("-");
        const objDate = `${y}-${m}-${d}`; // YYYY-MM-DD
        return objDate >= fromDate && objDate <= toDate;
    });
};

module.exports = findData;