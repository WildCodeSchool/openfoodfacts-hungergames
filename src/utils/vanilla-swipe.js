/* eslint-disable no-restricted-properties */
function unify(e) {
  return e.changedTouches ? e.changedTouches[0] : e;
}

const NF = 30;

class VanillaSwipe {
  constructor(_C) {
    this.container = _C;
    this.TFN = {
      //  can remove these if not used
      // linear: function(k) {
      //   return k;
      // },
      // "ease-in": function(k, e = 1.675) {
      //   return Math.pow(k, e);
      // },
      "ease-out": function(k, e = 3.675) {
        return 1 - Math.pow(1 - k, e);
      },
      // "ease-in-out": function(k) {
      //   return 0.5 * (Math.sin((k - 0.5) * Math.PI) + 1);
      // },
      // "bounce-out": (k, a = 2.75, b = 1.5) =>
      //   1 -
      //   Math.pow(1 - k, a) *
      //     Math.abs(Math.cos(Math.pow(k, b) * (this.n + 0.5) * Math.PI)),
    };

    this.size = this.size.bind(this);
    this.lock = this.lock.bind(this);
    this.drag = this.drag.bind(this);
    this.move = this.move.bind(this);
    this.keyup = this.keyup.bind(this);

    this.size();
    this.bindEventListeners();
    this.refreshNumImages();
  }

  stopAni() {
    cancelAnimationFrame(this.rID);
    this.rID = null;
  }

  ani(cf = 0) {
    this.container.style.setProperty(
      "--i",
      this.ini + (this.fin - this.ini) * this.TFN["ease-out"](cf / this.anf)
    );

    if (cf === this.anf) {
      this.stopAni();
      if (typeof this.onChangeIndex === "function") {
        this.onChangeIndex(this.i);
      }
      return;
    }

    this.rID = requestAnimationFrame(this.ani.bind(this, cf + 1));
  }

  lock(e) {
    this.x0 = unify(e).clientX;
    this.locked = true;
  }

  drag(e) {
    e.preventDefault();

    if (this.locked) {
      const dx = unify(e).clientX - this.x0;
      const f = +(dx / this.w).toFixed(2);

      this.container.style.setProperty("--i", this.i - f);
    }
  }

  move(e) {
    if (this.locked) {
      const dx = unify(e).clientX - this.x0;
      if (Math.abs(dx) < 1) {
        this.locked = false;
        return;
      }
      const s = Math.sign(dx);
      let f = +((s * dx) / this.w).toFixed(2);

      this.ini = this.i - s * f;

      if ((this.i > 0 || s < 0) && (this.i < this.N - 1 || s > 0) && f > 0.2) {
        this.i -= s;
        f = 1 - f;
      }

      this.fin = this.i;
      this.anf = Math.min(NF, Math.abs(Math.round(f * NF)));
      this.n = 2 + Math.round(f);
      this.ani();
      this.x0 = null;
      this.locked = false;
    }
  }

  prev() {
    if (this.i <= 0) return;
    this.ini = this.i;
    this.fin = this.i - 1;
    this.i -= 1;
    this.anf = NF;
    this.n = 2;
    this.ani();
  }

  next() {
    if (this.i >= this.N - 1) return;
    this.ini = this.i;
    this.fin = this.i + 1;
    this.i += 1;
    this.anf = NF;
    this.n = 2;
    this.ani();
  }

  keyup(e) {
    if (e.keyCode === 37) {
      this.prev();
    } else if (e.keyCode === 39) {
      this.next();
    }
  }

  size() {
    this.w = window.innerWidth;
  }

  bindEventListeners() {
    window.addEventListener("resize", this.size, false);

    this.container.addEventListener("mousedown", this.lock, false);
    this.container.addEventListener("touchstart", this.lock, false);

    this.container.addEventListener("mousemove", this.drag, false);
    this.container.addEventListener("touchmove", this.drag, false);

    this.container.addEventListener("mouseup", this.move, false);
    this.container.addEventListener("touchend", this.move, false);
  }

  unbindEventListeners() {
    window.removeEventListener("resize", this.size, false);

    this.container.removeEventListener("mousedown", this.lock, false);
    this.container.removeEventListener("touchstart", this.lock, false);

    this.container.removeEventListener("mousemove", this.drag, false);
    this.container.removeEventListener("touchmove", this.drag, false);

    this.container.removeEventListener("mouseup", this.move, false);
    this.container.removeEventListener("touchend", this.move, false);
  }

  bindKeyEventListeners() {
    window.addEventListener("keyup", this.keyup, false);
  }

  unbindKeyEventListeners() {
    window.removeEventListener("keyup", this.keyup, false);
  }

  refreshNumImages(numImages) {
    this.N = numImages || this.container.children.length;
    this.i = 0;
    this.x0 = null;
    this.locked = false;
    this.rID = null;
    this.container.style.setProperty("--i", 0);
    this.container.style.setProperty("--n", this.N);
  }
}

export default VanillaSwipe;
