class CreateHome {
  body = document.body;
  backgroundContainer = null;
  footerContainer = null;
  homeContainer = null;
  paragraphHome = null;
  searchContainer = null;
  paragraphSearch = null;
  favoriteContainer = null;
  paragraphFavorite = null;
  renderFilmsActors = null;
  renderFilmImage = null;
  headerImageFilm = null;
  endpointFilms = "https://spiderwiki-production.up.railway.app/";
  endpointActors = "https://spiderwikiactorsapi-production.up.railway.app/";
  filmsContainer = null;
  individualFilmsContainer = null;
  imageFilms = null;
  actorsContainer = null;
  individualActorsContainer = null;
  imageActors = null;
  h2Films = null;
  h2Actors = null;
  iconsContainer = null;
  rowIconsContainer = null;
  playButton = null;
  addFavoriteDiv = null;
  learnMoreDiv = null;
  titlePosteFilm = null;
  categoryFilm = null;
  jsonDescription = null;
  jsonImage = null;
  jsonPoster = null;
  descriptionContainer = null;
  descriptionText = null;
  descriptionFilm = null;
  centerDivDescription = null;
  filmsAndActors = null;
  arrowLeft = document.createElement("i");
  regex = /^.{11}/;
  watchScreenView = null;
  regexExpression = [];
  randomNumber = Math.floor(Math.random() * 12);
  width = this.body.offsetWidth;
  heigth = this.body.offsetHeight;
  childrenfooter = null;
  divWatchbutton = null;
  learnMoreIcon = null;
  learnMoreParagraph = null;
  jsonTitle = null;
  descriptionActorsContainer = null;
  descriptionActor = null;
  favContainer = null;
  jsonId = null;
  setfavoriteFilmsStorage = [];
  removeFavoriteDiv = null;

