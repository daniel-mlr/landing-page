/* global Reveal */

// More info about config & dependencies:
// - https://github.com/hakimel/reveal.js#configuration
// - https://github.com/hakimel/reveal.js#dependencies

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

var animateBusIn = document.getElementById('busIn')
var animateBusA = document.getElementById('busA')
var animateBus2A = document.getElementById('bus2A')
var animateBusOut = document.getElementById('busOut')

const moveBus = (function () {
  var _busPosition = 'out'
  return {
    toIn: function () {
      (_busPosition !== 'in') && animateBusIn.beginElement()
      _busPosition = 'in'
    },
    toA: function () {
      (_busPosition !== 'a') && animateBus2A.beginElement() && animateBusA.beginElement()
      // (_busPosition !== 'a') && animateBus2A.beginElement()
      _busPosition = 'a'
    },
    toOut: function () {
      (_busPosition !== 'out') && animateBusOut.beginElement()
      _busPosition = 'out'
    }
  }
})()

Reveal.addEventListener('slidechanged', function (e) {
  var classes = document.documentElement.classList
  if (classes.contains('howItWorks')) {
    moveGraph.toRight()
    moveBus.toOut()
  } else if (classes.contains('offerSide')) {
    moveGraph.toRight()
    moveBus.toIn()
    console.log('moveBus.toIn() appelé')
  } else {
    moveGraph.toLeft()
    moveBus.toOut()
  }
  // switch (true) {
  //   case classes.contains('offerSide'):
  //     moveBus.toIn()
  //   case classes.contains('howItWorks'):
  //     moveGraph.toRight()
  //     break
  //   case '2':
  //     break
  //   case '0':
  //   default:
  // }
})
Reveal.addEventListener('fragmentshown', function (e) {
  if (e.fragment.id === 'travelAB') {
    document.getElementById('noeudA').classList.add('hlab')
    document.getElementById('noeudB').classList.add('hlab')
    document.getElementById('AB').classList.add('hlab')
  }
  if (e.fragment.id === 'bAt2pm') {
    document.getElementById('arrivalB').classList.add('active')
  }
  // if (e.fragment.id === 'fastestAB') {
  //   document.getElementById('timeAB').classList.add('active')
  // }
  if (e.fragment.id === 'ready3h') {
    document.getElementById('departA1').classList.add('active')
  }
  if (e.fragment.id === 'fare20') {
    document.getElementById('fareAB').classList.add('active')
  }
  if (e.fragment.id === 'travelAC') {
    document.getElementById('noeudC').classList.add('hlab')
    document.getElementById('AC').classList.add('hlab')
  }
  if (e.fragment.id === 'cAt12pm') {
    document.getElementById('arrivalC').classList.add('active')
  }
  if (e.fragment.id === 'stricter') {
    document.getElementById('departA2').classList.add('active')
    document.getElementById('departA1').classList.add('dimmed')
  }
  if (e.fragment.id === 'fare40') {
    document.getElementById('fareAC').classList.add('active')
  }
  if (e.fragment.id === 'vanA') {
    console.log('fragment activé:', e.fragment.id)
    moveBus.toA()
  }
})
Reveal.addEventListener('fragmenthidden', function (e) {
  // console.log('fragment complet:', e)
  // console.log(
  //   'fragment présent:', e.fragment.id,
  //   'fragment précédent:', e.fragment.previousElementSibling.id
  // )
  // console.log('caché:', e)
  if (e.fragment.id === 'travelAB') {
    // document.getElementById('#noeudA').classList.remove("hlab")
    document.getElementById('noeudA').classList.remove('hlab')
    document.getElementById('noeudB').classList.remove('hlab')
    document.getElementById('AB').classList.remove('hlab')
  }
  if (e.fragment.id === 'bAt2pm') {
    document.getElementById('arrivalB').classList.remove('active')
  }
  if (e.fragment.id === 'cAt12pm') {
    document.getElementById('arrivalC').classList.remove('active')
  }
  // if (e.fragment.id === 'fastestAB') {
  //   document.getElementById('timeAB').classList.remove('active')
  // }
  if (e.fragment.id === 'ready3h') {
    document.getElementById('departA1').classList.remove('active')
  }
  if (e.fragment.id === 'fare20') {
    document.getElementById('fareAB').classList.remove('active')
  }
  if (e.fragment.id === 'travelAC') {
    document.getElementById('noeudC').classList.remove('hlab')
    document.getElementById('AC').classList.remove('hlab')
  }
  if (e.fragment.id === 'cAt12pm') {
    document.getElementById('arrivalC').classList.remove('active')
  }
  if (e.fragment.id === 'stricter') {
    document.getElementById('departA2').classList.remove('active')
    document.getElementById('departA1').classList.remove('dimmed')
  }
  if (e.fragment.id === 'fare40') {
    document.getElementById('fareAC').classList.remove('active')
  }
  if (e.fragment.id === 'vanA') {
    console.log('fragment annulé:', e.fragment.id)
    moveBus.toOut()
  }
})
// Reveal.addEventListener('monetat', function(e) {
// utile seulement pour ajouter foctionalités supplémentaires
// généralement mettre data-state="monetat" dans la section suffit.
// }, false );
