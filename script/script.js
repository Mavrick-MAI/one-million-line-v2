// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }

  var leftCard = document.getElementById("leftCard");
  var rightCard = document.getElementById("rightCard");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    leftCard.classList.add('left-card-flip');
    leftCard.classList.remove('left-card-flip-back');
    rightCard.classList.add('right-card-flip');
    rightCard.classList.remove('right-card-flip-back');
  } else {
    leftCard.classList.add('left-card-flip-back');
    leftCard.classList.remove('left-card-flip');
    rightCard.classList.add('right-card-flip-back');
    rightCard.classList.remove('right-card-flip');
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

var home = document.getElementById('home');
var who = document.getElementById('who-wrap');
var canvas = document.getElementById( 'matrix' );
ctx = canvas.getContext( '2d' );
var canvas2 = document.getElementById( 'matrix2' ),
ctx2 = canvas2.getContext( '2d' ),
// full screen dimensions
cw = home.offsetWidth + who.offsetHeight,
ch = home.offsetHeight + who.offsetHeight,
charArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
maxCharCount = 200,
fallingCharArr = [],
fontSize = 10,
maxColums = cw/(fontSize);
canvas.width = canvas2.width = cw;
canvas.height = canvas2.height = ch;

function randomInt( min, max ) {
  return Math.floor(Math.random() * ( max - min ) + min);
}

function randomFloat( min, max ) {
  return Math.random() * ( max - min ) + min;
}

function Point(x,y)
{
  this.x = x;
  this.y = y;
}

Point.prototype.draw = function(ctx){

  this.value = charArr[randomInt(0,charArr.length-1)].toUpperCase();
  this.speed = randomFloat(1,5);

  ctx2.fillStyle = "rgba(255,255,255,0.8)";
  ctx2.font = fontSize+"px san-serif";
  ctx2.fillText(this.value,this.x,this.y);

  ctx.fillStyle = "#0F0";
  ctx.font = fontSize+"px san-serif";
  ctx.fillText(this.value,this.x,this.y);

  this.y += this.speed;
  if(this.y > ch)
  {
    this.y = randomFloat(-100,0);
    this.speed = randomFloat(2,5);
  }
}

for(var i = 0; i < maxColums ; i++) {
  fallingCharArr.push(new Point(i*fontSize,randomFloat(-500,0)));
}


var update = function()
{

ctx.fillStyle = "rgba(0,0,0,0.05)";
ctx.fillRect(0,0,cw,ch);

    ctx2.clearRect(0,0,cw,ch);

  var i = fallingCharArr.length;

  while (i--) {
    fallingCharArr[i].draw(ctx);
    var v = fallingCharArr[i];
  }

  requestAnimationFrame(update);
}

update();

var learnMore = document.getElementById('matrixButton');
learnMore.addEventListener('click', event => {
  event.preventDefault;
  var bottomLayer = document.getElementById('bottomLayerHome');
  bottomLayer.style.display = "flex";
  bottomLayer.classList.add("fade-in-element");

  var topLayerWho = document.getElementById('topLayerWho');
  topLayerWho.classList.add("fade-out-element");
  setTimeout(function() {
    var whowrap = document.getElementById('who-wrap');
    whowrap.style.backgroundColor = 'none';

    var title = document.getElementById('title');
    title.style.display = "block";
    title.classList.add('type');

    var bottomLayerWho = document.getElementById('bottomLayerWho');
    bottomLayerWho.style.display = "flex";

    var bluePill = document.getElementById('bluePill');
    var body = document.getElementsByTagName('body');
    body[0].classList.remove('open-circle');
    bluePill.addEventListener('click', (event) => {
      body[0].classList.add('close-circle');
      setTimeout(function() {
        bottomLayer.style.display = "none";
        bottomLayer.classList.remove("fade-in-element");

        topLayerWho.classList.remove("fade-out-element");

        title.style.display = "none";
        title.classList.remove('type');
        
        bottomLayerWho.style.display = "none";
        
        setTimeout(function() {
          whowrap.style.backgroundColor = 'white';
          body[0].classList.add('open-circle');
          body[0].classList.remove('close-circle');
        }, 1000);
      }, 5000);
    })
  }, 10000);
});