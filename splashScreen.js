const spiderImage = document.getElementById("spiderImage");

spiderImage.classList.add("hvr-pulse-grow");
setTimeout(() => {
  window.open("./index.html", "_self");
}, 1000);
