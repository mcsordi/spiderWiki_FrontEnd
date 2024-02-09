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
  renderItems = () => {
    this.backgroundContainer = document.createElement("div");
    this.backgroundContainer.setAttribute("class", "backgroundContainer");
    this.footerContainer = document.createElement("div");
    this.footerContainer.setAttribute("class", "footerContainer");
    this.homeContainer = document.createElement("div");
    this.favoriteContainer = document.createElement("div");
    this.searchContainer = document.createElement("div");
    this.paragraphHome = document.createElement("p");
    this.paragraphSearch = document.createElement("p");
    this.paragraphFavorite = document.createElement("p");
    this.paragraphHome.append("Home");
    (this.homeContainer.innerHTML = `<i class="fa-solid fa-house"></i>`),
      this.homeContainer.appendChild(this.paragraphHome);
    this.paragraphFavorite.append("Favoritos");
    (this.favoriteContainer.innerHTML = `<i class="fa-solid fa-heart"></i>`),
      this.favoriteContainer.appendChild(this.paragraphFavorite);
    this.paragraphSearch.append("Pesquisar");
    (this.searchContainer.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`),
      this.searchContainer.appendChild(this.paragraphSearch);
    this.renderFilmsActors = document.createElement("div");
    this.renderFilmsActors.setAttribute("class", "renderFilmsActors");
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
  };
  getFilms = async () => {
    const getItems = await fetch(this.endpointFilms);
    const itemsJson = await getItems.json();
    const randomImage = Math.floor(Math.random() * 12);
    this.headerImageFilm.style = ` background: linear-gradient(#161616 5%, transparent 50%, #161616 85%),
    no-repeat center/100% 100% url(${itemsJson[randomImage].poster_url})`;
    itemsJson.map((el) => {
      this.individualFilmsContainer = document.createElement("div");
      this.imageFilms = document.createElement("img");
      this.imageFilms.src = `${el.image_url}`;
      this.individualActorsContainer = document.createElement("div");
      this.imageActors = document.createElement("img");
      this.individualFilmsContainer.append(this.imageFilms);
      this.filmsContainer.append(this.individualFilmsContainer);
      this.renderFilmsActors.append(this.filmsContainer);
      this.renderFilmsActors.prepend(this.h2Films);
    });
    this.iconsFilmContainer(itemsJson[randomImage].title);
  };
  getActors = async () => {
    const getItems = await fetch(this.endpointActors);
    const itemsJson = await getItems.json();
    itemsJson.map((el) => {
      this.individualActorsContainer = document.createElement("div");
      this.imageActors = document.createElement("img");
      this.imageActors.src = el.image_url;
      this.renderFilmsActors.append(this.h2Actors);
      this.individualActorsContainer.append(this.imageActors);
      this.actorsContainer.append(this.individualActorsContainer);
      this.renderFilmsActors.append(this.actorsContainer);
    });
  };
  iconsFilmContainer = (title) => {
    this.iconsContainer = document.createElement("div");
    this.iconsContainer.setAttribute("class", "iconsContainer");
    this.rowIconsContainer = document.createElement("div");
    this.rowIconsContainer.setAttribute("class", "rowIconsContainer");
    this.playButton = document.createElement("button");
    this.playButton.setAttribute("class", "playButton");
    this.playButton.innerHTML = `<i class="fa-solid fa-play"></i> <h3>Assistir</h3> `;
    this.addFavoriteDiv = document.createElement("div");
    this.addFavoriteDiv.setAttribute("class", "addFavoriteDiv");
    this.addFavoriteDiv.innerHTML = `<i class="fa-solid fa-circle-plus"></i> <p>Favoritos</p>`;
    this.learnMoreDiv = document.createElement("div");
    this.learnMoreDiv.setAttribute("class", "learnMoreDiv");
    this.learnMoreDiv.innerHTML = `<i class="fa-solid fa-circle-info"></i> <p>Saiba Mais</p>`;
    this.titlePosteFilm = document.createElement("h1");
    this.titlePosteFilm.innerHTML = title;
    this.categoryFilm = document.createElement("span");
    this.categoryFilm.innerHTML = "<h2>Filme</h2>";
    this.rowIconsContainer.append(
      this.addFavoriteDiv,
      this.playButton,
      this.learnMoreDiv
    );
    this.iconsContainer.append(this.categoryFilm);
    this.iconsContainer.append(this.titlePosteFilm);
    this.iconsContainer.append(this.rowIconsContainer);
    this.renderFilmImage.append(this.iconsContainer);
  };
}
export { CreateHome };
