const houseDiv = document.getElementById("houseDiv");
houseDiv.addEventListener("click", (evt) => {
  document.querySelector("#houseDiv p").style.color = "#e60c0d";
  document.querySelector("#houseDiv i").style.color = "#e60c0d";
  document.querySelector("#heartDiv p").style.color = "#fff";
  document.querySelector("#heartDiv i").style.color = "#fff";
  window.open("./index.html", "_self");
});

const getFavoriteFilms = async () => {
  const filmEndpoint = "https://spiderwiki-production.up.railway.app/";
  const idFilm = await fetch(filmEndpoint);
  const idFilmJson = await idFilm.json();
  const favoritebackgroundContainer = document.querySelector(
    ".favoritebackgroundContainer"
  );
  const myIdFilms = JSON.parse(localStorage.getItem("favoriteFilmsStorage@Id"));

  const containerFilms = document.createElement("div");
  containerFilms.setAttribute("class", "containerFilms");
  const centralizeFilmContainer = document.createElement("div");
  centralizeFilmContainer.setAttribute("class", "centralizeFilmContainer");
  const errorContainer = document.createElement("div");
  errorContainer.setAttribute("class", "errorContainer");
  const titleFavorite = document.createElement("h1");
  const rowTitleInfo = document.createElement("div");
  rowTitleInfo.setAttribute("class", "rowTitleInfo");
  const iconFavorite = document.createElement("img");
  iconFavorite.setAttribute(
    "src",
    "./src/img/spider-man-anime-circle-shapes-wallpaper-preview.png"
  );
  titleFavorite.innerHTML = "Favoritos";
  rowTitleInfo.appendChild(iconFavorite);
  rowTitleInfo.appendChild(titleFavorite);
  favoritebackgroundContainer.appendChild(rowTitleInfo);

  const myUrlImage = () => {
    try {
      idFilmJson.map((elApi) => {
        myIdFilms.map((elFilm) => {
          if (elApi._id == elFilm) {
            const myFilmElement = document.createElement("div");

            const imageEl = document.createElement("img");
            imageEl.setAttribute("src", elApi.image_url);
            imageEl.setAttribute("id", elApi._id);
            myFilmElement.appendChild(imageEl);
            centralizeFilmContainer.appendChild(myFilmElement);
            containerFilms.appendChild(centralizeFilmContainer);

            favoritebackgroundContainer.appendChild(containerFilms);
          }
        });
      });
      const allFilmElements = [
        ...document.querySelectorAll(".centralizeFilmContainer img"),
      ];
      allFilmElements.map((el) => {
        el.addEventListener("click", (evt) => {
          localStorage.setItem("nameFilm@Id", evt.target.id);
          window.open("./films.html", "_self");
        });
      });
    } catch {
      errorContainer.innerHTML =
        `<img alt="errorImage" src="./src/img/6046-200 (1).png"> ` +
        "<p>Nenhum Favorito Encontrado</p>";
      favoritebackgroundContainer.appendChild(errorContainer);
    }
  };
  myUrlImage();
};
getFavoriteFilms();
