function sucess(you) {
  you = "passion, dedication and persistence";
  if (you.includes("passion") == false) {
    you = "you failed";
  } else {
    if (you.includes("dedication") == false) {
      you = "you failed";
    } else {
      if (you.includes("persistence") == false) {
        you = "you failed";
      } else {
        you = "sucess and victory";
        console.log(you);
      }
    }
  }
}
sucess();
