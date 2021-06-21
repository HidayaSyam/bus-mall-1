'use strict';

let imgArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

let allIndices = []; // holds all the indices, it will be used as a reference for other two arrays or maybe one in order to remove the indices selected before
for (let i = 0; i < imgArr.length; i++ ) {
  allIndices.push(i);
}
// console.log(allIndices);

let ALL = [];
let all = [];
let limit = 25;
let roundlimit = document.getElementById('number');
let lastIter = []; ///////////////////////////////////////////////// keeping track of lastIter
let arrOfRand = [];

let imgSection = document.getElementById('imgSection');
let message = document.getElementById('message');

let img1Div = document.getElementById('img1');
let img2Div = document.getElementById('img2');
let img3Div = document.getElementById('img3');

img1Div.style.border = 'none';
img2Div.style.border = 'none';
img3Div.style.border = 'none';
/////////////////////////////////////////////////////////////////////////
function begin() { // main body ///////////////////main body ///////////////////main body ///////////////////main body ///////////////////main body ///////////////

  let toBeUsedArr = [];
  toBeUsedArr.push(...allIndices);

  message.style.display = 'none';

  if (Number(roundlimit.value) == 0) {
    limit = 25;
  } else {
    limit = Number(roundlimit.value);
  }

  imgSection.style.filter = 'none';

  let iteration = -1;

  let leftRnds = document.getElementById('leftRnds');
  leftRnds.textContent = limit - iteration - 1;

  imgSection.style.background = 'none';
  img1Div.style.border = '#B3C7D6FF solid 2px';
  img2Div.style.border = '#B3C7D6FF solid 2px';
  img3Div.style.border = '#B3C7D6FF solid 2px';

  let pos1 = document.createElement('img');
  let pos2 = document.createElement('img');
  let pos3 = document.createElement('img');

  img1Div.appendChild(pos1);
  img2Div.appendChild(pos2);
  img3Div.appendChild(pos3);

  let viewRes = document.getElementById('viewRes');

  let min = 0;
  let max = imgArr.length - 1;
  /////////////////////////////////////////////////////////////////////////
  function ImgObj(name, path) {
    this.name = name;
    this.path = path;
    this.clicked = 0;
    this.shown = 0;
    ImgObj.allImg.push(this);
  }
  ImgObj.allImg = [];

  /////////////////////////////////////////////////////////////////////////
  
  function getRand(min, max) { // returns an array containing 3 random unique numbers, and updates an array holding the numbers used in the last or mosr recent iteration (still thinking what should I do with it) //
    // allIndices
    max = imgArr.length - 1;
    let tempArr = allIndices.slice(0);
    // console.log(tempArr);
    let c = 0;
    for (let i = 0; i < allIndices.length; i++) {
      let randind = Math.floor(Math.random() * (max - min + 1) + min);
      max--;
      // console.log('--------------');
      // console.log(randind);
      let rand = tempArr[randind];
      // console.log(tempArr);
      // console.log(rand);
      // console.log('--------------');
      if (lastIter.includes(rand) && arrOfRand.includes(rand)) {
        continue;
      } else {
        if (c < 3) {
          arrOfRand[c] = rand;
          c++;
          tempArr.splice(tempArr.indexOf(rand),1);
          // console.log('tempArr',y, 'rand',rand);
        } else {
          console.log(arrOfRand);
          console.log(lastIter);
          console.log('******************************************');
          break;
        }

      }

    }
    

    lastIter = arrOfRand; // the array holding the numbers used in the latest iteration
    return arrOfRand;
  }


  for (let i = 0; i < imgArr.length; i++) {
    new ImgObj(imgArr[i].split('.')[0], imgArr[i]);
  }

  render();
  /////////////////////////////////////////////////////////////////////////
  function render() {

    let [rand1, rand2, rand3] = getRand(min, max);

    pos1.setAttribute('src', `./img/${ImgObj.allImg[rand1].path}`);
    pos2.setAttribute('src', `./img/${ImgObj.allImg[rand2].path}`);
    pos3.setAttribute('src', `./img/${ImgObj.allImg[rand3].path}`);

    for(let i = 0; i < ImgObj.allImg.length; i++ ) {
      switch(ImgObj.allImg[i].path) {
      case pos1.src.split('/')[4]:
        ImgObj.allImg[i].shown++;
        if (iteration == limit - 1) ImgObj.allImg[i].shown--;
        break;
      case pos2.src.split('/')[4]:
        ImgObj.allImg[i].shown++;
        if (iteration == limit -1 ) ImgObj.allImg[i].shown--;
        break;
      case pos3.src.split('/')[4]:
        ImgObj.allImg[i].shown++;
        if (iteration == limit -1) ImgObj.allImg[i].shown--;
        break;
      }
    }
    iteration++;

    if (iteration >= limit ) {
      imgSection.removeEventListener('click', check);
      viewRes.disabled = false;
      viewRes.style.background = 'green';
      viewRes.style.color = 'white';
      // console.log(ImgObj.allImg);
      all = ImgObj.allImg;
      ALL = ImgObj.allImg.slice(0);
      console.log(ImgObj.allImg);
      return;
    }
  }

  imgSection.addEventListener('click', check);
  /////////////////////////////////////////////////////////////////////////
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
    leftRnds.textContent = Number(leftRnds.textContent) - 1;
    render();
  }
  /////////////////////////////////////////////////////////////////////////


  function drawChart() {
    
  }

} // end of main body////////////// end of main body////////////// end of main body////////////// end of main body////////////// end of main body//////////////////
/////////////////////////////////////////////////////////////////////////
function resetAll() {

  location.reload();
}
/////////////////////////////////////////////////////////////////////////
function view() {




  let myChart = document.createElement('canvas');
  let resButton = document.querySelector('#viewRes');
  let result = document.getElementById('result'); // container div
  let ul = document.createElement('ul');
  result.appendChild(myChart);
  result.appendChild(ul);
  
  myChart.setAttribute('width', '400px');
  myChart.setAttribute('height', '400px');
  myChart.setAttribute('id', 'myChart');
  myChart.style.marginBottom = '2rem';
  myChart.style.background = '#B3C7D6FF';
  myChart.style.borderRadius = '50px';
  myChart.style.padding = '1rem';

  let namesArr = ALL.slice(0);
  let vieweddArr = ALL.slice(0);
  let votedArr = ALL.slice(0);
  namesArr = namesArr.map(item => item.name);
  vieweddArr = vieweddArr.map(item => item.shown);
  votedArr = votedArr.map(item => item.clicked); // all good we have all the arrays needed
  // console.log(namesArr);
  // console.log(vieweddArr);
  // console.log(votedArr);
  

  let ctx = myChart.getContext('2d');
  let labels = namesArr.slice(0);


  function returnDatasets() {
    return ({
      label: "Voted",
      backgroundColor: "coral",
      data: votedArr
    });
  }
  function returnViewed() {
    return ({
      label: "Viewed",
      backgroundColor: "darkblue",
      data: vieweddArr
    });
  }
  
  const data = {
    labels: labels,
    datasets: [returnDatasets(), returnViewed()]
  };

  const config = {
    type: 'bar',
    data,
    options: {
      color: 'rgb(36,96,167)'
    }
  };

  let mainChart = new Chart(
    ctx,
    config
  );

  for (let i = 0; i < all.length; i++) {
    let li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${all[i].name} had ${all[i].clicked} votes, and was seen ${all[i].shown} times.`;
  }
  modifyShowResultsButton(resButton);
}
/////////////////////////////////////////////////////////////////////////
function modifyShowResultsButton(resButton) {

  resButton.disabled = true;
  resButton.style.background = 'initial'; // the view results button will stop showing the results everytime you click it, it will do that only once then it will be disabled
  resButton.textContent = 'Results';
  resButton.style.border = 'none';
}
