const filmPoster = document.getElementById("filmContent");
const backArrow = document.getElementById("backArrow");
const buttonFilm = document.getElementById("buttonFilm");

const renderInfoFilm = async (enpoint, elementId, display) => {
  const playButton = document.querySelector(".rowInfoIcons button");
  playButton.style.display = display;
  const details = document.getElementById("details");
  const filmDetails = document.getElementById("filmDetails");
  const title = document.getElementById("title");
  const items = await fetch(enpoint);
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
};
const onClickArrow = () => {
  backArrow.addEventListener("click", (evt) => {
    window.open("./index.html", "_self");
  });
};

buttonFilm.addEventListener("click", (evt) => {
  window.open("./trailer.html", "_self");
});
onClickArrow();
renderInfoFilm(
  "https://spiderwiki-production.up.railway.app/",

  localStorage.getItem("nameFilm@Id"),
  "flex"
);
