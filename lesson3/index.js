(function () {
  const div = document.querySelector("div"),
    ul = document.createElement("ul");
  data = {
    li: [
      {
        src: "bookmark.png",
        linkText: "a1",
        href: "a1.html",
      },
      {
        src: "message.png",
        linkText: "a2",
        href: "a2.html",
      },
    ],
  };

  const createDomelement = (data) => {
    Object.keys(data).forEach((key) => {
      data[key].map((item) => {
        const li = document.createElement("li"),
          img = document.createElement("img"),
          link = document.createElement("a");
        img.src = item.src;
        link.href = item.href;
        link.appendChild(img);
        link.appendChild(document.createTextNode(item.linkText));
        li.appendChild(link);
        ul.appendChild(li);
        div.appendChild(ul);
      });
    });
  };
  createDomelement(data);
})();
