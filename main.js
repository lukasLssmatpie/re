let statusModel = false;
let img;

function preload() {
  img = loadImage('caminho/para/sua/imagem.jpg'); // Carregue sua imagem aqui
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  image(img, 0, 0, width, height);

  statusElement = select('#status'); // Elemento HTML para o status

  // Inicialização do modelo COCO-SSD
  cocoSsd.load().then(modelLoaded);
  statusElement.html('Detectando Objetos...');
}

function modelLoaded() {
  statusModel = true;
  detectObjects();
}

function detectObjects() {
  // Executar o modelo COCO-SSD na imagem
  cocoSsd.detect(img).then(gotResults);
}

function gotResults(results) {
  // Processar os resultados obtidos pelo modelo COCO-SSD
  for (let i = 0; i < results.length; i++) {
    let object = results[i];
    noFill();
    stroke(255);
    strokeWeight(2);
    rect(object.bbox[0], object.bbox[1], object.bbox[2], object.bbox[3]);
    noStroke();
    fill(255);
    textSize(16);
    text(object.class, object.bbox[0], object.bbox[1] - 5);
  }
}
