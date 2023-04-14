function setup() {
    const button = document.createElement('button');
    button.id = 'openSettings';
    button.innerHTML = 'Indstillinger';
    button.addEventListener('click', toggleSettingsMenu);

    document.querySelector('nav').appendChild(button);

    for (let i = 1; i <= 4; i++) {
        const snail = document.createElement('div');
        const title = document.createElement('p');
        const active = document.createElement('p');
        const name = document.createElement('p');
        const checkbox = document.createElement('input');
        const input = document.createElement('input');
        const img = document.createElement('img');

        snail.className = 'snail';

        title.className = 'title';
        title.innerHTML = `Snegl: ${i}`;

        active.className = 'active';
        active.innerHTML = 'Aktiv:';

        name.className = 'name';
        name.innerHTML = 'Navn:';

        checkbox.className = 'isActive';
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.addEventListener('change', ev => setSnailState(i, ev));

        input.className = 'snailName';
        input.placeholder = 'Navn';
        input.type = 'text';
        input.required = true;
        input.minLength = 2;
        input.maxLength = 10;
        input.pattern = "[[a-zA-ZæøåÆØÅ]+\s]+";
        input.addEventListener('change', ev => setSnailName(i, ev));

        img.className = 'image';
        img.alt = `Snegl ${i}`;
        img.src = `./imgs/snail${i}.png`;

        snail.appendChild(title);
        snail.appendChild(active);
        snail.appendChild(name);
        snail.appendChild(checkbox);
        snail.appendChild(input);
        snail.appendChild(img);

        document.querySelector('.snails').appendChild(snail);
    }

    const submitButton = document.createElement('button');
    submitButton.className = 'submit';
    submitButton.innerHTML = 'Start løbet';
    submitButton.type = 'submit';

    document.querySelector('.settingsContainer').appendChild(submitButton);
}

setup();