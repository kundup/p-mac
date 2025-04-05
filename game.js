canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

const width = canvas.width = 500;
const height = canvas.height = 500;

context.fillStyle = "red";
context.fillRect(0, 0, width, height);