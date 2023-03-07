let input = document.querySelector(".form input");
let btn = document.querySelector(".form button");
let box = document.querySelector(".box");
let img = document.querySelector(".box img");
let time = document.querySelector(".box .time");
let title = document.querySelector(".box .title");
let downloadLinks = document.querySelector(".box .download");
let watchLinks = document.querySelector(".box .watch");


function getData(link) {
  const data = {
    url: link,
  }
  
  fetch("https://save-from.net/api/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then((res) => res.json())
  .then((data) => {
    fillData(data);
  }).catch((err) => {
    alert("Invalid Link");
  })
}

function fillData(data) {
  watchLinks.innerHTML = '';
  downloadLinks.innerHTML = '';
  img.src = data.thumb;
  time.innerText = data.meta.duration;
  title.innerHTML = data.meta.title;
    data.url.forEach((el) => {
      if(el.downloadable) {
        downloadLinks.innerHTML += `<a href=${el.url} download='true' target=_blanc>Download</a>`;
      } else {
        if(!el.no_audio && !el.audio) {
          watchLinks.innerHTML += `<a href=${el.url} download='true' target=_blanc>Watch</a>`;
        }
      }
      
    });
    box.style.display="block";
}




btn.addEventListener("click", ()=> {
  if(input.value) {
    getData(input.value);
  }
});

input.oninput = function() {
  box.style.display="none";
}

input.onkeyup = function (e) {
  if (e.key == "Enter") btn.click();
};