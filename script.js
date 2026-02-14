const textElement = document.getElementById("text");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const initialButtons = document.getElementById("initialButtons");
const giftContainer = document.getElementById("giftContainer");
const gif = document.querySelector(".gif-container img");

let chaseCount = 0;
let typingSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
let magicSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3");

const gifs = {
    default: "images/standard.png",
    yes: "images/yes.png",
    gift: "images/gift.png",
    no:"images/no.png"
};

/* Typing effect */
function typeText(message, callback = null) {
    textElement.innerHTML = "";
    let index = 0;

    let interval = setInterval(() => {
        textElement.innerHTML += message[index];
        typingSound.currentTime = 0;
        typingSound.play();
        index++;

        if (index >= message.length) {
            clearInterval(interval);
            if (callback) setTimeout(callback, 500);
        }
    }, 40);
}

/* Check if YES was already clicked */
if (localStorage.getItem("valentineYes") === "true") {
    initialButtons.style.display = "none";
    giftContainer.classList.add("show");
    typeText("* Choose your gift. 🎁");
    gif.src = gifs.gift;
} else {
    gif.src = gifs.default;
    typeText("* Will you be my Valentine? 💗");
}

/* NO chase */
noBtn.addEventListener("mouseover", function() {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

    chaseCount++;
    if (chaseCount > 5) {
        gif.src = gifs.no;
        typeText("* Stop chasing that. It's not gonna work. 💅");
    }
});

/* YES clicked */
yesBtn.addEventListener("click", () => {
    localStorage.setItem("valentineYes", "true");
    initialButtons.style.display = "none";
    gif.src = gifs.yes;

    typeText("* You said YES... 💖✨", () => {
        gif.src = gifs.gift;
        typeText("* Choose your gift. 🎁", () => {
            magicSound.play();
            giftContainer.classList.add("show");
        });
    });
});

/* Gift buttons open separate pages */
function chooseGift(number) {
    // Play magical sound
    const magicSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3");
    magicSound.play();

    // Fade out body
    document.body.style.transition = "opacity 0.7s ease";
    document.body.style.opacity = 0;

    // Navigate after fade
    setTimeout(() => {
        window.location.href = `gift${number}.html`;
    }, 700); // matches the fade duration
}
