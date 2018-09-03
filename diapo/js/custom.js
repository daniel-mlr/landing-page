/* global Reveal */

// More info about config & dependencies:
// - https://github.com/hakimel/reveal.js#configuration
// - https://github.com/hakimel/reveal.js#dependencies
const sayHello = () => console.log('hello')

Reveal.initialize({
  margin: 0.01,
  center: false,
  slideNumber: true
})
Reveal.configure({
  slideNumber: 'c/t'
})

/* get the animations tags */
var animateMoveRight = document.getElementById('moveRight')
var animateMoveLeft = document.getElementById('moveLeft')

/* module moveGraph */
const moveGraph = (function () {
  var _graphLocation = 'left'
  return {
    toLeft: function () {
      (_graphLocation === 'right') && animateMoveLeft.beginElement()
      _graphLocation = 'left'
    },
    toRight: function () {
      (_graphLocation === 'left') && animateMoveRight.beginElement()
      _graphLocation = 'right'
    }
  }
})()
console.log('moveGraph:', moveGraph)

Reveal.addEventListener('slidechanged', function (e) {
  var classes = document.documentElement.classList
  if (classes.contains('howItWorks')) {
    moveGraph.toRight()
  } else {
    moveGraph.toLeft()
  }

  switch (String(e.indexh)) {
    case '1':
    case '2':
      break
    case '0':
    default:
  }
})
Reveal.addEventListener('fragmentshown', function (e) {
  console.log('shown:', e.fragment.id)
  if (e.fragment.id === 'travelAB') {
    document.getElementById('noeudA').classList.add('hlab')
    document.getElementById('noeudB').classList.add('hlab')
    document.getElementById('AB').classList.add('hlab')
  }
  if (e.fragment.id === 'bAt2pm') {
    document.getElementById('arrivalB').classList.add('active')
  }
  if (e.fragment.id === 'fastestAB') {
    document.getElementById('timeAB').classList.add('active')
  }
  /*
  switch (e.fragment.id) {
    case 'deux':
      console.log('cas deux')
      // svgDoc.getElementById('tWindow1').setAttribute('fill', '#ff0000')
      break
    default:
      console.log('défaut')
  }
  */
})
Reveal.addEventListener('fragmenthidden', function (e) {
  sayHello()
  console.log('fragment caché:', e.fragment.id)
  if (e.fragment.id === 'travelAB') {
    // document.getElementById('#noeudA').classList.remove("hlab")
    document.getElementById('noeudA').classList.remove('hlab')
    document.getElementById('noeudB').classList.remove('hlab')
    document.getElementById('AB').classList.remove('hlab')
  }
  if (e.fragment.id === 'bAt2pm') {
    document.getElementById('arrivalB').classList.remove('active')
  }
  if (e.fragment.id === 'fastestAB') {
    document.getElementById('timeAB').classList.remove('active')
  }
})
// Reveal.addEventListener('monetat', function(e) {
// utile seulement pour ajouter foctionalités supplémentaires
// généralement mettre data-state="monetat" dans la section suffit.
// }, false );
