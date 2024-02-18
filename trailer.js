const onPlayFilm = () => {
  const filmId = document.getElementById("trailerContent");
  const heigth = window.innerHeight;
  const width = window.innerWidth;
  const getUrlIdFilm = localStorage.getItem("urlTrailerFilm@ID");

  filmId.innerHTML = `<iframe width="${width}" height="${
    heigth - 532
  }" src="https://www.youtube.com/embed/${localStorage.getItem(
    "urlTrailerFilm@ID"
  )}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
};
const onClickArrow = () => {
  backArrow.addEventListener("click", (evt) => {
    window.open("./films.html", "_self");
  });
};
onClickArrow();
onPlayFilm();
