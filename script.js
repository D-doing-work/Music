const mainCard = document.querySelector("#ContentWarpper");
const songImg = document.querySelector("#SongImg");
const controlButtons = document.querySelector(".control");
const currentYear = new Date().getFullYear();

const playPauseButton = document.querySelector("#PausePlay");
const audio = document.querySelector("audio");
const artist = document.querySelector("#Artist");
const songName = document.querySelector("#SongName");
const previousButton = document.querySelector("#Previous");
const nextButton = document.querySelector("#Next");
const songImgAtTheTop = document.querySelector("img");

let startDuration = document.querySelector("#Start");
const endDuration = document.querySelector("#End");
const meter = document.querySelector("#ProgrssMeterChild");
const progressBar = document.querySelector("#ProgressMeterContainer");

let isPlaying = false;
let index = 0;

const songDataBase = [
  {
    songSrc: "./music/I See the Light lyrics.mp3",
    title: "I see the Light",
    artist: "Tangled",
    imgSrc: "./img/tangled.png",
  },
  {
    songSrc: "./music/FIFTY FIFTY - Cupid (Twin Version) (Lyrics).mp3",
    title: "Cupid",
    artist: "FIFTY FIFTY",
    imgSrc: "./img/cupid.png",
  },
  {
    songSrc: "./music/Lenka - The Show (lyrics).mp3",
    title: "The Show",
    artist: "Lenka",
    imgSrc: "./img/show.png",
  },
  {
    songSrc: "./music/[LYRIC] 수란 (Suran)  Heartbeat (Han-Rom-Eng).mp3",
    title: "Heartbeat",
    artist: "Suran",
    imgSrc: "./img/heartbeat.png",
  },
  {
    songSrc: "./music/Shining Friends.mp3",
    title: "Shining Friends",
    artist: "Fiona Fung",
    imgSrc: "./img/shining.gif",
  },
  {
    songSrc: "./music/Taylor Swift - You Belong With Me.mp3",
    title: "You Belong with Me",
    artist: "Taylor Swift",
    imgSrc: "./img/belong.png",
  },
  {
    songSrc: "./music/Learn To Meow (Official EDM Ver.) [学猫叫] - Wengie, XiaoPanPan, XiaoFengFeng (Say Meow Meow).mp3",
    title: "Learn to Meow",
    artist: "Wengie, XiaoPanPan, XiaoFengFeng",
    imgSrc: "./img/meow.png",
  },
  {
    songSrc: "./music/Rewrite The Stars.mp3",
    title: "Rewrite The Stars",
    artist: "Zendaya and Zac Efron",
    imgSrc: "./img/star.png",
  },
  {
    songSrc: "./music/Hayd - Changes.mp3",
    title: "Changes",
    artist: "Hayd",
    imgSrc: "./img/water.png",
  },
  {
    songSrc: "./music/Beauty and the Beast - Tales as Old as Time.mp3",
    title: "Tales as Old as Time",
    artist: "Beauty and the Beast",
    imgSrc: "./img/tales.png",
  },
];

const loadMusic = () => {
  audio.src = songDataBase[index].songSrc;
  artist.textContent = songDataBase[index].artist;
  songName.textContent = songDataBase[index].title;
  songImgAtTheTop.src = songDataBase[index].imgSrc;
};
audio.addEventListener("ended", () => {
  loadMusic(index++);
  play();
});

loadMusic();

nextButton.addEventListener("click", () => {
  if (index < songDataBase.length - 1) {
    loadMusic(index++);
    play();
  } else {
    pause();
  }
});
previousButton.addEventListener("click", () => {
  if (index > 0) {
    loadMusic(index--);
    play();
  } else {
    pause();
  }
});

const play = () => {
  isPlaying = true;
  audio.play();
  playPauseButton.classList.replace("fa-play", "fa-pause");
  songImg.classList.add("anime");
};
const pause = () => {
  isPlaying = false;
  audio.pause();
  playPauseButton.classList.replace("fa-pause", "fa-play");
  songImg.classList.remove("anime");
};

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});
let minute, second;
const timeStamp = (event) => {
  let { duration, currentTime } = event.srcElement;
  const full_second = Math.floor(duration % 60);
  const full_minute = Math.floor(duration / 60);
  const start_second = Math.floor(currentTime % 60);
  const start_minute = Math.floor(currentTime / 60);
  const totalDuration = `${full_minute} : ${full_second}`;
  const currenDuration = `${start_minute} : ${start_second}`;
  if (duration) {
    endDuration.textContent = totalDuration;
  }
  startDuration.textContent = currenDuration;
  const percentage = (currentTime / duration) * 100;
  meter.style.width = `${percentage}%`;
};
audio.addEventListener("timeupdate", timeStamp);
progressBar.addEventListener("click", (event) => {
  const { duration } = audio;
  const moreProgress =
    (event.offsetX / event.srcElement.clientWidth) * duration;
  audio.currentTime = moreProgress;
});

document.querySelector("#Year").innerHTML = currentYear;

mainCard.addEventListener("mouseover", (event) => {
  const xAxis = (window.innerWidth / 2 - event.pageX) / 15;
  const yAxis = (window.innerHeight / 2 - event.pageY) / 15;
  mainCard.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
  songImg.style.transform = `rotate(${xAxis}deg)`;
  controlButtons.style.transform = `rotate(${xAxis}deg)`;
});
mainCard.addEventListener("mouseleave", () => {
  mainCard.style.transform = "rotateX(0deg) rotateY(0deg)";
  songImg.style.transform = "rotate(0deg)";
  controlButtons.style.transform = "rotate(0deg)";
});
