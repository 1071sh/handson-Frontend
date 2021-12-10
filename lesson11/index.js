(function () {
  const div = document.querySelector("div"),
    ul = document.createElement("ul"),
    addDiv = document.createElement("div"),
    loadImg = new Image();
  loadImg.src = "loading-circle.gif";
  addDiv.setAttribute("id", "loading");

  const resolveFuc = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        hideLoading();
        resolve(createHtml(data));
      }, 3000);
    });
  };

  const createHtml = (data) => {
    data.map((item) => {
      const li = document.createElement("li"),
        img = document.createElement("img"),
        link = document.createElement("a");
      link.href = item.a;
      img.src = item.img;
      img.alt = item.alt;
      li.textContent = item.text;
      ul.appendChild(li).appendChild(link).appendChild(img);
      div.appendChild(ul);
    });
  };

  const showLoading = () => {
    document.body.appendChild(addDiv).appendChild(loadImg);
  };

  const hideLoading = () => {
    document.body.removeChild(addDiv);
  };

  fetch("https://myjson.dit.upm.es/api/bins/2lan")
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      async function finish() {
        showLoading();
        return await resolveFuc(data.data);
      }
      finish();
    })
    .catch((error) => {
      alert("失敗しました");
      console.log(error);
    })
    .finally((res) => {
      console.log(res);
    });
})();
