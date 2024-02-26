const footerElements = [...document.querySelectorAll(".footerContainer")];
const favoritebackgroundContainer = document.querySelector(
  ".favoritebackgroundContainer"
);
changeColorFooter = () => {
  footerElements.map((el) => {
    el.children[1].children[0].style.color = "#e60c0d";
    el.children[1].children[1].style.color = "#e60c0d";
    el.addEventListener("click", (evt) => {
      if (
        evt.target.id == "houseDiv" ||
        evt.target.parentNode.id == "houseDiv"
      ) {
        el.children[1].children[0].style.color = "#fff";
        el.children[1].children[1].style.color = "#fff";
        el.children[2].children[0].style.color = "#fff";
        el.children[2].children[1].style.color = "#fff";
        el.children[0].children[0].style.color = "#e60c0d";
        el.children[0].children[1].style.color = "#e60c0d";
        window.open("./index.html", "_self");
      } else {
        el.children[1].children[0].style.color = "#fff";
        el.children[1].children[1].style.color = "#fff";
        el.children[0].children[0].style.color = "#fff";
        el.children[0].children[1].style.color = "#fff";
        el.children[2].children[0].style.color = "#e60c0d";
        el.children[2].children[1].style.color = "#e60c0d";
        window.open("./favorite.html", "_self");
      }
    });
  });
};
changeColorFooter();

const onloadSearchFilmScreen = async () => {
  const titleFavorite = document.createElement("h1");
  const rowTitleInfo = document.createElement("div");
  rowTitleInfo.setAttribute("class", "rowTitleInfo");
  const iconFavorite = document.createElement("img");
  const searchBarContainer = document.createElement("div");
  searchBarContainer.setAttribute("class", "searchBarContainer");
  const searchBar = document.createElement("input");

  searchBar.placeholder = "Filme ou Nome do Personagem";
  searchBarContainer.appendChild(searchBar);
  iconFavorite.setAttribute(
    "src",
    "./src/img/spider-man-anime-circle-shapes-wallpaper-preview.png"
  );
  titleFavorite.innerHTML = "Pesquisar";
  rowTitleInfo.appendChild(iconFavorite);
  rowTitleInfo.appendChild(titleFavorite);
  favoritebackgroundContainer.appendChild(rowTitleInfo);
  favoritebackgroundContainer.appendChild(searchBarContainer);
  searchBarContainer.classList.add("magictime", "puffIn");
};

const myApis = (textValue) => {
  document.addEventListener("keyup", (evt) => {
    const currentText = document.querySelector(
      ".searchBarContainer  input"
    ).value;

    searchApiElement(currentText.trim());
  });
};
const urls = [
  "https://spiderwiki-production.up.railway.app/",
  "https://spiderwikiactorsapi-production.up.railway.app/",
];
const searchApiElement = (inputText) => {
  const containerFilms = document.createElement("div");
  containerFilms.setAttribute("class", "containerFilms");
  const centralizeFilmContainer = document.createElement("div");
  centralizeFilmContainer.setAttribute("class", "centralizeFilmContainer");
  const receiveAllElements = document.createElement("div");

  const backgroundSearchScreen = document.querySelector(
    ".favoritebackgroundContainer"
  );
  const fetchPromises = urls.map((url) =>
    fetch(`${url}${inputText}`).then((response) => response.json())
  );
  let divImageEl = null;
  let divImg = null;
  Promise.all(fetchPromises)
    .then((responses) => {
      const responseData = responses.map((response) => {
        response.map((el) => {
          divImageEl = document.createElement("div");
          divImg = document.createElement("img");
          divImg.setAttribute("src", el.image_url);
          divImageEl.append(divImg);
          centralizeFilmContainer.innerHTML = "";
          centralizeFilmContainer.append(divImageEl);
          centralizeFilmContainer.removeChild(divImageEl);
          containerFilms.appendChild(centralizeFilmContainer);
        });

        receiveAllElements.appendChild(containerFilms);
        backgroundSearchScreen.appendChild(receiveAllElements);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
};

onloadSearchFilmScreen();
myApis();
