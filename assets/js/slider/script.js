/*
  slider
*/

export function initSlider() {
  // =============================================================================
  // 共通設定
  // =============================================================================

  const sliders = document.querySelectorAll(".splide");

  sliders.forEach((slider) => {
    // 共通オプション
    const options = {
      type: "loop",
      arrows: false,
    };

    // =============================================================================
    // top-people
    // =============================================================================

    if (slider.classList.contains("js-p-top-people")) {
      Object.assign(options, {
        focus: "center",
        start: 0,
        pagination: false, // ページネーションを非表示

        breakpoints: {
          1080: {
            gap: "32rem",
          },
        },
      });
    }

    // Splide初期化
    const splide = new Splide(slider, options);

    splide.mount();

    // 独自矢印
    const prevBtn = slider.querySelector(".js-prev");
    const nextBtn = slider.querySelector(".js-next");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        splide.go("<");
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        splide.go(">");
      });
    }
  });
}
