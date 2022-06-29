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