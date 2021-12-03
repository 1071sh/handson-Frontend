(function () {
  const ul = document.querySelector("ul"),
    li = document.createElement("li"),
    link = document.createElement("a"),
    linkText = document.createTextNode("これです"),
    img = document.createElement("img");
  img.src = "bookmark.png";
  img.alt = "ブックマーク";
  link.href = "1.html";
  link.appendChild(img);
  link.appendChild(linkText);
  li.appendChild(link);
  ul.appendChild(li);
})();
