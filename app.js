console.log("hello world");
console.log("faceapi.nets", faceapi.nets);
const fileUpload = document.getElementById("fileUpload");
fileUpload.addEventListener("change", getImage, false);

const MODEL_URL = "./models";

faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL).then(() => {
  console.log("model loaded");
  const res = faceapi.detectAllFaces();
  console.log(res, res);
});

function getImage() {
  console.log("images", this.files[0]);
}
