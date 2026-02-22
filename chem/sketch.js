let atoms = [];
let atomPalette = [];
let bonds = [];

function preload() {
    // Load atom data
    atoms = loadJSON('data/atoms.json');
}

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('canvas-container');
    background(240);

    // Create atom palette buttons
    let paletteDiv = select('#atom-palette');
    atoms.forEach(a => {
        let btn = createButton(a.symbol);
        btn.style('background-color', a.color);
        btn.mousePressed(() => {
            let newAtom = new Atom(random(100, 700), random(100, 500), a.symbol, a.color, a.valence);
            atomPalette.push(newAtom);
        });
        btn.parent(paletteDiv);
    });
}

function draw() {
    background(240);

    // Draw bonds
    bonds.forEach(b => {
        stroke(0);
        strokeWeight(3);
        line(b.a.x, b.a.y, b.b.x, b.b.y);
    });

    // Draw atoms
    atomPalette.forEach(a => a.show());
}

// Simple Atom class
class Atom {
    constructor(x, y, symbol, color, valence) {
        this.x = x;
        this.y = y;
        this.symbol = symbol;
        this.color = color;
        this.valence = valence;
        this.radius = 30;
    }

    show() {
        fill(this.color);
        stroke(0);
        strokeWeight(2);
        ellipse(this.x, this.y, this.radius * 2);
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(16);
        text(this.symbol, this.x, this.y);
    }
}

loadJSON('/api/reactions', (data) => {
    reactions = data;
});