const segments = document.getElementsByClassName('segments');
const win = document.getElementById('win');
const movesElement = document.getElementById('moves');
const minmoves = document.getElementById('minmoves');

let segmentCount = 5;
let segmentWidth = 50;
let segmentBaseWidth = 25;

let lastPole = undefined;
let moves = 0;
let hasWon = false;

const locations = {
    pole1: [],
    pole2: [],
    pole3: [],
};

const colors = [
    'linear-gradient(red, darkred)',
    'linear-gradient(orange, orangered)',
    'linear-gradient(yellow, darkgoldenrod)',
    'linear-gradient(lightgreen, green)',
    'linear-gradient(lightblue, blue)'
];

function changeCount() {
    segmentCount = parseInt(document.getElementById('count').value);

    setup();
}

function setup() {
    hasWon = false;
    moves = 0;
    lastPole = undefined;
    locations.pole1 = [];
    locations.pole2 = [];
    locations.pole3 = [];

    minmoves.textContent = `(Minimun number of moves is ${Math.pow(2, segmentCount) - 1})`;

    removeSegments();
    setCSSVariables();
    createSegments();
}

function removeSegments() {
    const allSegments = [...document.getElementsByClassName('segment')];

    allSegments.forEach(e => {
        e.remove();
    });
}

function setCSSVariables() {
    const root = document.querySelector(':root');

    root.style.setProperty('--segments', segmentCount);
    root.style.setProperty('--segment-width-change', segmentWidth);
    root.style.setProperty('--segment-base-width', segmentBaseWidth);
}

function createSegments() {
    for (let i = 0; i < segmentCount; i++) {
        const element = document.createElement("div")

        element.id = `segment${i + 1}`;
        element.className = 'segment';
        element.style.width = `${(i + 1) * segmentWidth + segmentBaseWidth}px`;
        element.style.background = colors[i % colors.length];

        segments[0].appendChild(element);
        locations.pole1.push(segmentCount - i);
    }
}

function move(pole) {
    if (hasWon)
        return;
    
    if (lastPole !== undefined) {
        if (locations[lastPole].length === 0)
            return;

        const id = locations[lastPole].pop();
        const seg = document.getElementById(`segment${id}`);
        const moveTo = segments[pole[4] - 1];
                
        if (id > locations[pole][locations[pole].length - 1] && locations[pole].length !== 0 && lastPole !== pole) {
            locations[lastPole].push(id);

            return;
        }
        
        locations[pole].push(id);
        seg.className = "segment";
        moveTo.insertBefore(seg, moveTo.firstChild);
        moves++;

        lastPole = undefined;
    }
    else {
        if (locations[pole].length === 0)
            return;

        const id = locations[pole][locations[pole].length - 1];
        const seg = document.getElementById(`segment${id}`);
        seg.className = "segment selected";

        lastPole = pole;
    }

    movesElement.textContent = `${moves} Moves used`;

    checkWin();
}

function checkWin() {
    if (locations.pole2.length === segmentCount || locations.pole3.length === segmentCount) {
        hasWon = true;

        win.style.display = "initial";
    }
}

changeCount();