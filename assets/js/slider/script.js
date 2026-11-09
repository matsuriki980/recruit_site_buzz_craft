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
        autoScroll: {
          speed: 0,
        },

        breakpoints: {
          1080: {
            gap: "32rem",
          },
        },
      });
    }

    // =============================================================================
    // top-company
    // =============================================================================
    if (slider.classList.contains("js-l-company__slider")) {
      Object.assign(options, {
        pagination: false, // ページネーションを非表示
        fixedWidth: "440rem",
        autoScroll: {
          speed: 0.5,
          pauseOnHover: false, // マウスを乗せても止めない
          pauseOnFocus: false, // フォーカスしても止めない
        },

        breakpoints: {
          1080: {
            fixedWidth: "205rem",
            autoScroll: {
              speed: 0.3,
            },
          },
        },
      });
    }

    // 2つ目のスライダーは反対方向に自動再生
    if (slider.classList.contains("js-l-company__slider--reverse")) {
      Object.assign(options, {
        direction: "rtl", // 右から左（逆方向）へ再生
      });
    }

    // Splide初期化
    const splide = new Splide(slider, options);

    // companyのスライダーのみAuto Scroll拡張機能を適用
    if (slider.classList.contains("js-l-company__slider")) {
      splide.mount(window.splide.Extensions);
    } else {
      splide.mount();
    }

    // =============================================================================
    // 矢印設定
    // =============================================================================
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
