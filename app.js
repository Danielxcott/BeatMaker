const kickSelect = document.querySelector("#kickSelect");
const snareSelect = document.querySelector("#snareSelect");
const hihatSelect = document.querySelector("#hihatSelect");
//Option Start
kickSongs.forEach((songs, index) => {
  kickSelect.insertAdjacentHTML(
    "beforeend",
    `<option value="${songs.path}">${songs.name}</option>`
  );
});

snareSongs.forEach((songs, index) => {
  snareSelect.insertAdjacentHTML(
    "beforeend",
    `<option value="${songs.path}">${songs.name}</option>`
  );
});

hihatSongs.forEach((songs, index) => {
  hihatSelect.insertAdjacentHTML(
    "beforeend",
    `<option value="${songs.path}">${songs.name}</option>`
  );
});
//Option End

class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.play = document.querySelector(".play");
    this.muteBtn = document.querySelectorAll(".mute");
    this.selects = document.querySelectorAll("select");
    this.index = 0;
    this.bpm = 120;
    this.isPlaying = null;
  }

  activePads() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.5s alternate ease-in-out 2`;

      //adding sound if pads are active
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });

    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    //fix play button
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }

  //change the text button
  updateBtn() {
    if (!this.isPlaying) {
      this.play.innerText = "Play";
      this.play.classList.remove("active");
    } else {
      this.play.innerText = "Stop";
      this.play.classList.add("active");
    }
  }

  //update the select options depend on user's choose
  updateSong(e) {
    let selectName = e.target.name;
    const selectValue = e.target.value;
    switch (selectName) {
      case "kick-select":
        this.kickAudio.src = selectValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectValue;
        break;
    }
  }

  //mute the audio;
  muteAudio(e){
    const track = e.target.getAttribute("data-track");
    e.target.classList.toggle('active');
    if(e.target.classList.contains("active")){
        switch(track){
            case "0":
            this.kickAudio.volume = 0;
            break;
            case "1":
            this.snareAudio.volume = 0;
            break;
            case "2":
            this.hihatAudio.volume = 0;
            break;
        }
    }else{
        switch(track){
            case "0":
            this.kickAudio.volume = 1;
            break;
            case "1":
            this.snareAudio.volume = 1;
            break;
            case "2":
            this.hihatAudio.volume = 1;
            break;
        }
    }
  }
}

const drumkit = new DrumKit();

drumkit.pads.forEach((pad) => {
  pad.addEventListener("click", drumkit.activePads);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumkit.play.addEventListener("click", () => {
  drumkit.start();
  drumkit.updateBtn();
});

drumkit.selects.forEach((select) => {
  select.addEventListener("change", (e) => {
    drumkit.updateSong(e);
  });
});

drumkit.muteBtn.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        drumkit.muteAudio(e);
    })
})
