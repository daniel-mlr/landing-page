/* global SVG:false */

// constantes pour graphes
const canvasW = 400
const canvasH = 300
const nodeColor = '#A5C0C8'
const edgeColor = '#939796'
const red = '#F05'
const bgColor = '#eee'

// constantes pour diag1
const diameterCircle = 60
const cStrokeW = 5

// calculs intermédiaires
const centerH = 0.5 * canvasH
const centerV = 0.5 * canvasW
const rayCircle = diameterCircle / 2

// diagramme 1
const draw = SVG('diag1').size(canvasW, canvasH)
const timeColor = 'green'

draw.rect(canvasW, canvasH).fill(bgColor) // background

const coordA = [rayCircle + cStrokeW, centerH]
const coordB = [canvasW - rayCircle - cStrokeW, centerH]
const coordC = [centerV, rayCircle]
const coordD = [centerV, canvasH - rayCircle]
// draw.line(rayCircle + cStrokeW, centerH, canvasW - rayCircle - cStrokeW, centerH).stroke({width: cStrokeW, color: edgeColor})
draw.line([coordA, coordB]).stroke({width: cStrokeW, color: edgeColor}).id('AB')
draw.text('1 hour')
  .attr({'font-style': 'oblique', fill: timeColor})
  .cx(centerV).cy(centerH - 16)
  .id('timeAB') // temps de A à B
draw.line([coordA, coordC]).stroke({width: cStrokeW, color: edgeColor}).id('AC')
draw.text('45 min.')
  .attr({'font-style': 'oblique', fill: timeColor})
  .cx(canvasW * 0.32).cy(canvasH * 0.22)
  .rotate(-36).id('timeAC')
draw.text('$40 x 1').fill(edgeColor)
  .cx(canvasW * 0.34).cy(canvasH * 0.31)
  .rotate(-36).id('fareAC')

draw.text('$20 x 1').fill(edgeColor).cx(centerV).cy(centerH + 16).id('fareAB')
draw.line([coordA, coordD]).stroke({width: cStrokeW, color: edgeColor}).id('AD')
draw.line([coordC, coordB]).stroke({width: cStrokeW, color: edgeColor}).id('CB')
draw.text('45 min.')
  .attr({'font-style': 'oblique', fill: timeColor})
  .cx(canvasW * 0.72).cy(canvasH * 0.25)
  .rotate(36).id('timeCB')
draw.line([coordD, coordB]).stroke({width: cStrokeW, color: edgeColor}).id('DB')

// fourchette de temps de départ
draw.text('[10am-1pm]').size(14)
  .cx(canvasW * 0.12).cy(centerH - rayCircle * 1.5)
  .fill('blue')
  .id('departAB')
draw.text('[11am-11:15am]').size(14)
  .cx(canvasW * 0.13).cy(centerH * 0.9 - rayCircle * 1.5)
  .fill('blue')
  .id('departAC')
// temps d'arrivée
draw.text('[ 2pm ]').size(14)
  .cx(canvasW * (1 - 0.09)).cy(centerH - rayCircle * 1.5)
  .fill('blue').id('arrivalB')
draw.text('[ 12pm ]').size(14)
  .cx(canvasW * 0.5).cy(rayCircle * 2.2)
  .fill('blue').id('arrivalC')

const net = [1, 0.75, 0.75, 1].map(dia => draw.circle(dia * diameterCircle).stroke({width: cStrokeW, color: edgeColor}).fill(nodeColor))

const cercles = ['A', 'C', 'D', 'B']

const X = [rayCircle + cStrokeW, centerV, centerV, canvasW - rayCircle - cStrokeW]
const Y = [centerH, rayCircle, canvasH - rayCircle, centerH]

for (let i = 0; i < 4; i++) {
  net[i].cx(X[i]).cy(Y[i]).id('noeud' + cercles[i])
  draw.text(cercles[i]).size(30).attr({'font-weight': 'bold'}).fill('white').cx(X[i]).cy(Y[i]).id('lettre' + cercles[i])
}

