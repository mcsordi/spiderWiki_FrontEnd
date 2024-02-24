const findIcon = document.querySelector("#searchDiv");
document.querySelector("#searchDiv i").style.color = "#e60c0d";
document.querySelector("#searchDiv p").style.color = "#e60c0d";
document.querySelector("#heartDiv i").style.color = "#fff";
document.querySelector("#heartDiv p").style.color = "#fff";

const urls = [
  "https://spiderwiki-production.up.railway.app/",
  "https://spiderwikiactorsapi-production.up.railway.app/",
];

const resolve = async () => {
  await Promise.all(urls).then((values) => {
    console.log(values.map((el) => {}));
  });
};
resolve();
