(function() {

    let video;
    let durationControl;
    let soundControl;
    let intervalId;
    let soundLevel;

    const playBtn = document.querySelector(".video__btn");
    const soundBtn = document.getElementById("mic");
    const playerPlayBtn = document.querySelector(".duration__btn")

    video = document.getElementById("player");

    video.addEventListener("loadeddata", function() {

        video.addEventListener("click", playStop);

        let playButtons = document.querySelectorAll(".play");
        for (let i = 0; i < playButtons.length; i++) {
            playButtons[i].addEventListener("click", playStop);
        }

        durationControl = document.getElementById("durationLevel");
        durationControl.min = 0;
        durationControl.value = 0;
        durationControl.max = video.duration;
        durationControl.addEventListener("input", setVideoTime);


        soundBtn.addEventListener("click", soundOf);
        soundControl = document.getElementById("soundLevel");

        soundControl.min = 0;
        soundControl.max = 10;
        soundControl.value = soundControl.max;
        soundControl.addEventListener('input', changeSoundVolume);

    })

    video.addEventListener("ended", function() {
        playBtn.classList.toggle("video__btn--active");
        video.currentTime = 0;
        playerPlayBtn.classList.remove("duration__btn--active");


    })


    function playStop() {

        playBtn.classList.toggle("video__btn--active")
        if (video.paused) {
            video.play();
            playerPlayBtn.classList.add("duration__btn--active");
            intervalId = setInterval(updateTime, 1000 / 60);
        } else {
            video.pause();
            playerPlayBtn.classList.remove("duration__btn--active");
            clearInterval(intervalId);
        }
    }

    function setVideoTime() {
        video.currentTime = durationControl.value;
        updateTime();
    }

    function updateTime() {
        durationControl.value = video.currentTime;
        const step = video.duration / 100;
        const percent = video.currentTime / step;

        durationControl.style.background = `linear-gradient(90deg, #FEDB3F 0%, #FEDB3F ${percent}%, #626262 ${percent}%)`;

    }

    function soundOf() {


        if (video.volume == 0) {
            video.volume = soundLevel;
            soundControl.value = soundLevel * 10;
            soundBtn.classList.remove("sound__btn--active");
        } else {
            soundLevel = video.volume;
            video.volume = 0;
            soundControl.value = 0;
            soundBtn.classList.add("sound__btn--active");
        }
    }


    function changeSoundVolume() {
        video.volume = soundControl.value / 10;


        if (video.volume == 0) {
            soundBtn.classList.add('sound__btn--active');
        } else {
            soundBtn.classList.remove('sound__btn--active');
        }


    }

})()