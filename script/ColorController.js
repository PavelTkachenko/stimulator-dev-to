class ColorController extends Controller {
  mix() {
    const r = this.redTarget.value;
    const g = this.greenTarget.value;
    const b = this.blueTarget.value;
    
    this.resultTarget.style.background = `rgb(${r},${g}, ${b})`;
  }

  random() {
    this.redTarget.value = this.randomInt(0, 255);
    this.greenTarget.value = this.randomInt(0, 255);
    this.blueTarget.value = this.randomInt(0, 255);

    this.mix();
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
