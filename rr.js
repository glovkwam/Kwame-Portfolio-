class Box {
    constructor(x,z,w) {
        this.x = x * w
        this.z = z * w
        this.offset = sqrt(sq(x)+sq(z)) / 2
        this.width = w
    }
    height(f) {
      return sq(sin(-f + this.offset)) * this.width
    }
  
    render(f) {
      push()
        rotateX(spin.x)
        rotateY(spin.y)
        translate(this.x, this.height(f), this.z)
        box(this.width, 5 * this.width + 10 * this.height(f), this.width)
      pop()
    }
  }
  
  const boxes = []
  let speed
  let pointColor
  let ambientColor
  let materialColor
  let spin = {}
  let autospin
  
  function setup() {
    let cnv = createCanvas(400, 400, WEBGL)
    ortho(-200,200,-200,200,-800,800,0,1000)
    noStroke()
  
    const boxwidth = 15
    const cubecount = 7
    for (let z = -cubecount; z <= cubecount; z++) {
      for (let x = -cubecount; x <= cubecount; x++) {
        let b = new Box(x, z, boxwidth)
        boxes.push(b)
      }
    }
  
    speed = createSlider(1.5,12,5,0.001)
    pointColor = document.getElementById("pointColor")
    ambientColor = document.getElementById("ambientColor")
    materialColor = document.getElementById("materialColor")
  
    spin.x = -QUARTER_PI
    spin.y = QUARTER_PI
  
    autospin = createCheckbox("Autospin", false)
  }
  
  function draw() {
    background(240)
    pointLight(color(pointColor.value),800,-100,200)
    ambientLight(color(ambientColor.value))
    ambientMaterial(color(materialColor.value))
    let f = frameCount/sq(speed.value())
    for (let b of boxes) {
      b.render(f)
    }
    if (autospin.checked()) {
      spin.x = (spin.x + speed.value() / 200) % TAU
      spin.y = (spin.y + speed.value() / 282) % TAU
    }
  }
  
  function mouseDragged() {
    spin.y = (spin.y + (TAU * (mouseX - pmouseX)/width) * (sin(spin.x) < 0 ? 1 : -1)) % TAU
    spin.x = (spin.x - (TAU * (mouseY - pmouseY)/height)) % TAU
  }