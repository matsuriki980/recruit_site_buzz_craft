export function initFadeIn() {
  // ----------------------------------------------------------------------------
  // top-fv
  // ---------------------------------------------------------------------------
  const charsPc = document.querySelectorAll(".js-char-pc");
  const charsSp = document.querySelectorAll(".js-char-sp");

  const charFadeIn = () => {
    const windowWidth = window.innerWidth;

    // pc
    if (windowWidth > 1080) {
      if (charsPc.length === 0) return;

      charsPc.forEach((char, index) => {
        setTimeout(() => {
          char.classList.add("is-active");
        }, index * 300);
      });
    }

    // sp
    else {
      if (charsSp.length === 0) return;

      charsSp.forEach((char, index) => {
        setTimeout(() => {
          char.classList.add("is-active");
        }, index * 300);
      });
    }
  };

  // ----------------------------------------------------------------------------
  // 初期化
  // ----------------------------------------------------------------------------
  charFadeIn();

  // ----------------------------------------------------------------------------
  // リサイズ時
  // ----------------------------------------------------------------------------
  window.addEventListener("resize", charFadeIn);
}
