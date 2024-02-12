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
    this.paragraphHome.append("Home");
    (this.homeContainer.innerHTML = `<i class="fa-solid fa-house redIcons"></i>`),
      this.homeContainer.appendChild(this.paragraphHome);
    this.paragraphFavorite.append("Favoritos");
    (this.favoriteContainer.innerHTML = `<i class="fa-solid fa-heart"></i>`),
      this.favoriteContainer.appendChild(this.paragraphFavorite);
    this.paragraphSearch.append("Pesquisar");
    (this.searchContainer.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`),
      this.searchContainer.appendChild(this.paragraphSearch);
    this.renderFilmsActors = document.createElement("div");
    this.renderFilmsActors.setAttribute("class", "renderFilmsActors");
    this.filmsAndActors = document.createElement("div");
    this.filmsAndActors.setAttribute("class", "filmsAndActors");
    this.renderFilmImage = document.createElement("div");
    this.renderFilmImage.setAttribute("class", "renderFilmImage");
    this.headerImageFilm = document.createElement("header");
    this.renderFilmImage.append(this.headerImageFilm);
    this.filmsContainer = document.createElement("div");
    this.filmsContainer.setAttribute("class", "filmsContainer");
    this.actorsContainer = document.createElement("div");
    this.actorsContainer.setAttribute("class", "actorsContainer");
    this.h2Films = document.createElement("h2");
    this.h2Films.innerHTML = "Filmes";
    this.h2Actors = document.createElement("h2");
    this.h2Actors.innerHTML = "Atores";
    this.body.appendChild(this.backgroundContainer);
    this.footerContainer.append(
      this.homeContainer,
      this.searchContainer,
      this.favoriteContainer
    );
    this.backgroundContainer.append(
      this.renderFilmImage,
      this.renderFilmsActors
    );
    this.body.appendChild(this.footerContainer);
    this.getFilms();
    this.getActors();
    this.childrenfooter = [
      ...document.querySelector(".footerContainer").children,
    ];
    this.changeColorFooter();
  };
  getFilms = async () => {
    const getItems = await fetch(this.endpointFilms);
    const itemsJson = await getItems.json();
    this.jsonImage = await itemsJson[this.randomNumber].poster_url;
    this.jsonTitle = await itemsJson[this.randomNumber].title;

    this.headerImageFilm.setAttribute(
      `style`,
      `background: linear-gradient(#161616 5%, transparent 50%, #161616 85% ),
    no-repeat center/100% 100% url(${itemsJson[this.randomNumber].poster_url}`
    );

    this.jsonDescription = await itemsJson[this.randomNumber].description;
    this.jsonPoster = await itemsJson[this.randomNumber].poster_url;
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
      this.filmsAndActors.append(this.filmsContainer);
      this.filmsAndActors.prepend(this.h2Films);
      this.renderFilmsActors.append(this.filmsAndActors);
    });
    this.iconsFilmContainer(itemsJson[this.randomNumber].title);
    this.onClickFilm();
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
      this.filmsAndActors.append(this.h2Actors);
      this.individualActorsContainer.append(this.imageActors);
      this.actorsContainer.append(this.individualActorsContainer);
      this.filmsAndActors.append(this.actorsContainer);
      this.renderFilmsActors.append(this.filmsAndActors);
    });
    this.onClickActor();
  };
  iconsFilmContainer = (title) => {
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
    this.addFavoriteDiv = document.createElement("div");
    this.addFavoriteDiv.setAttribute("class", "addFavoriteDiv");
    this.addFavoriteDiv.innerHTML = `<i class="fa-solid fa-circle-plus"></i> <p>Favoritos</p>`;
    this.learnMoreDiv = document.createElement("div");
    this.learnMoreDiv.setAttribute("class", "learnMoreDiv");
    this.learnMoreIcon = document.createElement("i");
    this.learnMoreIcon.setAttribute("class", "fa-solid fa-circle-info");
    this.learnMoreParagraph = document.createElement("p");
    this.learnMoreParagraph.innerHTML = "Saiba Mais";
    this.learnMoreDiv.appendChild(this.learnMoreIcon);
    this.learnMoreDiv.appendChild(this.learnMoreParagraph);
    this.titlePosteFilm = document.createElement("h1");
    this.titlePosteFilm.innerHTML = title;
    this.categoryFilm = document.createElement("span");
    this.categoryFilm.innerHTML = "<h2>Filme</h2>";
    this.rowIconsContainer.append(
      this.addFavoriteDiv,
      this.divWatchbutton,
      this.learnMoreDiv
    );
    this.iconsContainer.append(this.categoryFilm);
    this.iconsContainer.append(this.titlePosteFilm);
    this.iconsContainer.append(this.rowIconsContainer);

    this.renderFilmImage.append(this.iconsContainer);
    this.clickonLearMore(false, this.learnMoreDiv, this.jsonDescription);
    this.watchScreen(this.randomNumber);
  };
  clickonLearMore = (changeImage, clickElement, textApi) => {
    clickElement.addEventListener("click", (evt) => {
      this.body.removeChild(this.footerContainer);
      this.backgroundContainer.setAttribute(
        "class",
        "backgroundContainerMaxHeight"
      );
      this.learnMoreDiv.removeChild(this.learnMoreIcon);
      this.learnMoreDiv.removeChild(this.learnMoreParagraph);
      this.renderFilmsActors.removeChild(this.filmsAndActors);
      this.descriptionContainer = document.createElement("div");
      this.descriptionContainer.setAttribute("class", "descriptionContainer");
      this.descriptionText = document.createElement("h4");
      this.descriptionFilm = document.createElement("h3");
      this.descriptionFilm.innerHTML = "Descrição";
      this.descriptionContainer.appendChild(this.descriptionFilm);
      this.descriptionContainer.appendChild(this.descriptionText);
      this.renderFilmsActors.appendChild(this.descriptionContainer);
      this.arrowLeft.setAttribute("class", "fa-solid fa-chevron-left");
      this.iconsContainer.prepend(this.arrowLeft);
      this.myArrow(this.jsonImage);
      if (changeImage == true) {
        const getSpiderMovies = async () => {
          const fetchFilms = await fetch(this.endpointFilms);
          const fetchFilmsJson = await fetchFilms.json();
          await fetchFilmsJson.map((element, idx) => {
            if (element._id == evt.target.id) {
              this.headerImageFilm.setAttribute(
                `style`,
                `background: linear-gradient(#161616 5%, transparent 50%, #161616 85% ),
              no-repeat center/100% 100% url(${element.poster_url}`
              );
              this.descriptionText.append(element.description);
              this.titlePosteFilm.innerHTML = element.title;
              return this.watchScreen(idx);
            }
          });
        };
        getSpiderMovies();
      }
      if (changeImage == false) {
        this.descriptionText.append(textApi);
      }
    });
  };
  myArrow = (api) => {
    this.arrowLeft.addEventListener("click", (evt) => {
      this.backgroundContainer.setAttribute("class", "backgroundContainer");
      this.categoryFilm.innerHTML = "<h2>Filme</h2>";
      this.descriptionActorsContainer.remove(this.descriptionActorsContainer);
      this.headerImageFilm.setAttribute(
        `style`,
        `background: linear-gradient(#161616 5%, transparent 50%, #161616 85% ),
      no-repeat center/100% 100% url(${api}`
      );
      this.divWatchbutton.appendChild(this.playButton);
      this.titlePosteFilm.innerHTML = this.jsonTitle;
      this.learnMoreDiv.appendChild(this.learnMoreIcon);
      this.learnMoreDiv.appendChild(this.learnMoreParagraph);
      this.rowIconsContainer.appendChild(this.learnMoreDiv);
      const filmDsc = [...document.querySelectorAll(".descriptionContainer")];
      this.renderFilmsActors.appendChild(this.filmsAndActors);
      filmDsc.map((el) => {
        el.remove(el);
      });
      this.body.appendChild(this.footerContainer);
      this.arrowLeft.remove(this.arrowLeft);
      const trailerClass = this.body.lastChild.previousSibling.classList[0];

      if (trailerClass == "watchScreenView") {
        this.watchScreenView.remove(this.watchScreenView);

        this.body.appendChild(this.backgroundContainer);

        this.body.appendChild(this.footerContainer);
      }
      this.watchScreen(this.randomNumber);
    });
  };

  watchScreen = async (number) => {
    this.watchScreenView = document.createElement("div");
    this.watchScreenView.setAttribute("class", "watchScreenView");
    this.watchScreenFilm = document.createElement("iframe");
    this.watchScreenView.innerHTML = `<iframe width="${this.width}" height="${
      this.heigth - 532
    }" src="https://www.youtube.com/embed/${
      this.regexExpression[number]
    }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;

    this.arrowLeft.setAttribute("class", "fa-solid fa-chevron-left");
    this.playButton.addEventListener("click", () => {
      this.footerContainer.remove(this.footerContainer);
      this.backgroundContainer.remove(this.backgroundContainer);
      this.body.appendChild(this.watchScreenView);
      this.watchScreenView.prepend(this.arrowLeft);
    });
    this.myArrow(this.jsonImage);
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
    myFilms.map((el) => {
      this.clickonLearMore(true, el);
    });
  };
  onClickActor = async () => {
    const myActors = [...document.querySelectorAll(".actorsContainer img")];
    myActors.map((el) => {
      el.addEventListener("click", (evt) => {
        this.descriptionActorsContainer.innerHTML = "<h3>Descrição</h3>";
        this.iconsContainer.prepend(this.arrowLeft);
        this.playButton.remove(this.playButton);
        this.learnMoreIcon.remove(this.learnMoreIcon);
        this.learnMoreParagraph.remove(this.learnMoreParagraph);
        const getSpiderActors = async () => {
          const fetchActors = await fetch(this.endpointActors);
          const fetchActorsJson = await fetchActors.json();
          await fetchActorsJson.map((element, idx) => {
            if (element._id == evt.target.id) {
              this.headerImageFilm.style = ` background: linear-gradient(#161616 5%  , transparent 50%, #161616  85%),
        no-repeat center/100% 100% url(${element.poster_url});
`;
              this.titlePosteFilm.innerHTML = element.nameActor;
              this.body.removeChild(this.footerContainer);
              this.filmsAndActors.remove(this.filmsAndActors);

              this.descriptionActor.innerHTML = element.description;
              this.descriptionActorsContainer.appendChild(
                this.descriptionActor
              );
              this.renderFilmsActors.appendChild(
                this.descriptionActorsContainer
              );
              this.backgroundContainer.setAttribute(
                "class",
                "backgroundContainerMaxHeight"
              );
              this.categoryFilm.innerHTML = "<h2>Ator</h2>";
            }
          });
        };
        getSpiderActors();
      });
    });
    this.myArrow(this.endpointActors);
  };
}
export { CreateHome };
