const kickSelect = document.querySelector("#kickSelect");
const snareSelect = document.querySelector("#snareSelect");
const hihatSelect = document.querySelector("#hihatSelect")


//Option Start
kickSongs.forEach((songs,index)=>{
    kickSelect.insertAdjacentHTML("beforeend",`<option value="${songs.path}">${songs.name}</option>`)
})

snareSongs.forEach((songs,index)=>{
    snareSelect.insertAdjacentHTML("beforeend",`<option value="${songs.path}">${songs.name}</option>`)
})

hihatSongs.forEach((songs,index)=>{
    hihatSelect.insertAdjacentHTML("beforeend",`<option value="${songs.path}">${songs.name}</option>`)
})
//Option End

class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.play = document.querySelector(".play");
        this.index = 0;
        this.bpm = 120;
    }

    activePads(){
        this.classList.toggle("active");
    }

    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        activeBars.forEach(bar=>{
            bar.style.animation=`playTrack 0.5s alternate ease-in-out 2`;

            //adding sound if pads are active
            if(bar.classList.contains("active")){
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains("snare-pad")){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        })
        
        this.index++;
    }
    start(){
        const interval = (60 / this.bpm) * 1000;
        setInterval(()=>{
            this.repeat();
        },interval)
    }
}

const drumkit = new DrumKit();

drumkit.pads.forEach((pad)=>{
    pad.addEventListener("click",drumkit.activePads);
    pad.addEventListener("animationend",function(){
        this.style.animation = "";
    })
})

drumkit.play.addEventListener("click",()=>{
    drumkit.start();
})