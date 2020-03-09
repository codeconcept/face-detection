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
  console.log("newImg", newImg, newImg.width, newImg.height);
  newImg.src = imageToProcess;
  newImg.src = URL.createObjectURL(imageToProcess);
  uploadedImageDiv.appendChild(newImg);
  newImg.addEventListener("load", () => {
    console.log("img loaded", newImg.width, newImg.height);
    const imageDimensions = { width: newImg.width, height: newImg.height };
    const data = {
      image: newImg,
      imageDimensions
    };
    processImage(data);
  });
}

function processImage({ image, imageDimensions }) {
  if (modelsLoaded.length !== 2) {
    console.log("please wait while: models are still loading");
    return;
  }
  console.log("ready!", image, imageDimensions);

  const canvas = faceapi.createCanvasFromMedia(image);
  console.log("canvas", canvas);

  uploadedImageDiv.appendChild(canvas);
  canvas.style.position = "absolute";
  canvas.style.top = uploadedImageDiv.firstChild.y + "px";
  canvas.style.left = uploadedImageDiv.firstChild.x + "px";

  faceapi.detectAllFaces(image).then(facesDetected => {
    console.log("detectAllFaces facesDetected", facesDetected);
    // to make sure displayed image size and original image size match
    facesDetectedImage = faceapi.resizeResults(image, {
      height: imageDimensions.height,
      width: imageDimensions.width
    });
    console.log("after resize", facesDetected);

    facesDetected.map(face => {
      faceapi.draw.drawDetections(canvas, face);
    });
  });
}
