let timer;
let milliseconds = 0;
let isRunning = false;

function formatTime(ms) {
    let hrs = Math.floor(ms / 3600000);
    let mins = Math.floor((ms % 3600000) / 60000);
    let secs = Math.floor((ms % 60000) / 1000);
    let msec = ms % 1000;

    return (
        String(hrs).padStart(2, '0') + ":" +
        String(mins).padStart(2, '0') + ":" +
        String(secs).padStart(2, '0') + ":" +
        String(msec).padStart(3, '0')
    );
}

function start() {
    if (!isRunning) {
        isRunning = true;

        timer = setInterval(() => {
            milliseconds += 10;
            document.getElementById("display").innerText =
                formatTime(milliseconds);
        }, 10);
    }
}

function pause() {
    isRunning = false;
    clearInterval(timer);
}

function reset() {
    pause();
    milliseconds = 0;
    document.getElementById("display").innerText = "00:00:00:000";
}

function lap() {
    if (isRunning) {
        let lapTime = formatTime(milliseconds);

        let li = document.createElement("li");
        li.innerText = lapTime;

        document.getElementById("laps").appendChild(li);

        saveLaps();
        updateCount();
    }
}

function clearLaps() {
    document.getElementById("laps").innerHTML = "";
    localStorage.removeItem("laps");
    updateCount();
}

function updateCount() {
    let count = document.getElementById("laps").children.length;
    document.getElementById("lapCount").innerText = count;
}

function toggleMode() {
    document.body.classList.toggle("dark");
}

document.addEventListener("keydown", function (e) {
    if (e.key.toLowerCase() === "s") start();
    if (e.key.toLowerCase() === "p") pause();
    if (e.key.toLowerCase() === "r") reset();
    if (e.key.toLowerCase() === "l") lap();
});

function saveLaps() {
    let laps = [];
    document.querySelectorAll("#laps li").forEach(li => {
        laps.push(li.innerText);
    });

    localStorage.setItem("laps", JSON.stringify(laps));
}

function loadLaps() {
    let saved = JSON.parse(localStorage.getItem("laps")) || [];

    saved.forEach(time => {
        let li = document.createElement("li");
        li.innerText = time;
        document.getElementById("laps").appendChild(li);
    });

    updateCount();
}

window.onload = loadLaps;