// dessin minivan

const minivan = draw.group()
minivan.add(
  draw.rect(60, 30)
    .fill(bgColor)
    .stroke({width: 3, color: '#fa0'})
    .radius(10)
)
const wheel = draw.circle(13)
  .fill(bgColor)
  .stroke({width: 3, color: '#222'})
  .cx(15).cy(30)
minivan.add(wheel)
minivan.add(wheel.clone().cx(45))
minivan.add(draw.text('8').cx(33).cy(13))

minivan.move(40, 40).rotate(-36)
// ------------ diagramme des timetable ---------------
const ttblW = 100
// meme longueur que draw
const ttbl = SVG('timetable').size(canvasW, ttblW)
const timeLbl = ['10h', '11h', '12h', '1h', '2h']
const tickL = 10
const tickW = 5
const nbTicks = 5
const tickHoffset = 22
const tLine1 = 50 // position verticale de time line 1
const tLine2 = 80
const tWindowW = 20

// ticks marqueurs de l'échelle de temps
ttbl.rect(canvasW, ttblW).fill(bgColor)
for (let i = 0; i < nbTicks; i++) {
  let tickHpos = canvasW / nbTicks * (i + 0.5)
  let lStart = [tickHpos, tickHoffset]
  let lEnd = [tickHpos, tickL + tickHoffset]
  ttbl.text(timeLbl[i]).cx(tickHpos).cy(10)
  ttbl.line([ lStart, lEnd ]).stroke({
    width: tickW,
    color: edgeColor
  })
}

// passager 1
// middle line
ttbl.line(0, tLine1, canvasW, tLine1).stroke({width: 0.2})
ttbl.text('P1').move(0, tLine1 - 0.5 * tWindowW)
// dash line
ttbl.line(canvasW * 0.1, tLine1, canvasW * 0.9, tLine1).stroke({
  width: 3,
  dasharray: 5,
  color: timeColor
})
// time window
// passager 1
ttbl.rect(canvasW * 0.6, tWindowW)
  .move(canvasW * 0.1, tLine1 - tWindowW * 0.5)
  .fill(nodeColor)
  .id('tWindow1')
// arrival time
ttbl.line(0, 0, 0, tWindowW)
  .move(canvasW * 0.9, tLine1 - 0.5 * tWindowW)
  .stroke({width: tickW, color: timeColor})
  .id('tTravel1')

// passager 2
ttbl.line(0, tLine2, canvasW, tLine2).stroke({width: 0.2})
ttbl.text('P2').move(0, tLine2 - 0.5 * tWindowW)
ttbl.line(canvasW * 0.3, tLine2, canvasW * 0.5, tLine2).stroke({
  width: 3,
  dasharray: 5,
  color: timeColor
})
ttbl.rect(canvasW * 0.05, tWindowW)
  .move(canvasW * 0.3, tLine2 - tWindowW * 0.5)
  .fill(nodeColor)
  .id('tWindow2')
ttbl.line(0, 0, 0, tWindowW).stroke({width: tickW, color: timeColor})
  .move(canvasW * 0.5, tLine2 - 0.5 * tWindowW)

// test fonctions
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "hi" }] */
// let anim

SVG.get('departAC').hide()
SVG.get('arrivalC').hide()
SVG.get('fareAB').hide()
SVG.get('fareAC').hide()
minivan.hide()

