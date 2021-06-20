'use strict';

let all = [];
let limit = 25;
let roundlimit = document.getElementById('number');

console.log(limit);

function begin() {

  if (Number(roundlimit.value) == 0) {
    limit = 25;
  } else {
    limit = Number(roundlimit.value);
  }

  let imgSection = document.getElementById('imgSection');
  imgSection.style.filter = 'none';
  console.log( Number(roundlimit.value));

  let iteration = -1;
  let imgArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];



  let img1Div = document.getElementById('img1');
  let img2Div = document.getElementById('img2');
  let img3Div = document.getElementById('img3');

  let pos1 = document.createElement('img');
  let pos2 = document.createElement('img');
  let pos3 = document.createElement('img');

  img1Div.appendChild(pos1);
  img2Div.appendChild(pos2);
  img3Div.appendChild(pos3);

  let viewRes = document.getElementById('viewRes');

  let min = 0;
  let max = imgArr.length - 1;

  // let roundLimit = document.getElementById('number');
  // limit = roundLimit.value;
  // console.log(limit);

  function ImgObj(name, path) {
    this.name = name;
    this.path = path;
    this.clicked = 0;
    this.shown = 0;
    ImgObj.allImg.push(this);
  }
  ImgObj.allImg = [];


  function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  for (let i = 0; i < imgArr.length; i++) {
    new ImgObj(imgArr[i].split('.')[0], imgArr[i]);
  }

  render();

  function render() {
    let rand1 = getRand(min, max);
    let rand2 = getRand(min, max);
    let rand3 = getRand(min, max);
    while (rand1 == rand2 || rand1 == rand3 || rand2 == rand3) {
      rand1 = getRand(min, max);
      rand2 = getRand(min, max);
      rand3 = getRand(min, max);
    }

    pos1.setAttribute('src', `./img/${ImgObj.allImg[rand1].path}`);
    pos2.setAttribute('src', `./img/${ImgObj.allImg[rand2].path}`);
    pos3.setAttribute('src', `./img/${ImgObj.allImg[rand3].path}`);

    for(let i = 0; i < ImgObj.allImg.length; i++ ) {
      switch(ImgObj.allImg[i].path) {
      case pos1.src.split('/')[4]:
        ImgObj.allImg[i].shown++;
        break;
      case pos2.src.split('/')[4]:
        ImgObj.allImg[i].shown++;
        break;
      case pos3.src.split('/')[4]:
        ImgObj.allImg[i].shown++;
        break;
      }
    }

    iteration++;
    console.log(iteration, limit);///////////////////////////////////////////////////////////////////////
    if (iteration >= limit ) {
      imgSection.removeEventListener('click', check);
      viewRes.disabled = false;
      viewRes.style.background = 'green';
      viewRes.style.color = 'white';
      // console.log(ImgObj.allImg);
      all = ImgObj.allImg;
      return;
    }
  }

  imgSection.addEventListener('click', check);

  function check(e) {

    let pth = e.target.src.split('/')[4];

    for (let i = 0; i < ImgObj.allImg.length; i++ ) {

      if (pth == pos1.src.split('/')[4] && ImgObj.allImg[i].path == pos1.src.split('/')[4]) {
        ImgObj.allImg[i].clicked++;
        break;
      } else if (pth == pos2.src.split('/')[4] && ImgObj.allImg[i].path == pos2.src.split('/')[4]) {
        ImgObj.allImg[i].clicked++;
        break;
      } else if (pth == pos3.src.split('/')[4] && ImgObj.allImg[i].path == pos3.src.split('/')[4]) {
        ImgObj.allImg[i].clicked++;
        break;
      }
    }
    render();

  }



}

function resetAll() {
  location.reload();
}

function view() {
  let result = document.getElementById('result');
  let ul = document.createElement('ul');
  result.appendChild(ul);

  for (let i = 0; i < all.length; i++) {
    let li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${all[i].name} had ${all[i].clicked} votes, and was seen ${all[i].shown} times.`;

  }
}
