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
  favoritebackgroundContainer.prepend(searchBarContainer);
  favoritebackgroundContainer.prepend(rowTitleInfo);
  searchBarContainer.classList.add("magictime", "puffIn");
};

const myApis = () => {
  document.addEventListener("keyup", (evt) => {
    const currentText = document.querySelector(
      ".searchBarContainer  input"
    ).value;
    currentText == ""
      ? searchApiElement(null)
      : searchApiElement(currentText.trim());
    document.querySelector(".renderAllFavorites").innerHTML = "";
  });
};
const urls = [
  "https://spiderwiki-production.up.railway.app/",
  "https://spiderwikiactorsapi-production.up.railway.app/",
];
const searchApiElement = (inputText) => {
  const renderAllFavorites = document.querySelector(".renderAllFavorites");
  const centrilizeElements = document.createElement("div");
  centrilizeElements.setAttribute("class", "centrilizeElements");

  const fetchPromises = urls.map((url) =>
    fetch(`${url}${inputText}`).then((response) => response.json())
  );

  Promise.all(fetchPromises).then((responses) => {
    const responseData = responses.map((response) => {
      centrilizeElements.innerHTML += response.map((el) => {
        return `<div><img class="${el.title}" id="${el._id}" src="${el.image_url}"/></div>`;
      });
      renderAllFavorites.innerHTML = "<h3>Resultados</h3>";
      renderAllFavorites.appendChild(centrilizeElements);
    });
    removeDuplicity();
    onClickRenderScreenElement();
  });
};
const removeDuplicity = () => {
  const mainContainerSearch = [
    ...document.querySelectorAll(".centrilizeElements"),
  ];
  mainContainerSearch.map((el, idx) => {
    if (idx > 0) {
      el.remove(el);
    }
  });
  if (document.querySelector(".centrilizeElements").children.length == 0) {
    document.querySelector(".renderAllFavorites").innerHTML =
      "<div class='noContentImage'><img src='./src/img/searchImg.png'/><p>Nenhum resultado Encontrado</p>";
  }
};
const onClickRenderScreenElement = () => {
  const divFavorites = [
    ...document.querySelectorAll(".centrilizeElements img"),
  ];
  divFavorites.map((el) => {
    el.addEventListener("click", (evt) => {
      if (evt.target.classList[0] == "undefined") {
        console.log(evt.target.id);
        localStorage.setItem("nameActor@Id", evt.target.id);
        window.open("./actors.html", "_self");
      } else {
        console.log(evt.target.id);
        localStorage.setItem("nameFilm@Id", evt.target.id);
        window.open("./films.html", "_self");
      }
    });
  });
};
onloadSearchFilmScreen();
myApis();
