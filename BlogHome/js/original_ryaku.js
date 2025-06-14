// メニュー展開時に背景を固定
const backgroundFix = (bool) => {
  const scrollingElement = () => {
    const browser = window.navigator.userAgent.toLowerCase();
    if ("scrollingElement" in document) return document.scrollingElement;
    return document.documentElement;
  };

  const scrollY = bool
    ? scrollingElement().scrollTop
    : parseInt(document.body.style.top || "0");

  const fixedStyles = {
    height: "100vh",
    position: "fixed",
    top: `${scrollY * -1}px`,
    left: "0",
    width: "100vw",
  };

  Object.keys(fixedStyles).forEach((key) => {
    document.body.style[key] = bool ? fixedStyles[key] : "";
  });

  if (!bool) {
    window.scrollTo(0, scrollY * -1);
  }
};

// 変数定義
const CLASS = "-active";
let flg = false;
let acdnFlg = false;

let hmbg = document.getElementById("js-hmbg");
let focusTrap = document.getElementById("js-focus-trap");
let menu = document.querySelector(".js-nav-area");
let acdnTrigger = document.querySelectorAll(".js-sp-acdn-trigger");
let acdn = document.querySelectorAll(".js-sp-acdn");

// メニュー開閉制御
hmbg.addEventListener("click", (e) => {
  //ハンバーガーボタンが選択されたら
  e.currentTarget.classList.toggle(CLASS);
  menu.classList.toggle(CLASS);
  if (flg) {
    // flgの状態で制御内容を切り替え
    backgroundFix(false);
    hmbg.setAttribute("aria-expanded", "false");
    hmbg.focus();
    flg = false;
  } else {
    backgroundFix(true);
    hmbg.setAttribute("aria-expanded", "true");
    flg = true;
  }
});
// window.addEventListener("keydown", () => {　//escキー押下でメニューを閉じられるように
//   if (event.key === "Escape") {
//     hmbg.classList.remove(CLASS);
//     menu.classList.remove(CLASS);

//     backgroundFix(false);
//     hmbg.focus();
//     hmbg.setAttribute("aria-expanded", "false");
//     flg = false;
//   }
// });

// メニュー内アコーディオン制御
acdnTrigger.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle(CLASS);
    e.currentTarget.nextElementSibling.classList.toggle(CLASS);
    if (acdnFlg) {
      e.currentTarget.setAttribute("aria-expanded", "false");
      acdnFlg = false;
    } else {
      e.currentTarget.setAttribute("aria-expanded", "true");
      acdnFlg = true;
    }
  });
});

// フォーカストラップ制御
focusTrap.addEventListener("focus", (e) => {
  hmbg.focus();
});

// 参考　https://chat.openai.com/c/50d325e5-607c-4ca9-9c5f-671eca18527c
document.getElementById("acd_x_btn").addEventListener("click", function () {
  // クリックされたときに実行するコード
  var element = document.querySelector(".acdn.-active");
  if (element) {
    element.classList.remove("-active");
  }
});

// 参考　https://chat.openai.com/c/38244b66-a3f7-4e09-9cab-a790ef531691
const menuCloseButton = document.getElementById("menu-close");

menuCloseButton.addEventListener("click", () => {
  // メニューを閉じる処理を追加
  hmbg.classList.remove(CLASS); // ハンバーガーボタンのクラスを削除
  menu.classList.remove(CLASS); // メニューのクラスを削除
  backgroundFix(false); // 背景の固定を解除

  hmbg.setAttribute("aria-expanded", "false"); // ハンバーガーボタンの ARIA 属性を更新
  hmbg.focus(); // ハンバーガーボタンにフォーカスを設定
  flg = false; // フラグを閉じた状態に設定
});

// アコーディオン外クリックで閉じる処理：
document.addEventListener("click", function (e) {
  // 現在開いているアコーディオンを取得
  const openAcdn = document.querySelector(".acdn.-active");
  const trigger = document.querySelector(".js-sp-acdn-trigger.-active");

  // 開いている場合のみチェック
  if (openAcdn && trigger) {
    // クリックされた要素がアコーディオン本体やトリガーの中かどうかを確認
    if (!openAcdn.contains(e.target) && !trigger.contains(e.target)) {
      openAcdn.classList.remove("-active");
      trigger.classList.remove("-active");
      trigger.setAttribute("aria-expanded", "false");
    }
  }
});
