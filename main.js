let input = document.querySelector(".form input");
let btn = document.querySelector(".form button");
let box = document.querySelector(".box");
let img = document.querySelector(".box img");
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
    console.log(data)
    fillData(data);
  }).catch((err) => {
    alert("Invalid Link");
  })
}

function fillData(data) {
  
  img.src = data.thumb;
  title.innerHTML = data.meta.title;
    data.url.forEach((el) => {
      if(el.downloadable) {
        downloadLinks.innerHTML += `<a href=${el.url} download='true' target=_blanc>${el.quality}p</a>`;
      } else {
        if(!el.no_audio && !el.audio) {
          watchLinks.innerHTML += `<a href=${el.url} download='true' target=_blanc>${el.quality}p</a>`;
        }
      }
      
    });
    box.style.display="block";
}



btn.addEventListener("click", ()=> {
  if(input.value) {
    getData(input.value);
  }
})
input.oninput = function() {
  box.style.display="none";
}