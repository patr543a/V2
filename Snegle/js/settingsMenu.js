const settingsMenu = document.querySelector('.settings');
const race = document.querySelector('.race');
const settingsOpenDuration = 1;
const timer = document.querySelector('#timer');
const end = document.querySelector('#end');
const fastest = document.querySelector('#fastest');
const settings = {
    snail1: { active: true, name: '', distance: 0, done: false, div: null },
    snail2: { active: true, name: '', distance: 0, done: false, div: null },
    snail3: { active: true, name: '', distance: 0, done: false, div: null },
    snail4: { active: true, name: '', distance: 0, done: false, div: null },
    racers: 0,
    finishedCount: 0,
    finished: false,
    winner: '',
    startTime: 0,
    endTime: 0,
    minSpeed: 100,
    maxSpeed: 1000,
    minDistance: 2,
    maxDistance: 3,
    fastest: {
        time: Infinity,
        name: '',
    },
}

const snailSpeeds = {
    kenneth: 1.1,
    patrick: 0.9,
    bolt: 0.2,
    turtle: 5,
}

let intervalId = null;

function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min) + min); }
function getRandomTimeout(min, max, i) {
    const name = settings['snail' + i].name.toLowerCase();
    const speed = name in snailSpeeds ? snailSpeeds[name] : 1;

    return getRandomInt(min * speed, max * speed);
}

function move(i) {
    settings['snail' + i].distance += getRandomInt(settings.minDistance, settings.maxDistance);
    settings['snail' + i].div.style.left = `${settings['snail' + i].distance}%`;

    if (settings['snail' + i].distance > 95) {
        settings.finishedCount++;
        settings['snail' + i].done = true;

        document.querySelector('#racer' + i + 'time').innerHTML = formatTime(new Date().getTime() - settings.startTime);

        if (settings.winner === '') {
            settings.winner = settings['snail' + i].name;
            settings.finished = true;
    
            settings.endTime = new Date().getTime();
    
            won();
        }

        return;
    }

    if (!settings['snail' + i].done) {
        setTimeout(() => move(i), getRandomTimeout(settings.minSpeed, settings.maxSpeed, i));
    }
}

function submit() {
    toggleSettingsMenu();
    
    settings.finished = false;
    settings.finishedCount = 0;
    settings.winner = '';
    
    for (let i = 1; i <= 4; i++) {
        settings['snail' + i].distance = 0;
        settings['snail' + i].done = false;

        document.querySelector('#racer' + i + 'name').innerHTML = 'no one';
        document.querySelector('#racer' + i + 'time').innerHTML = formatTime(0);

        if (settings['snail' + i].div)
            settings['snail' + i].div.style.transform = `translate(0, 0)`;
    }

    settings.startTime = new Date().getTime();

    let count = 0;

    for (let i = 1; i <= 4; i++) {
        if (!settings['snail' + i].active)
            continue;

        count++;

        document.querySelector('#racer' + i + 'name').innerHTML = settings['snail' + i].name;

        settings['snail' + i].div = document.querySelector('#snail' + i);
        settings['snail' + i].id = setTimeout(() => move(i), getRandomTimeout(settings.minSpeed, settings.maxSpeed, i));
    }

    settings.racers = count;

    intervalId = setInterval(() => {
        const time = new Date().getTime() - settings.startTime;

        timer.innerHTML = formatTime(time);

        if (settings.racers === settings.finishedCount)
            clearInterval(intervalId);
    }, 1);
}

function won() {
    const time = settings.endTime - settings.startTime;
    
    if (time < settings.fastest.time) {
        settings.fastest.time = time;
        settings.fastest.name = settings.winner;
    }
    
    if (settings.fastest.name !== '')
        fastest.innerHTML = `${settings.fastest.name}, ${formatTime(settings.fastest.time)}`;
    end.innerHTML = formatTime(time);
}

function formatTime(time) {
    const mili = Math.floor(time % 1000);
    time /= 1000;
    const sec = Math.floor(time % 60);
    time /= 60;
    const min = Math.floor(time);

    if (min > 0)
        return `${min}:${sec.toString().padStart(2, '0')}<sub>${mili.toString().padStart(3, '0')}</sub>`;
    else
        return `${sec.toString().padStart(2, '0')}<sub>${mili.toString().padStart(3, '0')}</sub>`;
}

function setSnailName(id, ev) {
    const snailname = document.querySelector(`#snail${id}name`);
    const name = ev.srcElement.value;

    settings['snail' + id].name = name;
    snailname.textContent = name;
}

function setSnailState(id, ev) {
    const state = ev.srcElement.checked;

    settings['snail' + id].active = state;
}