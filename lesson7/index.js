(function () {
  const div = document.querySelector("div"),
    ul = document.createElement("ul"),
    addDiv = document.createElement("div"),
    loadImg = new Image();
  loadImg.src = "loading-circle.gif";
  addDiv.setAttribute("id", "loading");

  const promise = new Promise((resolve) => {
    resolve([
      { to: "bookmark.html", img: "1.png", alt: "画像1", text: "ブックマーク" },
      { to: "message.html", img: "2.png", alt: "画像2", text: "メッセージ" },
    ]);
  });

  const createHtml = (data) => {
    data.map((item) => {
      const li = document.createElement("li"),
        img = document.createElement("img"),
        link = document.createElement("a");
      link.href = item.to;
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

  promise.then((data) => {
    showLoading();
    setTimeout(() => {
      hideLoading();
      createHtml(data);
    }, 3000);
  });
})();
