let tailleGrille = 9;
let grille = [];

document.getElementById("generer").addEventListener("click", genererGrille);
document.getElementById("resoudre").addEventListener("click", resoudreGrille);
document.getElementById("reinitialiser").addEventListener("click", reinitialiserGrille);

function genererGrille() {
    tailleGrille = parseInt(document.getElementById("taille").value);
    grille = Array(tailleGrille).fill(0).map(() => Array(tailleGrille).fill(0));

    const grilleContainer = document.getElementById("grille-container");
    grilleContainer.innerHTML = '';

    const grilleElement = document.createElement("div");
    grilleElement.classList.add("grille");
    grilleElement.style.gridTemplateColumns = `repeat(${tailleGrille}, 1fr)`;

    const sqrt = Math.sqrt(tailleGrille);

    for (let i = 0; i < tailleGrille; i++) {
        for (let j = 0; j < tailleGrille; j++) {
            const input = document.createElement("input");
            input.type = "number";
            input.min = "1";
            input.max = tailleGrille;
            input.classList.add('grid-cell');
            
            if (Math.floor(i / sqrt) % 2 === 0 && Math.floor(j / sqrt) % 2 === 0) {
                input.classList.add('block-highlight');
            } else if (Math.floor(i / sqrt) % 2 === 1 && Math.floor(j / sqrt) % 2 === 1) {
                input.classList.add('block-highlight');
            }
            
            input.addEventListener("input", () => {
                grille[i][j] = parseInt(input.value) || 0;
            });
            grilleElement.appendChild(input);
        }
    }

    grilleContainer.appendChild(grilleElement);
}

function resoudreGrille() {
    if (resoudre(0, 0)) {
        remplirGrille();
    } else {
        alert("Impossible de résoudre cette grille !");
    }
}

function resoudre(row, col) {
    if (row === tailleGrille) return true;
    if (col === tailleGrille) return resoudre(row + 1, 0);

    if (grille[row][col] !== 0) {
        return resoudre(row, col + 1);
    }

    for (let num = 1; num <= tailleGrille; num++) {
        if (estValide(row, col, num)) {
            grille[row][col] = num;
            if (resoudre(row, col + 1)) return true;
            grille[row][col] = 0;
        }
    }
    return false;
}

function estValide(row, col, num) {
    for (let x = 0; x < tailleGrille; x++) {
        if (grille[row][x] === num || grille[x][col] === num) {
            return false;
        }
    }

    let sqrt = Math.floor(Math.sqrt(tailleGrille));
    let boxRow = row - row % sqrt;
    let boxCol = col - col % sqrt;

    for (let r = 0; r < sqrt; r++) {
        for (let d = 0; d < sqrt; d++) {
            if (grille[r + boxRow][d + boxCol] === num) {
                return false;
            }
        }
    }
    return true;
}

function remplirGrille() {
    const inputs = document.querySelectorAll("input");
    let index = 0;
    for (let i = 0; i < tailleGrille; i++) {
        for (let j = 0; j < tailleGrille; j++) {
            inputs[index].value = grille[i][j];
            index++;
        }
    }
}

function reinitialiserGrille() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => input.value = '');
    grille = Array(tailleGrille).fill(0).map(() => Array(tailleGrille).fill(0));
}
