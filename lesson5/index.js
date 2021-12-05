(function () {
  const div = document.querySelector("div"),
    ul = document.createElement("ul");
  const promise = new Promise((resolve) => {
    resolve([
      { to: "bookmark.html", img: "1.png", alt: "画像1", text: "ブックマーク" },
      { to: "message.html", img: "2.png", alt: "画像2", text: "メッセージ" },
    ]);
  });
  promise.then((data) => {
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
  });
})();
