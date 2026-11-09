# 架空採用サイト コーディング 
<br>

## 概要
HTML/SCSS/JavaScriptで作成した、架空採用サイトです。  
プロのデザイナーからデザインカンプを購入し、それをもとに再現しました。
<br>
<br>

## サイトURL
[https://matsuyamarikiya.jp/recruit_site_buzz_craft/](https://matsuyamarikiya.jp/recruit_site_buzz_craft/)
<br>
<br>

## 制作情報

### 制作期間

- コーディング：1週間

### 制作人数

- 個人制作

### 担当範囲

- コーディング
- サーバーアップロード (さくらサーバー)
<br>
<br>

## 使用技術

- HTML
- SCSS
- JavaScript
- Git
- GitHub
- Dreamweaver
<br>
<br>

## サイト構成

- トップページ（`top`）
- 社員を知る（`people`）
- 環境を知る（`environment`）
- 仕事を知る（`business`）
- 会社を知る（`company`）
- 採用情報（`recruit`）
- ご応募（`entry`）
<br>
<br>

## 実装内容

- レスポンシブ対応
- ハンバーガーメニュー
- ヘッダー背景の切り替え
- ホバー 画像切り替え
- topページ fv テキストフェードイン
- ボタン式 カルーセルスライダー (splide)
- 自動再生スライダー (splide)
<br>
<br>

## 工夫点
### Object.assign()を活用したスライダー設定の共通化
各スライダーに共通するオプションをまとめ、Object.assign()と条件分岐を使用して、スライダーごとに異なるオプションを追加する処理を実装しました。  
これにより、共通オプションの重複記述を削減し、コードの簡潔化と保守性の向上を図りました。
#### コード
```text
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
    // environment-office
    // =============================================================================
    if (slider.classList.contains("js-environment-office__slider")) {
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

```
<br>

### remを活用した可変レイアウトの実装
html要素のfont-sizeをcalc(100vw / var(--base-vw))で設定し、画面幅に応じてrem単位の要素が比例して拡大・縮小する可変レイアウトを実装しました。  
スマートフォンでは375px、PCでは1440pxを基準幅として切り替えることで、デザインカンプの数値をそのままrem単位で指定できるようにしました。  
これにより、デザインカンプの数値を変換する手間を省きながら、画面幅に応じたサイズ調整を自動化し、実装作業の効率化と保守性の向上を図りました。
<br>
<br>

## ディレクトリ構成

```text
.
├── index.html
│
├── people
│   └── index.html
│
├── environment
│   └── index.html
│
├── business
│   └── index.html
│
├── company
│   └── index.html
│
├── recruit
│   └── index.html
│
├── entry
│   └── index.html
│
│
└── assets
    ├── img/
    │
    ├── js
    │   ├── module
    │   │   └── script.js
    │   │
    │   ├── scroll
    │   │   └── script.js
    │   │
    │   ├── hover
    │   │   └── script.js
    │   │
    │   ├── fade-in
    │   │   └── script.js
    │   │
    │   └── main.js
    │
    ├── scss
    │   ├── component
    │   ├── foundation
    │   ├── global
    │   ├── layout
    │   ├── page
    │   ├── utility
    │   └── style.scss
    │
    └── css
        └── style.css
```
<br>
<br>

## 対応画面幅

- モバイル (375 ~ 1079px)
- PC (1080px ~)
