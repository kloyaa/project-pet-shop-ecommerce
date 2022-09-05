const getDateOfMonth = (date) => {
  if (date === "january") return new Date();
  if (date === "february") return new Date();
  if (date === "march") return new Date();
  if (date === "april") return new Date();
  if (date === "may") return new Date();
  if (date === "june") return new Date();
  if (date === "july") return new Date();
  if (date === "august") return new Date();
  if (date === "september") return new Date();
  if (date === "october") return new Date();
  if (date === "november") return new Date();
  if (date === "december") return new Date();
};

module.exports = {
  getDateOfMonth,
};
