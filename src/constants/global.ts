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

export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const genders = ["Male", "Female", "Other"];

export const monthOptions = monthNames.map((item) => ({
  label: item,
  value: item,
}));

export const genderOptions = genders.map((item) => ({
  label: item,
  value: item.toLowerCase(),
}));


export const bloodGroupOptions = bloodGroups.map((item) =>({
  label: item,
  value: item
}));