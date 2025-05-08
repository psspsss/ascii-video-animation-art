// const density = `              @B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`     ;
const density = "         ZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<> ";




const video = document.getElementById("video");
const asciiDiv = document.getElementById("ascii");

// Set video properties
video.width = 100vh; // Adjust the resolution for ASCII art
video.height = 80vh; 
video.play();

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = video.width;
canvas.height = video.height;

function convertToASCII() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data, width, height } = imageData;
  
  let asciiImage = "";

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const offset = (y * width + x) * 4;
      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];
      const avg = (r + g + b) / 3;

      const charIndex = Math.floor((avg / 255) * (density.length - 1));
      const c = density.charAt(charIndex);
      asciiImage += c === " " ? "&nbsp;" : c;
    }
    asciiImage += "<br/>";
  }

  asciiDiv.innerHTML = asciiImage;
}

function loop() {
  convertToASCII();
  requestAnimationFrame(loop);
}

video.addEventListener("play", () => {
  loop();
});
