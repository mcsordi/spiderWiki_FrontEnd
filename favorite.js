const houseDiv = document.getElementById("houseDiv");
const searchDiv = document.getElementById("searchDiv");

if (localStorage.getItem("favoriteFilmsStorage@Id") == "[]") {
  localStorage.setItem("favoriteFilmsStorage@Id", null);
}

houseDiv.addEventListener("click", (evt) => {
  const favoriteScreen = localStorage.setItem("screen@Move", "./index.html");
  document.querySelector("#houseDiv p").style.color = "#e60c0d";
  document.querySelector("#houseDiv i").style.color = "#e60c0d";
  document.querySelector("#heartDiv p").style.color = "#fff";
  document.querySelector("#heartDiv i").style.color = "#fff";
  window.open("./index.html", "_self");
});
searchDiv.addEventListener("click", (evt) => {
  document.querySelector("#heartDiv p").style.color = "#fff";
  document.querySelector("#heartDiv i").style.color = "#fff";
  document.querySelector("#houseDiv p").style.color = "#fff";
  document.querySelector("#houseDiv i").style.color = "#fff";
  document.querySelector("#searchDiv p").style.color = "#e60c0d";
  document.querySelector("#searchDiv i").style.color = "#e60c0d";

  window.open("./search.html", "_self");
});
const getFavoriteFilms = async () => {
  const myIdFilms = JSON.parse(localStorage.getItem("favoriteFilmsStorage@Id"));
  const myIdActors = JSON.parse(
    localStorage.getItem("favoriteActorsStorage@Id")
  );

  const favoritebackgroundContainer = document.querySelector(
    ".favoritebackgroundContainer"
  );
  function fetchDataInParallel(urls) {
    const promises = urls.map((url) =>
      fetch(url).then((response) => response.json())
    );
    return Promise.all(promises);
  }

  const urls = [
    "https://spiderwiki-production.up.railway.app/",
    "https://spiderwikiactorsapi-production.up.railway.app/",
  ];

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
    fetchDataInParallel(urls).then((resultFilm) => {
      try {
        if (myIdFilms != null) {
          resultFilm[0].map((elFilm) => {
            myIdFilms.map((elApi) => {
              if (elFilm._id.includes(elApi)) {
                const filmImageDiv = document.createElement("div");
                const filmImage = document.createElement("img");
                filmImage.setAttribute("class", "filmImg");
                filmImage.setAttribute("src", `${elFilm.image_url}`);
                filmImage.setAttribute("id", elFilm._id);
                filmImageDiv.appendChild(filmImage);
                centralizeFilmContainer.appendChild(filmImageDiv);
                containerFilms.appendChild(centralizeFilmContainer);
                favoritebackgroundContainer.appendChild(containerFilms);
              }
            });
          });
        } else if (myIdFilms == null && myIdActors == null) {
          errorContainer.innerHTML =
            `<img alt="errorImage" src="./src/img/6046-200 (1).png"> ` +
            "<p>Nenhum Favorito Encontrado</p>";
          favoritebackgroundContainer.appendChild(errorContainer);
        }
        if (myIdActors != null) {
          resultFilm[1].map((elActor) => {
            myIdActors.map((el) => {
              if (elActor._id.includes(el)) {
                const actorImageDiv = document.createElement("div");
                const actorImage = document.createElement("img");
                actorImage.setAttribute("class", "actorImg");
                actorImage.setAttribute("src", `${elActor.image_url}`);
                actorImage.setAttribute("id", elActor._id);
                actorImageDiv.appendChild(actorImage);
                centralizeFilmContainer.appendChild(actorImageDiv);
                containerFilms.appendChild(centralizeFilmContainer);
                favoritebackgroundContainer.appendChild(containerFilms);
              }
            });
          });
        }
        onclickElement();
      } catch {
        errorContainer.innerHTML =
          `<img alt="errorImage" src="./src/img/6046-200 (1).png"> ` +
          "<p>Nenhum Favorito Encontrado</p>";
        favoritebackgroundContainer.appendChild(errorContainer);
        console.log("Nenhum Favorito Encontrado");
      }
    });
    const onclickElement = () => {
      const allElements = [...document.querySelectorAll(".containerFilms img")];
      allElements.map((el) => {
        el.addEventListener("click", (evt) => {
          evt.target.classList[0] == "filmImg"
            ? window.open("./films.html", "_self") &&
              localStorage.setItem("nameFilm@Id", evt.target.id)
            : window.open("./actors.html", "_self") &&
              localStorage.setItem("nameActor@Id", evt.target.id);
        });
      });
    };
  };

  myUrlImage();
};
getFavoriteFilms();
