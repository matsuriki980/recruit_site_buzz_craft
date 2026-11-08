/* 
  module
*/

export function initScript() {
  const header = document.querySelector(".js-header");
  const headerScrollTrigger = document.querySelector(
    ".js-header__scroll-trigger",
  );
  const hamburgerMenu = document.querySelector(".js-hamburger-menu");
  const hamburgerBtn = document.querySelector(".js-hamburger__btn");
  const bodyElement = document.body;

  const scrollY = window.scrollY; // スクロール量を取得
  const headerScrollTriggerTop =
    headerScrollTrigger.getBoundingClientRect().top + window.scrollY; // ページトップからトリガー要素までの距離を取得

  // ----------------------------------------------------------------------------
  // header-bg
  // ----------------------------------------------------------------------------
  const headerToggleClass = (scrollY) => {
    // topページ以外では、スクロール量がトリガー要素までの距離を超えたらヘッダー背景の透明度を1にする
    if (!header.classList.contains("l-header--top")) {
      if (scrollY > headerScrollTriggerTop) {
        header.classList.remove("l-header--sub-page");
      } else {
        header.classList.add("l-header--sub-page");
      }
    }
  };

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY; // スクロール量を取得
    headerToggleClass(scrollY);
  });

  // ----------------------------------------------------------------------------
  // hamburger-menu
  // ----------------------------------------------------------------------------
  hamburgerBtn.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("is-open");
    header.classList.toggle("is-open");

    const isMenuOpen = hamburgerMenu.classList.contains("is-open");

    // ハンバーガーメニューopen時、スクロールを無効化
    if (isMenuOpen) {
      bodyElement.classList.add("u-scroll-hidden");
    } else {
      bodyElement.classList.remove("u-scroll-hidden");
    }
  });

  // リサイズ時、ヘッダーとハンバーガーメニューについているis-openを外す
  const handleResize = () => {
    const windowWidth = window.innerWidth;

    const pcFunction = () => {
      hamburgerMenu.classList.remove("is-open");
      header.classList.remove("is-open");
      bodyElement.classList.remove("u-scroll-hidden");
    };

    if (windowWidth > 1080) {
      pcFunction();
    }
  };

  // ----------------------------------------------------------------------------
  // 初期化
  // ----------------------------------------------------------------------------
  headerToggleClass(scrollY);

  // ----------------------------------------------------------------------------
  // リサイズ時
  // ----------------------------------------------------------------------------
  window.addEventListener("resize", handleResize);
}
