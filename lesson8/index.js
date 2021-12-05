(function () {
  const addDiv = document.createElement("div"),
    loadImg = new Image();
  loadImg.src = "loading-circle.gif";
  addDiv.setAttribute("id", "loading");

  const promise = new Promise((reject) => {
    setTimeout(() => {
      reject(new Error("エラーです"));
    }, 3000);
  });

  const showLoading = () => {
    document.body.appendChild(addDiv).appendChild(loadImg);
  };

  promise
    .then((value) => {
      console.log(value);
      showLoading();
    })
    .catch((error) => {
      console.log(error);
    });
})();
