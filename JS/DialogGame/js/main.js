(() => {
    const results = document.querySelector('#results');
    const questions = [
        {
            'question': 'Hvad er 7 * 9?',
            'answers': ['63'],
        },
        {
            'question': 'Hvad er x når x^2 = 4?',
            'answers': ['-2', '2'],
        },
        {
            'question': 'Hvad er kvadratroden af 25?',
            'answers': ['5'],
        },
        {
            'question': 'Hvad er x når x^2 = 25?',
            'answers': ['-5', '5'],
        },
        {
            'question': 'Hvad er x når -10(-x - 2) + 20 = 420?',
            'answers': ['38'],
        },
    ];

    function setup() {
        const button = document.createElement('button');
        button.innerHTML = 'Start!';
        button.id = 'start';

        button.addEventListener('click', () => {
            preStart();
        });

        results.appendChild(button);
    }

    function preStart() {
        document.querySelector('#start').remove();

        const name = prompt('Indtast dit navn:');

        if (!name)
            return;
        
        const play = confirm(`Hej ${name}. Er du klar til at spille?`);

        if (!play)
            return;

        start();
    }

    function start() {
        let score = 0;
        let i = 1;

        questions.forEach(q => {
            let answer = prompt(q.question);
            answer = answer ? answer.toLowerCase() : answer;

            if (q.answers.includes(answer)) {
                createResult('Du svared korrekt. +1 Score');

                score++;
            }
            else
                createResult('Du svared forkert. +0 Score');

            i++;
        });

        createResult(`<h3>Du fik ${score}/${questions.length}</h3>`);
    }

    function createResult(text) {
        const li = document.createElement('li');
        li.innerHTML = text;

        results.appendChild(li);
    }

    setup();
})();