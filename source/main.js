const video = document.querySelector('video')
const img = document.querySelector('.image')
const startWebCamBtn = document.querySelector('.start-webcam-btn')
const captureBtn = document.querySelector('.disabled-btn')
var tempURI = ""

startWebCamBtn.addEventListener('click', webCam)
captureBtn.addEventListener('click', takeSnap)
video.addEventListener('click', fullScreen)

function webCam(){

    if(navigator.mediaDevices.getUserMedia){
       navigator.mediaDevices.getUserMedia({video: true})
       .then( (stream)=>{
           video.srcObject = stream

           // storing Stream so that can be used in modal 
           tempURI = stream

           captureBtn.classList.remove('disabled-btn')
       })
    }

}

function takeSnap(){

    //  Canvas
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
   
    
    // drawing image to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // convert image to png/jpg
    const dataURI = canvas.toDataURL("image/png")

    // setting image to img tag
    img.src = dataURI
    const date = new Date()
    const timeAndDate = (`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`)
    document.querySelector('figcaption').innerText = timeAndDate
    
}

function fullScreen(e){
   const modal = document.querySelector('.modal')
   const closeBtn = document.querySelector('.close-modal-btn')
   const modalVideo = document.querySelector('.modal video')

    modalVideo.srcObject = tempURI
   
   modal.classList.remove('modal-hidden')
   
   closeBtn.addEventListener('click', ()=>{
      modal.classList.add('modal-hidden')
   })
   modal.addEventListener('click', ()=>{
      modal.classList.add('modal-hidden')
   })
}