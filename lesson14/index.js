(function () {
  const div = document.querySelector("div"),
    ul = document.createElement("ul"),
    addDiv = document.createElement("div");

  // 属性付与
  div.setAttribute("id", "main");
  addDiv.setAttribute("id", "loading");

  const main = document.getElementById("main");

  // Loadimg作成
  loadImg = new Image();
  loadImg.src = "./img/loading-circle.gif";

  const startbutton = document.createElement("button");
  startbutton.textContent = "送信する";

  const modalButton = document.createElement("button");
  modalButton.textContent = "modalが開きます";
  modalButton.setAttribute("id", "modalOpen");
  modalButton.setAttribute("class", "button-modal");

  const inputNum = document.createElement("input");
  inputNum.type = "number";
  inputNum.id = "inputText";
  inputNum.placeholder = "数値を入力";

  //　ボタン作成
  const createButtonHtml = (target) => {
    target.appendChild(startbutton);
  };

  //　ボタン削除
  const hideButtonHtml = () => {
    startbutton.remove();
  };

  const createInputButton = () => {
    inputNum.value;
  };

  // モーダル作成
  const createModalButtonHtml = () => {
    main.appendChild(modalButton);
  };

  // モーダル削除
  const hideModalButton = () => {
    modalButton.remove();
  };

  createModalButtonHtml();

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
    modalWrapper.appendChild(modalContent).appendChild(inputNum);
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
    createInputButton();
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