function hi (elem) {
  // console.log('elem no', elem, ' allumé.')
  switch (elem) {
    case 1:
    case 2:
    case 3:
    case 4:
      SVG.get('fareAB').hide()
      SVG.get('fareAC').hide()
      minivan.hide()
      break
    case 5:
    case 6:
      SVG.get('departAC').hide()
      SVG.get('arrivalC').hide()
      minivan.hide()
      break
    case 7:
    case 8:
      SVG.get('arrivalC').show()
      minivan.hide()
      break
    case 9:
      SVG.get('departAC').show()
      minivan.hide()
      break
    case 12:
      minivan.show()
      break
    case 13:
      break
  }

  switch (elem) {
    case 1:
      SVG.get('AB').animate(300, '-', 0).attr({'stroke': red}).loop(10)
      break
    case 2:
      SVG.get('arrivalB').attr({'font-weight': 'bold'})
        .animate(300, '-', 0).fill(red).loop(10)
      break
    case 3:
      SVG.get('timeAB').attr({'font-weight': 'bold'})
        .animate(300, '-', 0).fill(red).loop(10)
      break
    case 4:
      SVG.get('departAB').attr({'font-weight': 'bold'})
        .animate(300, '-', 0).fill(red).loop(10)
      break
    case 5:
      SVG.get('fareAB').show().animate(300, '-', 0).fill(red).loop(10)
      break
    case 6:
      SVG.get('tWindow1').animate().attr('width', 0).reverse()
      break
    case 7:
      SVG.get('AC').animate(300, '-', 0).stroke(red).loop(10)
      break
    case 8:
      SVG.get('arrivalC').attr({'font-weight': 'bold'})
        .animate(300, '-', 0).fill(red).loop(10)
      break
    case 9:
      SVG.get('departAC').show().attr({'font-weight': 'bold'})
        .animate(300, '-', 0).fill(red).loop(10)
      SVG.get('timeAC').attr({'font-weight': 'bold'})
        .animate(300, '-', 0).fill(red).loop(10)
      break
    case 10:
      SVG.get('fareAC').show().animate(300, '-', 0).fill(red).loop(10)
      break
    case 11:
      SVG.get('tWindow2').animate().attr('width', 0).reverse()
      break
    case 13:
      SVG.get('CB').animate(300, '-', 0).stroke(red).loop(10)
      SVG.get('AC').animate(300, '-', 0).stroke(red).loop(10)
      SVG.get('fareAC').show()
      SVG.get('fareAB').show().animate().move(182, 62).rotate(36)
      break
  }
}

function unhi (elem) {
  switch (elem) {
    case 1:
      // SVG.get('AB').stroke(edgeColor)
      SVG.get('AB').stop().stroke(edgeColor)
      // console.log('unhide', SVG.get('AB'))
      break
    case 2:
      SVG.get('arrivalB').stop().attr({
        'font-weight': 'normal',
        'fill': 'blue'
      })
      break
    case 3:
      SVG.get('timeAB').stop().attr({
        'font-weight': 'normal',
        'fill': 'blue'
      })
      break
    case 4:
      SVG.get('departAB').stop().attr({
        'font-weight': 'normal',
        'fill': 'blue'
      })
      break
    case 5:
      SVG.get('fareAB').stop().fill(edgeColor)
      break
    case 6:
      SVG.get('tWindow1').stop().attr('width', canvasW * 0.6)
      break
    case 7:
      SVG.get('AC').stop().stroke(edgeColor)
      break
    case 8:
      SVG.get('arrivalC').stop().attr({
        'font-weight': 'normal',
        'fill': 'blue'
      })
      break
    case 9:
      SVG.get('timeAC').stop().attr({
        'font-weight': 'normal',
        'fill': timeColor
      })
      SVG.get('departAC').stop().attr({
        'font-weight': 'normal',
        'fill': 'blue'
      })
      break
    case 10:
      SVG.get('fareAC').stop().fill(edgeColor)
      break
    case 11:
      SVG.get('tWindow2').stop().attr('width', canvasW * 0.05)
      break
    case 13:
      SVG.get('CB').stop().stroke(edgeColor)
      SVG.get('AC').stop().stroke(edgeColor)
      SVG.get('fareAB').stop().cx(centerV).cy(centerH + 16).rotate(0)
      break
  }
}
