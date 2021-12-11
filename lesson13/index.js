(function () {
  const div = document.querySelector("div"),
    ul = document.createElement("ul"),
    addDiv = document.createElement("div");

  // 属性付与
  div.setAttribute("id", "main");
  addDiv.setAttribute("id", "loading");

  const main = document.getElementById("main");

  // img作成
  loadImg = new Image();
  loadImg.src = "loading-circle.gif";

  const startbutton = document.createElement("button"),
    modalButton = document.createElement("button");

  //　ボタン作成
  const createButtonHtml = (target) => {
    startbutton.textContent = "クリックしてください";
    target.appendChild(startbutton);
  };

  //　ボタン削除
  const hideButtonHtml = () => {
    startbutton.remove();
  };

  // モーダル作成
  const createModalButtonHtml = () => {
    modalButton.setAttribute("id", "modalOpen");
    modalButton.setAttribute("class", "button-modal");
    modalButton.textContent = "modalが開きます";
    main.appendChild(modalButton);
  };

  createModalButtonHtml();

  // モーダル削除
  const hideModalButton = () => {
    modalButton.remove();
  };

  // modalopen作成
  const modalButtonOpen = document.getElementById("modalOpen"),
    modalWrapper = document.createElement("div"),
    modalContent = document.createElement("div");
  modalWrapper.setAttribute("class", "modal");
  modalContent.setAttribute("class", "modal-content");

  // modalclose作成
  const closehtml = document.createElement("span");
  closehtml.setAttribute("id", "modalClose");
  closehtml.setAttribute("class", "modal-close");
  closehtml.textContent = "×";

  // modalopenがクリックされた関数
  const modalOpen = () => {
    main.appendChild(modalWrapper);
    modalWrapper.appendChild(modalContent).appendChild(closehtml);
    createButtonHtml(modalContent);
    modalWrapper.style.display = "block";
  };

  //　modalcloseクリックされた関数
  const modalClose = () => {
    modalWrapper.style.display = "none";
  };

  // modalopenがクリックされた時
  modalButtonOpen.addEventListener("click", modalOpen);

  //　modalcloseクリックされた時
  closehtml.addEventListener("click", modalClose);

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
    addDiv.remove();
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

  // スタートボタンクリック後
  startbutton.addEventListener("click", () => {
    showLoading();
    hideModalButton();
    modalClose();
    fetchData();
  });

  // fetchで取得
  async function fetchData() {
    await fetch("https://myjson.dit.upm.es/api/bins/2lan")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return resolveFuc(data.data);
      })
      .catch((error) => {
        alert("失敗しました");
        console.log(error);
      })
      .finally((res) => {
        console.log(res);
      });
  }
})();
