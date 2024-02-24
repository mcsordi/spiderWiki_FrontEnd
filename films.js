const filmPoster = document.getElementById("filmContent");
const backArrow = document.getElementById("backArrow");
const buttonFilm = document.querySelector("#buttonFilm");
const myFavoriteFilms = JSON.stringify(
  localStorage.getItem("favoriteFilmsStorage@Id")
);
const favoriteIconFilm = document.getElementById("myIcon");
const openScreen = localStorage.getItem("screen@true");
const changeFavoriteIcon = () => {
  const favContainer = document.createElement("div");
  favContainer.setAttribute("class", "favContainer");
  const favResContainer = document.createElement("div");
  favResContainer.setAttribute("class", "favResContainer");
  const actualFavoriteicon = document.querySelector(".addFavoriteDiv");
  favContainer.appendChild(favResContainer);

  if (myFavoriteFilms == null) {
    actualFavoriteicon.children[0].setAttribute(
      "class",
      `fa-solid fa-circle-plus`
    );
  } else if (
    myFavoriteFilms.includes(localStorage.getItem("nameFilm@Id")) == true
  ) {
    actualFavoriteicon.children[0].setAttribute(
      "class",
      `fa-solid fa-circle-xmark`
    );
  }
  const myRemoveIdEl = [];

  actualFavoriteicon.addEventListener("click", (evt) => {
    let allFilmsId =
      JSON.parse(localStorage.getItem("favoriteFilmsStorage@Id")) || [];

    if (allFilmsId == null || allFilmsId == []) {
      allFilmsId.push(localStorage.getItem("nameFilm@Id"));
      localStorage.setItem(
        "favoriteFilmsStorage@Id",
        JSON.stringify(allFilmsId)
      );
    } else if (
      allFilmsId.includes(localStorage.getItem("nameFilm@Id")) == false
    ) {
      allFilmsId.push(localStorage.getItem("nameFilm@Id"));
      localStorage.setItem(
        "favoriteFilmsStorage@Id",
        JSON.stringify(allFilmsId)
      );
    } else {
      const removeIdEl = [
        ...(JSON.parse(localStorage.getItem("favoriteFilmsStorage@Id")) || []),
      ].map((el) => {
        if (localStorage.getItem("nameFilm@Id") != el) {
          myRemoveIdEl.push(el);
        }
        localStorage.setItem(
          "favoriteFilmsStorage@Id",
          JSON.stringify(myRemoveIdEl)
        );
      });
    }

    let clickElement = "";
    if (evt.target.classList[0] == "addFavoriteDiv") {
      clickElement = evt.target.children[0];
    } else {
      clickElement = evt.target.parentNode.children[0];
    }
    if (clickElement.classList[1] == "fa-circle-plus") {
      favResContainer.innerHTML =
        `<img alt="favoriteImage" src="./src/img/7964d358a5d25f91a505615b1ed15a63-removebg-preview (1).png"></img>` +
        "<h1>Favorito Adicionado com Sucesso!</h1>";
      document.body.appendChild(favContainer);
      clickElement.setAttribute("class", `fa-solid fa-circle-xmark`);
    } else {
      favResContainer.innerHTML =
        `<img alt="spiderFavoriteImage" src="./src/img/434edce214d41204b54f20a49aadfcd4-removebg-preview (1).png"/>` +
        `<h1>Favorito Removido com Sucesso!</h1>`;
      document.body.appendChild(favContainer);
      clickElement.setAttribute("class", `fa-solid fa-circle-plus`);
    }
    setTimeout(() => {
      document.body.removeChild(favContainer);
    }, 1000);
  });
};
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
    openScreen;
    window.open(` ${localStorage.getItem("screen@Move")}` || "index", "_self");
  });
};
changeFavoriteIcon();
onClickArrow();
renderInfoFilm(localStorage.getItem("nameFilm@Id"), "flex");
