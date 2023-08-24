let mainReq = new XMLHttpRequest();
mainReq.open("GET", "https://jsonplaceholder.typicode.com/users");
mainReq.responseType = "json";
mainReq.send();
mainReq.onload = function () {
  if (mainReq.status >= 200 && mainReq.status < 300) {
    let dataRess = mainReq.response;
    for (dataRespone of dataRess) {
      let li = document.createElement("li");
      li.className = "user";
      li.setAttribute("data-user", dataRespone.id);
      
      li.innerHTML = `<h3>${dataRespone.name}</h3>
            <p>${dataRespone.email}</p>`;

      document.getElementsByTagName("ul")[0].append(li);

      li.addEventListener(
        "click",
        (function (li) {
          return function () {
            const userId = li.getAttribute("data-user");
            getData(userId);
          };
        })(li)
      );
       
       let liarr = Array.from(document.querySelectorAll(".user"));
       liarr[0].className = "user user-selected";
       liarr.forEach((li) => {
         li.addEventListener("click", (ev) => {
           liarr.forEach((l)=>{l.classList.remove("user-selected")})
           ev.currentTarget.classList.add("user-selected");
         });
       });
    }
  }
};

function getData(id) {
  let posts = document.querySelector(".posts")
  posts.innerHTML =""
  let req = new XMLHttpRequest();
  req.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  req.responseType = "json";
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json");
  req.send();
  req.onload = () => {
    //   let dataRes = JSON.parse(req.responseText);
    if (req.status >= 200 && req.status < 300) {
      console.log(req.status);
      let dataRess = req.response;
      for (dataRespone of dataRess) {
        let div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `
            <h2 class="title">${dataRespone.title}</h2>
            <h5>${dataRespone.title}</h5>
            `;
        document.querySelector(".posts").appendChild(div);
      }
    } else {
      console.log(req.status);
      setTimeout(() => {
        let divAlert = document.createElement("div");
        divAlert.style.cssText =
          "background-color:#F5F3F4;padding: 15px;text-align:center;position: absolute;left:50%;top:50%;transform: translate(-50%, -50%);border: 1px solid #ccc;width:200px;height:auto";
        let divAlertP = document.createElement("p");

        divAlertP.textContent = "Error";

        let divAlertClose = document.createElement("span");
        divAlertClose.style.cssText =
          "display: inline-block;border-radius:50%;padding:5px; background-color:red;position:absolute;z-index:2;top:5px;right:5px;color:white;cursor:pointer";
        divAlertClose.innerHTML = "X";
        divAlert.addEventListener("click", () => {
          divAlert.remove();
        });

        const cardOpacity = [
          { opacity: 0, easing: "linear" },
          { opacity: 0.5, easing: "ease-in" },
          { opacity: 1, easing: "ease-out" },
        ];

        const cardTiming = {
          duration: 500,
          iterations: 1,
        };

        divAlert.animate(cardOpacity, cardTiming);
        divAlert.appendChild(divAlertP);
        divAlert.appendChild(divAlertClose);
        document.body.appendChild(divAlert);
      }, 0);
    }
  };
}
getData(1)