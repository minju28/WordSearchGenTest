function rng(max) {
    return Math.floor(Math.random() * max);
}

function randomLetter() {
    var letters = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
    return letters[rng(26)];
}

function randomDir() {
    var directions = [["+", "+"], ["+", null], [null, "+"]];
    return directions[rng(3)];
}

function applyOperator(op, a, b) {
    switch (op) {
        case "+": return a + b;
        case null : return a;
    }
}

function checkCoords(x, y, direction, word, array) {
    for (let i = 0; i < word.length; i++) {
            var maxX = applyOperator(direction[0], x, i);
            var maxY = applyOperator(direction[1], y, i);
            if (array[maxX] == null || array[maxX] == undefined) {
                return Boolean(false);
            }
            else if (array[maxX][maxY] != ' ' || array[maxX][maxY] != array[maxX][maxY]) {
                return Boolean(false);
            }
    }

    if (maxX <= array.length && maxY <= array.length) {
        return Boolean(true);
    }
}

function placeWords(array, word) {
    var direction = randomDir();
    var randX = rng(array.length);
    var randY = rng(array.length);
    if (checkCoords(randX, randY, direction, word, array)) {
        /* DEBUG MESSAGES
        console.log(word, randX, randY, direction);
        console.log('APPROVED.'); */

        for (let i = 0; i < word.length; i++) {
            var nextX = applyOperator(direction[0], randX, i);
            var nextY = applyOperator(direction[1], randY, i);
            array[nextX][nextY] = word[i];
        }
    }
    else {
        /*  DEBUG MESSAGES
        console.log(word, randX, randY, direction);
        console.log('INVALID, TRYING AGAIN.'); */
        placeWords(array, word);
    }
}

function genArray(size) {
    var array = new Array(size);
    for (let i = 0; i < array.length; i++) {
        array[i] = new Array(size);
        
    }
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            array[i][j] = ' ';
        }
    }
    return array;
}

function fill(array) {
    for (let i = 0; i < array.length; i ++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] == ' ') {
                array[i][j] = randomLetter();
            }
        }
    }
}

function submitForm() { 
    document.getElementById('submit').onclick = function(){
        var words = document.getElementById('words').value;
        var size = document.getElementById('size').value;
        main(words, Number(size));
    }
}

function main(words, size) {
    words = words.toUpperCase().split(" ");
    const array = genArray(size);
    
    for (word of words) {
        placeWords(array, word);
    }

    fill(array)

    const searchContainer = document.createElement('div');
    for (let i = 0; i < array.length; i++) {
        const newElement = document.createElement('p');
        newElement.classList.add("searchRows")
        newElement.append(array[i]);
        searchContainer.append(newElement);
        
    }
    
    searchContainer.classList.add("container")
    document.body.appendChild(searchContainer);

    const footerElement = document.createElement('div');
    footerElement.classList.add("container")
    footerElement.append(words.join(" "))
    document.body.appendChild(footerElement);
}

submitForm();
