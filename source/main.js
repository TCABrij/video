const video = document.querySelector('.item1 video')
const img = document.querySelector('.item2 img')
const startWebCamBtn = document.querySelector('.start-webcam-btn')
const captureBtn = document.querySelector('.disabled-btn')

startWebCamBtn.addEventListener('click', webCam)
captureBtn.addEventListener('click', takeSnap)

function webCam(){

    if(navigator.mediaDevices.getUserMedia){
       navigator.mediaDevices.getUserMedia({video: true})
       .then( (stream)=>{
           video.srcObject = stream
           captureBtn.classList.remove('disabled-btn')
       })
    }

}

function takeSnap(){

    //  Canvas
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.style.height = video.style.height
    canvas.style.width = video.style.width
    
    // drawing image to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // convert image to png/jpg
    const dataURI = canvas.toDataURL("image/png")

    // setting image to img tag
    img.src = dataURI
    
}