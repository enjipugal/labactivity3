let stars = 0;
let completedMissions = [];
let currentTopic = null;

let quickTimer = null;
let quickTime = 10;

const missions = {

    numbers: {

        mission: "MISSION 01",

        icon: "🔢",

        title: "Number Power",

        question: "Which number comes after 6?",

        options: [
            "5",
            "7",
            "9"
        ],

        answer: "7"

    },

    addition: {

        mission: "MISSION 02",

        icon: "➕",

        title: "Add Attack",

        question: "What is 2 + 3?",

        options: [
            "4",
            "5",
            "6"
        ],

        answer: "5"

    },


    subtraction: {

        mission: "MISSION 03",

        icon: "➖",

        title: "Take-Away Smash",

        question: "What is 5 − 2?",

        options: [
            "2",
            "3",
            "4"
        ],

        answer: "3"

    },

    shapes: {

        mission: "MISSION 04",

        icon: "🔺",

        title: "Shape Hunter",

        question: "Which shape has 3 sides?",

        options: [
            "🔵 Circle",
            "🔺 Triangle",
            "🟩 Square"
        ],

        answer: "🔺 Triangle"

    },

    patterns: {

        mission: "MISSION 05",

        icon: "🔁",

        title: "Pattern Power",

        question: "What comes next? 🔴 🔵 🔴 🔵 ?",

        options: [
            "🔴 Red",
            "🟢 Green",
            "🟡 Yellow"
        ],

        answer: "🔴 Red"

    }

};

const navStars =
    document.getElementById("navStars");

const rewardStars =
    document.getElementById("rewardStars");

const completedCount =
    document.getElementById("completedCount");

const progressFill =
    document.getElementById("progressFill");

const progressRocket =
    document.getElementById("progressRocket");

const rewardMessage =
    document.getElementById("rewardMessage");

const modal =
    document.getElementById("missionModal");

const modalClose =
    document.getElementById("modalClose");

const modalIcon =
    document.getElementById("modalIcon");

const modalMission =
    document.getElementById("modalMission");

const modalTitle =
    document.getElementById("modalTitle");

const modalQuestion =
    document.getElementById("modalQuestion");

const answerGrid =
    document.getElementById("answerGrid");

const answerFeedback =
    document.getElementById("answerFeedback");

const starPopup =
    document.getElementById("starPopup");

const quickQuestion =
    document.getElementById("quickQuestion");

const quickOptions =
    document.getElementById("quickOptions");

const quickFeedback =
    document.getElementById("quickFeedback");

const timerDisplay =
    document.getElementById("timer");

function updateStars() {

    navStars.textContent = stars;

    rewardStars.textContent = stars;

    updateBadges();

}

function addStars(amount) {

    stars += amount;

    updateStars();

    showStarPopup(amount);

}

function showStarPopup(amount) {

    starPopup.textContent =
        `⭐ +${amount} STARS!`;

    starPopup.classList.remove("show");

    void starPopup.offsetWidth;

    starPopup.classList.add("show");

}

function updateBadges() {

    const badge1 =
        document.getElementById("badge1");

    const badge2 =
        document.getElementById("badge2");

    const badge3 =
        document.getElementById("badge3");


    if (stars >= 10) {

        badge1.classList.add("unlocked");

    }


    if (stars >= 30) {

        badge2.classList.add("unlocked");

    }


    if (stars >= 50) {

        badge3.classList.add("unlocked");

    }


    if (stars === 0) {

        rewardMessage.textContent =
            "Start a mission to earn stars!";

    }

    else if (stars < 30) {

        rewardMessage.textContent =
            "Great start! Keep blasting! 🚀";

    }

    else if (stars < 50) {

        rewardMessage.textContent =
            "Amazing! You're becoming a Math Blaster! 🌟";

    }

    else {

        rewardMessage.textContent =
            "WOW! You're a Math Blast Hero! 🏆";

    }

}

function openMission(topic) {

    const mission =
        missions[topic];

    if (!mission) {
        return;
    }


    currentTopic = topic;


    modalIcon.textContent =
        mission.icon;

    modalMission.textContent =
        mission.mission;

    modalTitle.textContent =
        mission.title;

    modalQuestion.textContent =
        mission.question;


    answerFeedback.textContent = "";

    answerFeedback.style.color =
        "#14245f";


    answerGrid.innerHTML = "";


    mission.options.forEach(option => {

        const button =
            document.createElement("button");


        button.type = "button";

        button.className =
            "answer-button";

        button.textContent =
            option;


        button.addEventListener(
            "click",
            () => checkMissionAnswer(
                option,
                button
            )
        );


        answerGrid.appendChild(button);

    });


    modal.classList.add("show");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

}

