// converting a decimal number to base 62
exports.id_to_base62 = (id) => {
  const digits =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let short_code = "";
  while (id > 0) {
    // console.log("ID Before: ", id);
    short_code = digits[id % 62] + short_code;
    // console.log("Short Code: ", short_code);
    id = parseInt(id / 62);
    // console.log("ID After: ", id);
  }
  // console.log(short_code);
  return short_code;
};
