/* 
  hover
*/

export function initHover() {
  // ----------------------------------------------------------------------------
  // top-environment
  // ---------------------------------------------------------------------------

  const topEnvironmentHover = () => {
    // pcのみ実装
    const windowWidth = window.innerWidth;
    if (windowWidth > 1080) {
      const topEnvironmentLink = document.querySelectorAll(
        ".js-p-top-environment__link",
      );
      const topEnvironmentImg = document.querySelectorAll(
        ".js-p-top-environment__img",
      );

      topEnvironmentLink.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          topEnvironmentImg.forEach((img) => {
            img.classList.remove("is-active");
          });

          const linkData = link.dataset.link;
          const img = document.querySelector(
            `.js-p-top-environment__img[data-img="${linkData}"]`,
          );

          img.classList.add("is-active");
        });
      });
    }
  };

  // ----------------------------------------------------------------------------
  // 初期化
  // ----------------------------------------------------------------------------
  topEnvironmentHover();

  // ----------------------------------------------------------------------------
  // リサイズ時
  // ----------------------------------------------------------------------------
  window.addEventListener("resize", topEnvironmentHover);
}
