const houseDiv = document.getElementById("houseDiv");
houseDiv.addEventListener("click", (evt) => {
  document.querySelector("#houseDiv p").style.color = "#e60c0d";
  document.querySelector("#houseDiv i").style.color = "#e60c0d";
  document.querySelector("#heartDiv p").style.color = "#fff";
  document.querySelector("#heartDiv i").style.color = "#fff";
  window.open("./index.html", "_self");
});
