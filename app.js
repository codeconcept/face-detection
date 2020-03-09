// @ts-nocheck
console.log("hello world");
console.log("faceapi.nets", faceapi.nets);
const fileUpload = document.getElementById("fileUpload");
fileUpload.addEventListener("change", getImage, false);
const uploadedImageDiv = document.getElementById("uploadedImage");

const MODEL_URL = "./models";

faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL).then(() => {
  console.log("model loaded");
  const res = faceapi.detectAllFaces();
  console.log(res, res);
});

function getImage() {
  console.log("images", this.files[0]);
  const imageToProcess = this.files[0];

  // display uploaded image
  let newImg = new Image(imageToProcess.width, imageToProcess.height);
  newImg.src = imageToProcess;
  newImg.src = URL.createObjectURL(imageToProcess);
  uploadedImageDiv.style.border = "4px solid #FCB514";
  uploadedImageDiv.appendChild(newImg);

  processImage(imageToProcess);
}

function processImage(image) {
  // TODO
}
