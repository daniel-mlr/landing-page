/* global SVG */
const canvasW = 400
const canvasH = 300
const diameterCircle = 60
const cStrokeW = 5
const nodeColor = '#A5C0C8'
const edgeColor = '#939796'
// calculs intermédiaires
const centerH = 0.5 * canvasH
const centerV = 0.5 * canvasW
const rayCircle = diameterCircle / 2

const draw = SVG('diag1').size(canvasW, canvasH)

draw.rect(canvasW, canvasH).fill('#eee') // background

const coordA = [rayCircle + cStrokeW, centerH]
const coordB = [canvasW - rayCircle - cStrokeW, centerH]
const coordC = [centerV, rayCircle]
const coordD = [centerV, canvasH - rayCircle]
// draw.line(rayCircle + cStrokeW, centerH, canvasW - rayCircle - cStrokeW, centerH).stroke({width: cStrokeW, color: edgeColor})
draw.line([coordA, coordB]).stroke({width: cStrokeW, color: edgeColor}).id('AB')
draw.text('1 hour').attr({'font-style': 'oblique', fill: 'green'}).cx(centerV).cy(centerH - 16).id('timeAB') // temps de A à B
draw.line([coordA, coordC]).stroke({width: cStrokeW, color: edgeColor}).id('AC')
draw.text('45 min.').attr({'font-style': 'oblique', fill: 'green'}).cx(canvasW * 0.28).cy(canvasH * 0.25).rotate(-36).id('timeAD')
draw.line([coordA, coordD]).stroke({width: cStrokeW, color: edgeColor}).id('AD')
draw.line([coordC, coordB]).stroke({width: cStrokeW, color: edgeColor}).id('CB')
draw.text('45 min.').attr({'font-style': 'oblique', fill: 'green'}).cx(canvasW * 0.72).cy(canvasH * 0.25).rotate(36).id('timeCB')
draw.line([coordD, coordB]).stroke({width: cStrokeW, color: edgeColor}).id('DB')

// fourchette de temps de départ
draw.text('[10am-1pm]').size(14).cx(canvasW * 0.12).cy(centerH - rayCircle * 1.5).fill('blue')
// draw.text('[10am-10:15am]').size(14).cx(canvasW * 0.13).cy(centerH - rayCircle * 1.5).fill('blue')
// temps d'arrivée
draw.text('[ 2pm ]').size(14).cx(canvasW * (1 - 0.09)).cy(centerH - rayCircle * 1.5).fill('blue')
draw.text('[ 11am ]').size(14).cx(canvasW * 0.5).cy(rayCircle * 2.2).fill('blue')

const net = [1, 0.75, 0.75, 1].map(dia => draw.circle(dia * diameterCircle).stroke({width: cStrokeW, color: edgeColor}).fill(nodeColor))

const cercles = ['A', 'C', 'D', 'B']

const X = [rayCircle + cStrokeW, centerV, centerV, canvasW - rayCircle - cStrokeW]
const Y = [centerH, rayCircle, canvasH - rayCircle, centerH]

for (let i = 0; i < 4; i++) {
  net[i].cx(X[i]).cy(Y[i]).id('noeud' + cercles[i])
  draw.text(cercles[i]).size(30).attr({'font-weight': 'bold'}).fill('white').cx(X[i]).cy(Y[i]).id('lettre' + cercles[i])
}
