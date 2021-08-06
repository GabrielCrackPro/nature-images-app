let API_URL = "https://nature-image-api.vercel.app/search?q=";
const imagesContainer = document.querySelector(".images-container");
const form = document.querySelector("form");

const getData = async (url) => {
  let data = await fetch(url).then((response) => response.json());
  return data.images;
};
const formatTime = (time) => {
  let defaultTime = new Date(time);
  return `${defaultTime.getHours()}:${defaultTime.getMinutes()}`;
};
const showData = async () => {
  let results = await getData(API_URL);
  results.forEach((result) => {
    imagesContainer.innerHTML += `
      <div class="card mb-3 mt-3">
      <div class="row g-0">
        <div class="col-md-4">
        <a href="${result.image}" target="_blank"><img src="${
      result.image
    }" alt="image" class="img-fluid rounded-start"></a>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${result.title}</h5>
            <p class="card-text text-muted">By ${
              result.author
            } <a href="https://www.reddit.com/user/${
      result.author
    }" target="_blank" class="btn btn-sm green text-white">See profile</a></p>
            <small class="card-text">At: ${formatTime(
              result.created_utc
            )}</small>
            <br>
            <a href="${
              result.source
            }" target="blank"  class="btn btn-sm green text-white">Source</a>
          </div>
        </div>
      </div>
    </div>
      `;
  });
};

form.addEventListener("submit", (event) => {
  const searchData = new FormData(form);
  let query = searchData.get("query");
  API_URL += query;
  showData();
  form.reset();
  event.preventDefault();
});
