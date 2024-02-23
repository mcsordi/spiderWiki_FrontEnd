const filmPoster = document.getElementById("filmContent");
const backArrow = document.getElementById("backArrow");
const buttonFilm = document.querySelector("buttonFilm");

const renderInfoFilm = async (elementId, display) => {
  const playButton = document.querySelector(".rowInfoIcons button");
  playButton.style.display = display;
  const details = document.getElementById("details");
  const filmDetails = document.getElementById("filmDetails");
  const title = document.getElementById("title");
  const items = await fetch("https://spiderwiki-production.up.railway.app/");
  const jsonItems = await items.json();
  await jsonItems.map((el) => {
    if (el._id == elementId) {
      filmPoster.style = ` background: linear-gradient(#161616 5%  , transparent 50%, #161616  85%),
        no-repeat center/100% 100% url(${el.poster_url});
`;
      title.innerHTML = el.title;
      details.innerHTML = "Detalhes";
      filmDetails.innerHTML = `${el.description}`;
    }
  });
  buttonFilm.addEventListener("click", (evt) => {
    window.open("./trailer.html", "_self");
  });
};
const onClickArrow = (el) => {
  backArrow.addEventListener("click", (evt) => {
    window.open("./index.html", "_self");
  });
};

onClickArrow();
renderInfoFilm(localStorage.getItem("nameFilm@Id"), "flex");