  renderItems = () => {
    this.backgroundContainer = document.createElement("div");
    this.backgroundContainer.setAttribute("class", "backgroundContainer");
    this.footerContainer = document.createElement("div");
    this.footerContainer.setAttribute("class", "footerContainer");
    this.homeContainer = document.createElement("div");
    this.homeContainer.setAttribute("class", "homeContainer");
    this.favoriteContainer = document.createElement("div");
    this.favoriteContainer.setAttribute("class", "favoriteContainer");
    this.searchContainer = document.createElement("div");
    this.searchContainer.setAttribute("class", "searchContainer");
    this.paragraphHome = document.createElement("p");
    this.paragraphHome.classList.add("redIcons");
    this.paragraphSearch = document.createElement("p");
    this.paragraphFavorite = document.createElement("p");
    this.paragraphHome.innerHTML = "Home";
    (this.homeContainer.innerHTML = `<i class="fa-solid fa-house redIcons"></i>`),
      this.homeContainer.appendChild(this.paragraphHome);
    this.paragraphFavorite.innerHTML = "Favoritos";
    (this.favoriteContainer.innerHTML = `<i class="fa-solid fa-heart"></i>`),
      this.favoriteContainer.appendChild(this.paragraphFavorite);
    this.paragraphSearch.innerHTML = "Pesquisar";
    (this.searchContainer.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`),
      this.searchContainer.appendChild(this.paragraphSearch);
    this.renderFilmsActors = document.createElement("div");
    this.renderFilmsActors.setAttribute("class", "renderFilmsActors");
    this.filmsAndActors = document.createElement("div");
    this.filmsAndActors.setAttribute("class", "filmsAndActors");
    this.renderFilmImage = document.createElement("div");
    this.renderFilmImage.setAttribute("class", "renderFilmImage");
    this.headerImageFilm = document.createElement("header");
    this.renderFilmImage.appendChild(this.headerImageFilm);
    this.filmsContainer = document.createElement("div");
    this.filmsContainer.setAttribute("class", "filmsContainer");
    this.actorsContainer = document.createElement("div");
    this.actorsContainer.setAttribute("class", "actorsContainer");
    this.h2Films = document.createElement("h2");
    this.h2Films.append("Filmes");
    this.h2Actors = document.createElement("h2");
    this.h2Actors.append("Atores");
    this.body.appendChild(this.backgroundContainer);
    this.footerContainer.appendChild(this.homeContainer);
    this.footerContainer.appendChild(this.searchContainer);
    this.footerContainer.appendChild(this.favoriteContainer);
    this.backgroundContainer.appendChild(this.renderFilmImage);
    this.backgroundContainer.appendChild(this.renderFilmsActors);
    this.body.prepend(this.footerContainer);
    this.getActors();
    this.getFilms();
    this.childrenfooter = [
      ...document.querySelector(".footerContainer").children,
    ];
    this.changeColorFooter();
    localStorage.setItem("screen@Move", "./index.html");
  };
  getFilms = async () => {
    const getItems = await fetch(this.endpointFilms);
    const itemsJson = await getItems.json();
    this.jsonImage = await itemsJson[this.randomNumber].poster_url;
    this.jsonTitle = await itemsJson[this.randomNumber].title;
    this.jsonId = await itemsJson[this.randomNumber]._id;

    this.headerImageFilm.setAttribute(
      `style`,
      `background: linear-gradient(#161616 5%, transparent 50%, #161616 85% ),
    no-repeat center/100% 100% url(${itemsJson[this.randomNumber].poster_url}`
    );

    this.jsonDescription = await itemsJson[this.randomNumber].description;
    this.jsonPoster = await itemsJson[this.randomNumber].poster_url;
    localStorage.setItem("nameFilm@Id", itemsJson[this.randomNumber]._id);
    itemsJson.map((el) => {
      const myregexExp = el.trailer_url.split("?v=")[1].match(this.regex)[0];

      this.regexExpression.push(myregexExp);
      this.individualFilmsContainer = document.createElement("div");
      this.imageFilms = document.createElement("img");
      this.imageFilms.setAttribute("id", el._id);
      this.imageFilms.src = `${el.image_url}`;
      this.individualActorsContainer = document.createElement("div");
      this.imageActors = document.createElement("img");
      this.individualFilmsContainer.append(this.imageFilms);
      this.filmsContainer.append(this.individualFilmsContainer);
      this.filmsAndActors.appendChild(this.filmsContainer);
      this.filmsAndActors.prepend(this.h2Films);
      this.renderFilmsActors.appendChild(this.filmsAndActors);
    });
    this.iconsFilmContainer(itemsJson[this.randomNumber].title);
    this.onClickFilm();
    this.onClickFavorite();
  };
  getActors = async () => {
    this.descriptionActorsContainer = document.createElement("div");
    this.descriptionActorsContainer.setAttribute(
      "class",
      "descriptionActorsContainer"
    );
    this.descriptionActor = document.createElement("h4");
    const getItems = await fetch(this.endpointActors);
    const itemsJson = await getItems.json();
    itemsJson.map((el) => {
      this.individualActorsContainer = document.createElement("div");
      this.imageActors = document.createElement("img");
      this.imageActors.setAttribute("id", el._id);
      this.imageActors.src = el.image_url;
      this.filmsAndActors.appendChild(this.h2Actors);
      this.individualActorsContainer.appendChild(this.imageActors);
      this.actorsContainer.append(this.individualActorsContainer);
      this.filmsAndActors.appendChild(this.actorsContainer);
      this.renderFilmsActors.appendChild(this.filmsAndActors);
    });
    this.onClickActor();
  };
  iconsFilmContainer = async (title) => {
    this.iconsContainer = document.createElement("div");
    this.iconsContainer.setAttribute("class", "iconsContainer");
    this.rowIconsContainer = document.createElement("div");
    this.rowIconsContainer.setAttribute("class", "rowIconsContainer");
    this.divWatchbutton = document.createElement("div");
    this.divWatchbutton.setAttribute("class", "divWatchbutton");
    this.playButton = document.createElement("button");
    this.playButton.setAttribute("class", "playButton");
    this.playButton.innerHTML = `<i class="fa-solid fa-play"></i> <h3>Assistir</h3> `;
    this.divWatchbutton.appendChild(this.playButton);
    this.removeFavoriteDiv = document.createElement("div");
    this.removeFavoriteDiv.setAttribute("class", "removeFavoriteDiv");
    this.removeFavoriteDiv.setAttribute("id", "removeFavoriteDiv");
    this.removeFavoriteDiv.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <p>Favoritos</p>`;
    this.addFavoriteDiv = document.createElement("div");
    this.addFavoriteDiv.setAttribute("id", "favoriteDiv");
    this.addFavoriteDiv.setAttribute("class", "addFavoriteDiv");
    this.addFavoriteDiv.innerHTML = `<i class="fa-solid fa-circle-plus"></i><p>Favoritos</p>`;

    if (localStorage.getItem("favoriteFilmsStorage@Id") == null) {
      this.rowIconsContainer.appendChild(this.addFavoriteDiv);
    } else if (
      localStorage.getItem("favoriteFilmsStorage@Id").includes(this.jsonId) !=
      true
    ) {
      this.rowIconsContainer.appendChild(this.addFavoriteDiv);
    } else {
      this.rowIconsContainer.appendChild(this.removeFavoriteDiv);
    }
    this.learnMoreDiv = document.createElement("div");
    this.learnMoreDiv.setAttribute("class", "learnMoreDiv");
    this.learnMoreIcon = document.createElement("i");
    this.learnMoreIcon.setAttribute("class", "fa-solid fa-circle-info");
    this.learnMoreParagraph = document.createElement("p");
    this.learnMoreParagraph.innerHTML = "Saiba Mais";
    this.learnMoreDiv.appendChild(this.learnMoreIcon);
    this.learnMoreDiv.appendChild(this.learnMoreParagraph);
    this.rowIconsContainer.appendChild(this.divWatchbutton);
    this.rowIconsContainer.appendChild(this.learnMoreDiv);
    this.titlePosteFilm = document.createElement("h1");
    this.titlePosteFilm.innerHTML = title;
    this.categoryFilm = document.createElement("span");
    this.categoryFilm.innerHTML = "<h2>Filme</h2>";
    this.iconsContainer.appendChild(this.categoryFilm);
    this.iconsContainer.appendChild(this.titlePosteFilm);
    this.iconsContainer.appendChild(this.rowIconsContainer);
    this.favoriteDiv = document.querySelector(".addFavoriteDiv");
    this.renderFilmImage.appendChild(this.iconsContainer);
    this.clickonLearMore(this.learnMoreDiv);
    this.onPlayButton();
  };
  clickonLearMore = (target) => {
    target.addEventListener("click", (evt) => {
      localStorage.setItem(
        "urlTrailerFilm@ID",
        this.regexExpression[this.randomNumber]
      );
      window.open("./films.html", "_self");
    });
  };

  onPlayButton = async () => {
    this.watchScreenView = document.createElement("div");
    this.watchScreenView.setAttribute("class", "watchScreenView");
    this.watchScreenFilm = document.createElement("iframe");
    this.watchScreenView.innerHTML = `<div class="fullTrailerContainer"><iframe width="${
      this.width
    }" height="${this.heigth - 532}" src="https://www.youtube.com/embed/${
      this.regexExpression[this.randomNumber]
    }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
    this.playButton.addEventListener("click", () => {
      this.footerContainer.remove(this.footerContainer);
      this.backgroundContainer.remove(this.backgroundContainer);
      this.body.appendChild(this.watchScreenView);
      this.arrowLeft.setAttribute("class", `fa-solid fa-chevron-left`);
      this.watchScreenView.append(this.arrowLeft);
    });

    this.arrowLeft.addEventListener("click", (evt) => {
      console.log("hello guy");
      window.open("./films.html", "_self");
    });
  };
  changeColorFooter = () => {
    this.childrenfooter.map((el) => {
      el.addEventListener("click", (evt) => {
        this.removeRedColor();
        if (
          evt.target.classList == "homeContainer" ||
          evt.target.parentNode.classList == "homeContainer" ||
          evt.target.classList == "searchContainer" ||
          evt.target.parentNode.classList == "searchContainer" ||
          evt.target.classList == "favoriteContainer" ||
          evt.target.parentNode.classList == "favoriteContainer"
        ) {
          [...el.children].map((el) => {
            el.classList.add("redIcons");
          });
        }
      });
    });
    this.favoriteContainer.addEventListener("click", (evt) => {
      const favoriteScreen = localStorage.setItem(
        "screen@Move",
        "./favorite.html"
      );
      window.open("./favorite.html", "_self");
    });
    this.searchContainer.addEventListener("click", (evt) => {
      window.open("./search.html", "_self");
    });
  };
  removeRedColor = () => {
    this.childrenfooter.map((el) => {
      [...el.children].map((element) => {
        element.classList.remove("redIcons");
      });
    });
  };

  onClickFilm = async () => {
    const myFilms = [...document.querySelectorAll(".filmsContainer img")];
    myFilms.map((el, idx) => {
      el.addEventListener("click", (evt) => {
        const filmStorage = localStorage.setItem("nameFilm@Id", evt.target.id);
        const urlTrailerFilm = localStorage.setItem(
          "urlTrailerFilm@ID",
          this.regexExpression[idx]
        );
        window.open("./films.html", "_self");
      });
    });
  };
  onClickActor = async () => {
    const myActors = [...document.querySelectorAll(".actorsContainer img")];
    myActors.map((el) => {
      el.addEventListener("click", (evt) => {
        const nameActor = localStorage.setItem("nameActor@Id", evt.target.id);
        window.open("./actors.html", "_self");
      });
    });
  };
  onClickFavorite = () => {
    this.favContainer = document.createElement("div");
    const favResContainer = document.createElement("div");

    this.addFavoriteDiv.addEventListener("click", (evt) => {
      this.favContainer.setAttribute("class", "favContainer");
      favResContainer.setAttribute("class", "favResContainer");

      favResContainer.innerHTML =
        `<img alt="spiderFavoriteImage" src="./src/img/7964d358a5d25f91a505615b1ed15a63-removebg-preview (1).png"/>` +
        `<h1>Favorito Adicionado com Sucesso!</h1>`;

      this.favContainer.appendChild(favResContainer);
      this.body.prepend(this.favContainer);
      setTimeout(this.removeFavoriteContainer, 1000);
      this.verifyAllIdFilms();
      this.addFavoriteDiv.remove(this.addFavoriteDiv);
      this.rowIconsContainer.prepend(this.removeFavoriteDiv);
    });

    this.removeFavoriteDiv.addEventListener("click", (evt) => {
      this.favContainer.setAttribute("class", "favContainer");
      favResContainer.setAttribute("class", "favResContainer");
      favResContainer.innerHTML =
        `<img alt="spiderFavoriteImage" src="./src/img/434edce214d41204b54f20a49aadfcd4-removebg-preview (1).png"/>` +
        `<h1>Favorito Removido com Sucesso!</h1>`;

      this.favContainer.appendChild(favResContainer);
      this.body.prepend(this.favContainer);
      setTimeout(this.removeFavoriteContainer, 1000);
      this.removeFavoriteDiv.remove(this.removeFavoriteDiv);
      this.rowIconsContainer.prepend(this.addFavoriteDiv);

      const myIdElements =
        JSON.parse(localStorage.getItem("favoriteFilmsStorage@Id")) || [];
      const myRemoveIdEl = [];

      const removeIdEl = [...myIdElements].map((el) => {
        if (this.jsonId != el) {
          myRemoveIdEl.push(el);
        }
      });

      localStorage.setItem(
        "favoriteFilmsStorage@Id",
        JSON.stringify(myRemoveIdEl)
      );
    });
  };

  removeFavoriteContainer = () => {
    this.favContainer.remove(this.favContainer);
  };
  verifyAllIdFilms = () => {
    const favoriteFilmsStorage =
      JSON.parse(localStorage.getItem("favoriteFilmsStorage@Id")) || [];
    if (favoriteFilmsStorage.includes(this.jsonId)) {
      favoriteFilmsStorage.pop(this.jsonId);
    }
    favoriteFilmsStorage.push(this.jsonId);

    localStorage.setItem(
      "favoriteFilmsStorage@Id",
      JSON.stringify(favoriteFilmsStorage)
    );
  };
}
export { CreateHome };
