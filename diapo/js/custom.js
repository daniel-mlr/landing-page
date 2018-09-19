/* global Reveal */

// More info about config & dependencies:
// - https://github.com/hakimel/reveal.js#configuration
// - https://github.com/hakimel/reveal.js#dependencies

Reveal.initialize({
  margin: 0.01,
  center: false,
  slideNumber: true,
  overview: true
})
Reveal.configure({
  slideNumber: 'c/t'
})

/* get the animations tags */
var animateMoveRight = document.getElementById('moveRight')
var animateMoveCenter = document.getElementById('moveCenter')
var animateMoveOut = document.getElementById('moveOut')
var animateMoveOutLeft = document.getElementById('moveOutLeft')

/* module moveGraph */
const moveGraph = (function () {
  var _graphLocation = ''
  return {
    toCenter: function () {
      (_graphLocation !== 'center') && animateMoveCenter.beginElement()
      _graphLocation = 'center'
    },
    toRight: function () {
      (_graphLocation !== 'right') && animateMoveRight.beginElement()
      _graphLocation = 'right'
    },
    toOut: function () {
      (_graphLocation !== 'out') && animateMoveOut.beginElement()
      _graphLocation = 'out'
    },
    fadeOut: function () {
      // pass
    },
    fadeIn: function () {
      // pass
    },
    toOutLeft: function () {
      (_graphLocation !== 'outLeft') && animateMoveOutLeft.beginElement()
      _graphLocation = 'outLeft'
    }
  }
})()

var animateBusIn = document.getElementById('busIn')
var animateBus2A = document.getElementById('bus2A')
var animateBusOut = document.getElementById('busOut')
var animateBusB = document.getElementById('busB')
var animateBusC = document.getElementById('busC')

/* module moveBus */
const moveBus = (function () {
  var _busPosition = 'out'
  return {
    toIn: function () {
      (_busPosition !== 'in') && animateBusIn.beginElement()
      _busPosition = 'in'
    },
    toA: function () {
      (_busPosition !== 'a') && animateBus2A.beginElement()
      _busPosition = 'a'
    },
    toOut: function () {
      (_busPosition !== 'out') && animateBusOut.beginElement()
      _busPosition = 'out'
    },
    toB: function () {
      (_busPosition !== 'b') && animateBusB.beginElement()
      _busPosition = 'b'
    },
    toC: function () {
      (_busPosition !== 'c') && animateBusC.beginElement()
      _busPosition = 'c'
    }
  }
})()
var previousSlideIx = 0

Reveal.addEventListener('slidechanged', function (e) {
  // console.log('index: ', Reveal.getIndices())
  var classes = document.documentElement.classList
  if (classes.contains('frontpage')) {
    moveGraph.toOut()
    moveBus.toOut()
    previousSlideIx = Reveal.getIndices().h
  } else if (classes.contains('howItWorks')) {
    moveGraph.toCenter()
    moveBus.toOut()
    previousSlideIx = Reveal.getIndices().h
  } else if (classes.contains('traveller')) {
    moveGraph.toRight()
    moveBus.toOut()
    document.getElementById('portable').classList.remove('active')
    previousSlideIx = Reveal.getIndices().h
  } else if (classes.contains('app')) {
    moveGraph.toOut()
    moveBus.toOut()
    document.getElementById('portable').classList.add('active')
    if (previousSlideIx === 4) {
      document.getElementById('scr1').classList.remove('active')
      document.getElementById('scr2').classList.add('active')
      document.getElementById('scr3').classList.remove('active')
      // console.log('previous est 4')
    } else {
      // console.log('previous n\'est pas 4')
      document.getElementById('scr1').classList.add('active')
      document.getElementById('scr2').classList.remove('active')
      document.getElementById('scr3').classList.remove('active')
    }
    previousSlideIx = Reveal.getIndices().h
  } else if (classes.contains('app2')) {
    moveGraph.toOut()
    moveBus.toOut()
    document.getElementById('portable').classList.add('active')
    document.getElementById('scr3').classList.add('active')
  } else if (classes.contains('offerSide')) {
    moveGraph.toRight()
    document.getElementById('trspTimesUp').classList.remove('invisible')
    document.getElementById('trspTimesDown').classList.remove('invisible')
    document.getElementById('portable').classList.remove('active')
  } else if (classes.contains('potentialIncome')) {
    moveGraph.toRight()
    document.getElementById('trspTimesUp').classList.add('invisible')
    document.getElementById('trspTimesDown').classList.add('invisible')
  } else {
    moveGraph.toOutLeft()
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
  console.log('montré:', e.fragment.id)
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
    // document.getElementById('nbPassAC').classList.add('active')
  }
  if (e.fragment.id === 'van8pass') {
    moveBus.toIn()
  }
  if (e.fragment.id === 'vanA') {
    moveBus.toA()
  }
  if (e.fragment.id === 'potential60') {
    document.getElementById('AB').classList.remove('hlab')
    document.getElementById('CB').classList.add('hlab')
    document.getElementById('nbPassAC').classList.add('active')
    document.getElementById('fareCB').classList.add('active')
    document.getElementById('fareAB').classList.remove('active')
  }
  if (e.fragment.id === 'remainingAC') {
    moveBus.toC()
    document.getElementById('potentialAC').classList.add('active')
  }
  if (e.fragment.id === 'remainingCB') {
    moveBus.toB()
    document.getElementById('potentialCB').classList.add('active')
  }
  if (e.fragment.id === 'dataAnalysis') {
    moveBus.toB()
    document.getElementById('potentialAC').textContent = '$[5-15] x [3-5]'
    document.getElementById('potentialCB').textContent = '$[5-12] x [2-4]'
  }
  if (e.fragment.id === 'inform') {
    moveBus.toB()
    document.getElementById('estIncome').classList.add('active')
  }
  if (e.fragment.id === 'noOfferAB1') {
    document.getElementById('scr1').classList.remove('active')
    document.getElementById('scr2').classList.add('active')
  }
})
Reveal.addEventListener('fragmenthidden', function (e) {
  // console.log('fragment complet:', e)
  // console.log(
  //   'fragment présent:', e.fragment.id,
  //   'fragment précédent:', e.fragment.previousElementSibling.id
  // )
  // console.log('caché:', e.fragment.id)
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
  if (e.fragment.id === 'van8pass') {
    moveBus.toOut()
  }
  if (e.fragment.id === 'vanA') {
    moveBus.toIn()
  }
  if (e.fragment.id === 'potential60') {
    document.getElementById('AB').classList.add('hlab')
    document.getElementById('CB').classList.remove('hlab')
    document.getElementById('nbPassAC').classList.remove('active')
    document.getElementById('fareCB').classList.remove('active')
    document.getElementById('fareAB').classList.add('active')
  }
  if (e.fragment.id === 'remainingAC') {
    moveBus.toA()
    document.getElementById('potentialAC').classList.remove('active')
  }
  if (e.fragment.id === 'remainingCB') {
    moveBus.toC()
    document.getElementById('potentialCB').classList.remove('active')
  }
  if (e.fragment.id === 'dataAnalysis') {
    moveBus.toB()
    document.getElementById('potentialAC').textContent = '$? x 6'
    document.getElementById('potentialCB').textContent = '$? x 7'
  }
  if (e.fragment.id === 'inform') {
    moveBus.toB()
    document.getElementById('estIncome').classList.remove('active')
  }
  if (e.fragment.id === 'noOfferAB1') {
    document.getElementById('scr1').classList.add('active')
    document.getElementById('scr2').classList.remove('active')
  }
})
