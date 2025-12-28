export const sortByDate = (data, order = "asc") => {
  return [...data].sort((a, b) => {
    const [d1, m1, y1] = a.date.split("-");
    const [d2, m2, y2] = b.date.split("-");

    const dateA = new Date(`${y1}-${m1}-${d1}`);
    const dateB = new Date(`${y2}-${m2}-${d2}`);

    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
};
