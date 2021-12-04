(function () {
  const div = document.querySelector("div"),
    ul = document.createElement("ul");
  data = [
    { to: "bookmark.html", img: "1.png", alt: "画像1", text: "ブックマーク" },
    { to: "message.html", img: "2.png", alt: "画像2", text: "メッセージ" },
  ];

  const createDomelement = (data) => {
    data.map((item) => {
      const li = document.createElement("li"),
        img = document.createElement("img"),
        link = document.createElement("a");
      img.src = item.img;
      img.alt = item.alt;
      link.href = item.to;
      link.appendChild(img);
      link.appendChild(document.createTextNode(item.text));
      li.appendChild(link);
      ul.appendChild(li);
      div.appendChild(ul);
    });
  };
  createDomelement(data);
})();
