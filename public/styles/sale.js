function updateCountdown() {
  const targetDate = new Date("2023-12-31 00:00:00").getTime();
  const currentDate = new Date().getTime();
  const timeLeft = targetDate - currentDate;

  if (timeLeft <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
  } else {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = formatTime(days);
    document.getElementById("hours").textContent = formatTime(hours);
    document.getElementById("minutes").textContent = formatTime(minutes);
    document.getElementById("seconds").textContent = formatTime(seconds);
  }
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

setInterval(updateCountdown, 1000);
updateCountdown();

var x = document.getElementById("myAudio");

function playAudio() {
  x.play();
}

function pauseAudio() {
  x.pause();
}
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));
}
