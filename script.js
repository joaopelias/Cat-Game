const body = document.querySelector("body")
const game = document.querySelector(".game")

const count = document.querySelector("#temp")
const reset = document.querySelector("#reset")
const textmission = document.querySelector("#textmission")

const ash = document.querySelector("#ash")

const kurt = document.querySelector("#kurt")
const bon = document.querySelector("#bon")

let findKurt = false;
let findBon = false;

const audio = document.querySelector("audio")
audio.volume = 0.1

const musicControl = document.querySelector(".music-control")

musicControl.addEventListener("click", (event) => {
    event.stopPropagation();

    event.target.src = `${event.target.src}`.includes("on.png")
        ? "icons/off.png"
        : "icons/on.png";

    `${event.target.src}`.includes('on.png') ? audio.play() : audio.pause()
})

reset.addEventListener("click", () => {
    window.location.reload();
    reset.style.display = "none"
})

function clearCharactersAndFinishGame() {
    ash.style.display = "none";
    kurt.style.display = "none";
    bon.style.display = "none";

    reset.style.display = "block";
    count.textContent = "";
    textmission.textContent ="";
}

let currentCount = 60;

const interval = setInterval(() => {
    if (currentCount <= 1) {
        game.style.backgroundImage = "url('assets/game-over.png')";

        clearCharactersAndFinishGame();
        clearInterval(interval);
    }

    currentCount--;
    count.textContent = currentCount;
}, 1000);

function finishGame() {
    if (findKurt && findBon) {
        clearCharactersAndFinishGame();

        const timeOut = setTimeout(() => {
            game.style.backgroundImage = "url('assets/winner.png')";

            clearInterval(interval);
            clearTimeout(timeOut);

            audio.pause();


        }, 800);
    }
}

function getRightPosition() {
    return parseInt(ash.style.right.split("px")) || 326
}


function getTopPosition() {
    return parseInt(ash.style.top.split("px")) || 140
}

function Cats(to) {

    finishGame();

    const catsRightPosition =
        to === "ArrowLeft"
            ? `${getRightPosition() - 64}px`
            : `${getRightPosition() + 64}px`;


    if (findKurt) {
        const newTopPosition = (to = "ArrowUp"
            ? `${getTopPosition() + 36}px`
            : `${getTopPosition() - 36}px`);

        kurt.style.right = catsRightPosition;
        kurt.style.top = newTopPosition;

    }

    if (findBon) {
        const newTopPosition = (to = "ArrowUp"
            ? `${getTopPosition() + 72}px`
            : `${getTopPosition() - 72}px`);

        bon.style.right = catsRightPosition;
        bon.style.top = newTopPosition;

    }

    if (
        getTopPosition() >= 474 &&
        getTopPosition() <= 594 &&
        getRightPosition() <= 138 &&
        getRightPosition() >= 42
    ) {
        bon.style.display = "block";
        findBon = true
        return;
    }

    if (
        getTopPosition() >= 296 &&
        getTopPosition() <= 530 &&
        getRightPosition() >= 600 &&
        getRightPosition() <= 680
    ) {
        kurt.style.display = "block";
        findKurt= true
        return;
    }
}

body.addEventListener("keydown", (event) => {
    event.stopPropagation();

    switch (event.code) {
        case 'ArrowLeft':
            if (getRightPosition() < 622) {
                ash.style.right = `${getRightPosition() + 8}px`;
                ash.src = "../assets/left.png";
            }


            break;

        case 'ArrowRight':
            if (getRightPosition() > 78) {
                ash.style.right = `${getRightPosition() - 8}px`;
                ash.src = "../assets/right.png";
            }

            break;
        case 'ArrowDown':
            if (getTopPosition() < 554) {
                ash.style.top = `${getTopPosition() + 8}px`;
                ash.src = "../assets/front.png";

                break;
            }

        case 'ArrowUp':
            if (getTopPosition() > 160) {
                ash.style.top = `${getTopPosition() - 8}px`;
                ash.src = "../assets/back.png";

                break;
            }

        default:
            break;
    }
    Cats();
})