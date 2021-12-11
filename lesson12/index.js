(function () {
  const div = document.querySelector("div"),
    ul = document.createElement("ul"),
    addDiv = document.createElement("div"),
    startbutton = document.createElement("button");
  // img作成
  loadImg = new Image();
  loadImg.src = "loading-circle.gif";
  // 属性付与
  div.setAttribute("id", "main");
  addDiv.setAttribute("id", "loading");

  //　ボタン作成
  const createButtonHtml = () => {
    const main = document.getElementById("main");
    startbutton.textContent = "クリックしてください";
    main.appendChild(startbutton);
  };

  //　ボタン削除
  const hideButtonHtml = () => {
    main.removeChild(startbutton);
  };

  // html生成
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

  // ローディング開始
  const showLoading = () => {
    document.body.appendChild(addDiv).appendChild(loadImg);
  };

  // ローディング終了
  const hideLoading = () => {
    document.body.removeChild(addDiv);
  };

  // 3秒後に着火
  const resolveFuc = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        hideLoading();
        hideButtonHtml();
        resolve(createHtml(data));
      }, 3000);
    });
  };

  // fetchで取得
  fetch("https://myjson.dit.upm.es/api/bins/2lan")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      createButtonHtml();
      startbutton.addEventListener("click", () => {
        showLoading();
        async function finish() {
          return await resolveFuc(data.data);
        }
        finish();
      });
    })
    .catch((error) => {
      alert("失敗しました");
      console.log(error);
    })
    .finally((res) => {
      console.log(res);
    });
})();
