const filmPoster = document.getElementById("filmContent");
const backArrow = document.getElementById("backArrow");
const favoriteDiv = document.querySelector(".addFavoriteDiv");
const currentScreen = localStorage.getItem("screen@Move");
try {
  if (
    localStorage
      .getItem("favoriteActorsStorage@Id")
      .includes(localStorage.getItem("nameActor@Id")) == true
  ) {
    favoriteDiv.children[0].setAttribute("class", "fa-solid fa-circle-xmark");
  }
} catch {
  favoriteDiv.children[0].setAttribute("class", "fa-solid fa-circle-plus");
}

const renderInfoFilm = async (enpoint, elementId, display) => {
  const playButton = document.querySelector(".rowInfoIcons button");
  playButton.style.display = display;
  const details = document.getElementById("details");
  const filmDetails = document.getElementById("filmDetails");
  const title = document.getElementById("title");
  const character = document.getElementById("character");
  const items = await fetch(enpoint);

  const jsonItems = await items.json();
  await jsonItems.map((el) => {
    if (el._id == elementId) {
      filmPoster.style = ` background: linear-gradient(#161616 5%  , transparent 50%, #161616  85%),
        no-repeat center/100% 100% url(${el.poster_url});
`;
      title.innerHTML = el.nameActor;
      character.innerHTML = el.character;
      details.innerHTML = "Detalhes";
      filmDetails.innerHTML = `${el.description}`;
    }
  });
};
const onClickArrow = () => {
  backArrow.addEventListener("click", (evt) => {
    currentScreen == "./favorite.html"
      ? window.open("./favorite.html", "_self")
      : window.open("./index.html", "_self");
  });
};
const onClickFavoriteActor = () => {
  favoriteDiv;
  const favContainer = document.createElement("div");
  const favResContainer = document.createElement("div");
  favResContainer.setAttribute("class", "favResContainer");
  favContainer.setAttribute("class", "favContainer");
  favContainer.appendChild(favResContainer);
  const favoriteActor =
    JSON.parse(localStorage.getItem("favoriteActor@id")) || [];

  favoriteDiv.addEventListener("click", (evt) => {
    const actualIcon = favoriteDiv.children[0].classList[1];
    let removeActorId = [];
    if (actualIcon == "fa-circle-plus") {
      favResContainer.innerHTML =
        `<img alt="imgFavoriteContainer" src="./src/img/7964d358a5d25f91a505615b1ed15a63-removebg-preview (1).png"/>` +
        "<h1>Favorito Adicionado com sucesso</h1>";
      favoriteDiv.children[0].setAttribute("class", "fa-solid fa-circle-xmark");
    } else {
      favResContainer.innerHTML =
        `<img alt="imgFavoriteContainer" src="./src/img/434edce214d41204b54f20a49aadfcd4-removebg-preview (1).png"/>` +
        "<h1>Favorito Removido com sucesso</h1>";
      favoriteDiv.children[0].setAttribute("class", "fa-solid fa-circle-plus");
    }
    if (favoriteActor > 0) {
      currentActors = favoriteActor;
    }

    document.body.appendChild(favContainer);
    setTimeout(() => {
      document.body.removeChild(favContainer);
    }, 1000);

    let favoriteActorsStorage =
      JSON.parse(localStorage.getItem("favoriteActorsStorage@Id")) || [];
    if (
      favoriteActorsStorage.includes(localStorage.getItem("nameActor@Id")) ==
      true
    ) {
      const myIdElements =
        JSON.parse(localStorage.getItem("favoriteActorsStorage@Id")) || [];
      const myRemoveIdEl = [];

      const removeIdEl = [...myIdElements].map((el) => {
        if (localStorage.getItem("nameActor@Id") != el) {
          myRemoveIdEl.push(el);
        }
      });
      localStorage.setItem(
        "favoriteActorsStorage@Id",
        JSON.stringify(myRemoveIdEl)
      );
      if (myRemoveIdEl == "") {
        localStorage.setItem("favoriteActorsStorage@Id", null);
      }
    } else {
      favoriteActorsStorage.push(localStorage.getItem("nameActor@Id"));
      localStorage.setItem(
        "favoriteActorsStorage@Id",
        JSON.stringify(favoriteActorsStorage)
      );
    }
  });
};
onClickArrow();
onClickFavoriteActor();
renderInfoFilm(
  "https://spiderwikiactorsapi-production.up.railway.app",
  localStorage.getItem("nameActor@Id"),
  "none"
);
