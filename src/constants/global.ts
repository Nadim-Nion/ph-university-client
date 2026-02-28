export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const genders = ["Male", "Female", "Other"];

export const monthOptions = monthNames.map((item) => ({
  label: item,
  value: item,
}));

export const genderOptions = genders.map((item) => ({
  label: item,
  value: item.toLowerCase(),
}));

export const bloodGroupOptions = bloodGroups.map((item) => ({
  label: item,
  value: item,
}));

export const days = [
  {
    label: "Saturday",
    value: "Sat",
  },
  {
    label: "Sunday",
    value: "Sun",
  },
  {
    label: "Monday",
    value: "Mon",
  },
  {
    label: "Tuesday",
    value: "Tue",
  },
  {
    label: "Wednesday",
    value: "Wed",
  },
  {
    label: "Thursday",
    value: "Thu",
  },
  {
    label: "Friday",
    value: "Fri",
  },
];

export const daysOptions = days.map((item) => ({
    label: item.label,
    value: item.value,
  }));
