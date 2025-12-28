const toYYYYMMDD = (dateStr) => {
    // expects DD-MM-YYYY
    const [dd, mm, yyyy] = dateStr.split("-");
    return `${yyyy}-${mm}-${dd}`;
};

module.exports = { toYYYYMMDD };
