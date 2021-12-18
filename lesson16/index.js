(function () {
  const ul = document.querySelector("ul");
  ul.setAttribute("class", "tabs");

  // html生成
  const createHtml = (data) => {
    const tabContet = document.createElement("div");
    tabContet.setAttribute("class", "tab-content");
    ul.after(tabContet);

    data.list.map((item) => {
      // create tab
      const liHtml = document.createElement("li");
      liHtml.setAttribute("class", "tab");
      if (item.is_active) {
        liHtml.setAttribute("class", "tab is-active");
      }
      liHtml.textContent = item.heading;

      // create tabcontent
      const tabHtml = document.createElement("div");
      tabHtml.setAttribute("class", "tab-content-item");
      if (item.is_active) {
        tabHtml.setAttribute("class", "tab-content-item is-show");
      }

      // create article
      const articleList = document.createElement("ul");
      tabHtml.appendChild(articleList);
      item.articles.map((article) => {
        const articleItem = document.createElement("li");
        articleItem.textContent = article.title;

        // badge
        const newBadge = document.createElement("span");
        newBadge.setAttribute("class", "badge");
        // 新着かどうか
        if (article.is_old) {
          newBadge.textContent = "new";
          articleItem.appendChild(newBadge);
        }

        // commentIcon
        const comment = document.createElement("span");
        const commentIcon = new Image();
        commentIcon.src = "./img/comment.png";
        commentIcon.width = "20";
        commentIcon.height = "20";
        commentIcon.alt = "comment";
        // コメントがあったら
        if (article.comment.length !== 0) {
          comment.textContent = article.comment.length;
          articleItem.appendChild(commentIcon).after(comment);
        }
        tabHtml.appendChild(articleList).appendChild(articleItem);
      });

      // create thumnail
      const thumbnail = new Image();
      thumbnail.src = item.thumbnail;
      tabHtml.appendChild(thumbnail);

      ul.appendChild(liHtml);
      tabContet.appendChild(tabHtml);
      setTabs();
    });
  };

  // タブに対してクリックイベントを適用
  const setTabs = () => {
    const tabs = document.getElementsByClassName("tab");
    // console.log(tabs.length);
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener("click", tabSwitch, false);
    }
  };

  // タブをクリックすると実行する関数
  function tabSwitch() {
    // タブのclassの値を変更
    document.getElementsByClassName("is-active")[0].classList.remove("is-active");
    this.classList.add("is-active");
    // コンテンツのclassの値を変更
    document.getElementsByClassName("is-show")[0].classList.remove("is-show");
    const tabs = document.getElementsByClassName("tab");
    const arrayTabs = Array.prototype.slice.call(tabs);
    const index = arrayTabs.indexOf(this);
    document.getElementsByClassName("tab-content-item")[index].classList.add("is-show");
  }

  // 非同期処理
  const resolveFuc = (data) => {
    return new Promise((resolve) => {
      resolve(createHtml(data));
    });
  };

  // fetchで取得
  async function fetchData() {
    await fetch("https://myjson.dit.upm.es/api/bins/caat")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return resolveFuc(data);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      })
      .finally((res) => {
        res;
      });
  }

  fetchData();
})();