function checkMissionAnswer(
    selectedAnswer,
    button
) {

    const mission =
        missions[currentTopic];


    if (!mission) {
        return;
    }


    if (
        selectedAnswer ===
        mission.answer
    ) {

        button.classList.add("correct");


        answerFeedback.textContent =
            "🎉 CORRECT! You're blasting through math!";


        answerFeedback.style.color =
            "#20c978";


        if (
            !completedMissions.includes(
                currentTopic
            )
        ) {

            completedMissions.push(
                currentTopic
            );

            addStars(10);

            updateMissionProgress();

        }


        disableAnswerButtons();


        createConfetti();


        setTimeout(() => {

            closeMission();

        }, 1100);

    }

    else {

        button.classList.add("wrong");


        answerFeedback.textContent =
            "💡 Almost! Try another answer!";


        answerFeedback.style.color =
            "#ff3f81";


        setTimeout(() => {

            button.classList.remove("wrong");

        }, 500);

    }

}

function disableAnswerButtons() {

    const buttons =
        answerGrid.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(button => {

        button.disabled = true;

    });

}

function closeMission() {

    modal.classList.remove("show");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    currentTopic = null;

}

const missionButtons =
    document.querySelectorAll(
        ".mission-card"
    );


missionButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const topic =
                button.dataset.topic;

            openMission(topic);

        }
    );

});

modalClose.addEventListener(
    "click",
    closeMission
);

modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeMission();

        }

    }
);

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {

            closeMission();

        }

    }
);

function updateMissionProgress() {

    const completed =
        completedMissions.length;


    completedCount.textContent =
        completed;


    const percentage =
        (completed / 5) * 100;


    progressFill.style.width =
        `${percentage}%`;


    const rocketPosition =
        Math.min(
            percentage,
            94
        );


    progressRocket.style.left =
        `calc(${rocketPosition}% - 18px)`;


    if (completed === 5) {

        rewardMessage.textContent =
            "🏆 ALL MISSIONS COMPLETE! MATH BLAST HERO!";

    }

}

function createConfetti() {

    const symbols = [
        "⭐",
        "✨",
        "🎉",
        "🌟",
        "🚀",
        "💥"
    ];


    for (
        let i = 0;
        i < 18;
        i++
    ) {

        const piece =
            document.createElement("div");


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.position =
            "fixed";

        piece.style.left =
            "50%";

        piece.style.top =
            "45%";

        piece.style.fontSize =
            `${18 + Math.random() * 18}px`;

        piece.style.pointerEvents =
            "none";

        piece.style.zIndex =
            "5000";


        document.body.appendChild(
            piece
        );


        const x =
            (Math.random() - .5) *
            500;

        const y =
            (Math.random() - .5) *
            400;


        piece.animate(

            [
                {
                    transform:
                        "translate(-50%, -50%) scale(.4)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(360deg) scale(1.3)`,
                    opacity: 0
                }
            ],

            {
                duration:
                    900 +
                    Math.random() * 500,

                easing:
                    "cubic-bezier(.2,.7,.3,1)"
            }

        );


        setTimeout(
            () => piece.remove(),
            1500
        );

    }

}

let quickAnswer = 5;

function createQuickQuestion() {

    clearInterval(
        quickTimer
    );


    const first =
        Math.floor(
            Math.random() * 5
        ) + 1;


    const second =
        Math.floor(
            Math.random() * 5
        ) + 1;


    quickAnswer =
        first + second;


    quickQuestion.textContent =
        `What is ${first} + ${second}?`;


    const wrongOne =
        Math.max(
            1,
            quickAnswer - 1
        );


    const wrongTwo =
        quickAnswer + 1;


    let answers = [
        quickAnswer,
        wrongOne,
        wrongTwo
    ];


    answers =
        answers.sort(
            () => Math.random() - .5
        );


    quickOptions.innerHTML =
        "";


    answers.forEach(answer => {

        const button =
            document.createElement(
                "button"
            );


        button.type = "button";

        button.className =
            "quick-option";

        button.textContent =
            answer;


        button.addEventListener(
            "click",
            () => {

                checkQuickAnswer(
                    answer,
                    button
                );

            }
        );


        quickOptions.appendChild(
            button
        );

    });


    quickFeedback.textContent =
        "";


    startQuickTimer();

}

function startQuickTimer() {

    quickTime = 10;

    timerDisplay.textContent =
        quickTime;


    quickTimer =
        setInterval(() => {

            quickTime--;

            timerDisplay.textContent =
                quickTime;


            if (
                quickTime <= 0
            ) {

                clearInterval(
                    quickTimer
                );


                quickFeedback.textContent =
                    "⏰ Time's up! Try another blast!";


                quickFeedback.style.color =
                    "#ff3f81";


                setTimeout(
                    createQuickQuestion,
                    1000
                );

            }

        }, 1000);

}

function checkQuickAnswer(
    answer,
    button
) {

    clearInterval(
        quickTimer
    );


    if (
        answer === quickAnswer
    ) {

        button.style.background =
            "#20c978";


        quickFeedback.textContent =
            "🚀 BLAST OFF! +5 STARS!";


        quickFeedback.style.color =
            "#20c978";


        addStars(5);

        createConfetti();


        setTimeout(
            createQuickQuestion,
            1000
        );

    }

    else {

        button.style.background =
            "#ff3f81";


        quickFeedback.textContent =
            "💡 Not quite! Try again!";


        quickFeedback.style.color =
            "#ff3f81";


        startQuickTimer();

    }

}

updateStars();

updateMissionProgress();

createQuickQuestion();