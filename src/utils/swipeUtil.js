/* eslint-disable no-debugger */
export default function(_C) {
  const N = _C.children.length;
  const NF = 30;
  const TFN = {
      "bounce-out": function(k, a = 2.75, b = 1.5) {
        return (
          1 -
          Math.pow(1 - k, a) *
            Math.abs(Math.cos(Math.pow(k, b) * (n + 0.5) * Math.PI))
        );
      },
    };
  console.log(N);

  let i = 0,
    x0 = null,
    locked = false,
    w,
    ini,
    fin,
    rID = null,
    anf,
    n;

  function stopAni() {
    cancelAnimationFrame(rID);
    rID = null;
  }

  function ani(cf = 0) {
    // console.log('ani', cf, ini, fin, anf)
    _C.style.setProperty(
      "--i",
      ini + (fin - ini) * TFN["bounce-out"](cf / anf)
    );

    if (cf === anf) {
      stopAni();
      return;
    }

    rID = requestAnimationFrame(ani.bind(this, ++cf));
  }

  function unify(e) {
    return e.changedTouches ? e.changedTouches[0] : e;
  }

  function lock(e) {
    x0 = unify(e).clientX;
    locked = true;
  }

  function drag(e) {
    e.preventDefault();

    if (locked) {
      let dx = unify(e).clientX - x0,
        f = +(dx / w).toFixed(2);
        // console.log('drag', f, i - f);

      _C.style.setProperty("--i", i - f);
    }
  }

  function move(e) {
    if (locked) {
      let dx = unify(e).clientX - x0,
        s = Math.sign(dx),
        f = +((s * dx) / w).toFixed(2);
      // console.log('move before recalc f', f)
      ini = i - s * f;

      if ((i > 0 || s < 0) && (i < N - 1 || s > 0) && f > 0.2) {
        i -= s;
        f = 1 - f;
      }
      // console.log('move after recalc f', f)

      fin = i;
      anf = Math.min(NF, Math.abs(Math.round(f * NF)));
      n = 2 + Math.round(f);
      ani();
      x0 = null;
      locked = false;
    }
  }

  function size() {
    w = window.innerWidth;
  }

  size();

  _C.style.setProperty("--n", N);

  return {
    size, lock, drag, move,
  };


}
