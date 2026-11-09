/*
  slider
*/

export function initSlider() {
  // =============================================================================
  // 共通設定
  // =============================================================================

  const sliders = document.querySelectorAll(".splide");

  if (!sliders.length === 0) return;

  sliders.forEach((slider) => {
    // 共通オプション
    const options = {
      type: "loop",
      arrows: false,
      pagination: false, // ページネーションを非表示
    };

    // =============================================================================
    // top-people
    // =============================================================================

    if (slider.classList.contains("js-p-top-people")) {
      Object.assign(options, {
        focus: "center",
        start: 0,

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

    // =============================================================================
    // environment-oficce
    // =============================================================================
    if (slider.classList.contains("js-environment-oficce__slider")) {
      Object.assign(options, {
        focus: "center",
        start: 0,
        fixedWidth: "820rem",
        gap: "14rem",

        breakpoints: {
          1080: {
            fixedWidth: "268rem",
          },
        },
      });
    }

    // =============================================================================
    // Splide初期化
    // =============================================================================
    const splide = new Splide(slider, options);

    // companyのスライダーのみAuto Scroll拡張機能を適用
    if (slider.classList.contains("js-l-company__slider")) {
      splide.mount(window.splide.Extensions);
    } else {
      splide.mount();
    }

    // =============================================================================
    // ページネイション設定
    // =============================================================================
    const pagiNaition = document.querySelectorAll(".js-pagination");

    if (pagiNaition.length > 0) {
      const dots = document.querySelectorAll(".js-pagination-dot");

      // アクティブなドットを更新
      const updateDots = (index) => {
        dots.forEach((dot, i) => {
          dot.classList.toggle("is-active", i === index);
        });
      };

      // 初期表示
      splide.on("mounted", () => {
        updateDots(splide.index);
      });

      // スライド移動時
      splide.on("move", (newIndex) => {
        updateDots(newIndex);
      });

      // ドットクリックでスライド移動
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          splide.go(index);
        });
      });
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
