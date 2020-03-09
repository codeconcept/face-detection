// @ts-nocheck
const fileUpload = document.getElementById("fileUpload");
fileUpload.addEventListener("change", getImage, false);
const uploadedImageDiv = document.getElementById("uploadedImage");

const MODEL_URL = "./models";
let modelsLoaded = [];

faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL).then(() => {
  console.log("tinyFaceDetector loaded");
  modelsLoaded = [...modelsLoaded, "tinyFaceDetector loaded"];
});

faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL).then(() => {
  console.log("ssdMobilenetv1 loaded");
  modelsLoaded = [...modelsLoaded, "ssdMobilenetv1 loaded"];
});

function getImage() {
  console.log("images", this.files[0]);
  const imageToProcess = this.files[0];

  // display uploaded image
  let newImg = new Image(imageToProcess.width, imageToProcess.height);
  newImg.src = imageToProcess;
  newImg.src = URL.createObjectURL(imageToProcess);
  uploadedImageDiv.appendChild(newImg);

  processImage(newImg);
}

function processImage(image) {
  if (modelsLoaded.length !== 2) {
    console.log("please wait while: models are still loading");
    return;
  }
  console.log("ready!");
  faceapi.detectAllFaces(image).then(facesDetected => {
    console.log("detectAllFaces facesDetected", facesDetected);
    // to make sure displayed image size and original image size match
    facesDetected = faceapi.resizeResults(facesDetected);
    faceapi.draw.drawDetections(canvas, facesDetected);
  });
}
