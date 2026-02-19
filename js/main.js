const spans = document.querySelectorAll(".random-box");
const hamburger = document.querySelector(".btn-trigger");
const timerIds = [];
const menuPanel = document.querySelector(".menu");
const overlay = document.querySelector(".overlay")
// ２dコンテキストの取得

// ホバー演出
spans.forEach((span, index) => {
    timerIds[index] = null;
    hamburger.addEventListener("mouseover", () => {
        if (!hamburger.classList.contains("active")) {
            // console.log("aa");
            if (timerIds[index]) clearInterval(timerIds[index]);
            timerIds[index] = setInterval(() => {
                const randomWidth = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
                span.style.width = `${randomWidth}px`;
            }, 300);
        }
    });
    hamburger.addEventListener("mouseleave", () => {
        if (timerIds[index]) {
            clearInterval(timerIds[index]);
            timerIds[index] = null;
        }
        // ホバーが外れた時に長さが戻る
        if (!hamburger.classList.contains("active")) {
            span.style.width = "30px";
        }
    });
    // クリック時演出
    hamburger.addEventListener("click", () => {
        timerIds.forEach((id, index) => {
            if (id) {
                clearInterval(id);
                timerIds[index] = null;
            }
        });
        hamburger.classList.toggle("active");
        // クリックしたときに長さが戻る
        span.style.width = "30px";
        // パネルスライドイン
        menuPanel.classList.toggle("active");
        overlay.classList.toggle("active");
    });
});
const images = document.querySelectorAll(".item");
const modalWindow = document.querySelector("#modalGrid");
if (modalWindow) {
    const modalImg = modalWindow.querySelector("img");
    const modalText = modalWindow.querySelector("#article");
    const modalTitle = modalWindow.querySelector("#modalTitle");
    // モーダル表示
    images.forEach((image) => {
        image.addEventListener("click", () => {
            const newSrc = image.getAttribute("data-src");
            const newText = image.getAttribute("data-text");
            const newTitle = image.getAttribute("data-title");
            modalImg.src = newSrc;
            modalText.innerText = newText;
            modalTitle.innerText = newTitle;
            if (modalWindow.style.display === "none" || !modalWindow.classList.contains("active")) {
                console.log("aa");
                modalWindow.style.display = "grid";
                overlay.classList.add("active");
                setTimeout(() => {
                    modalWindow.classList.add("active");
                }, 10)
            }
        });
    });
    // モーダル閉じ
    const modalClose = document.querySelector("#modalClose");
    modalClose.addEventListener("click", () => {
        modalWindow.classList.remove("active");
        overlay.classList.remove("active");
    });

    overlay.addEventListener("click", () => {
        if (modalWindow.classList.contains("active")) {
            modalWindow.classList.remove("active");
            overlay.classList.remove("active");
        } else if (hamburger.classList.contains("active")) {
            overlay.classList.remove("active");
            hamburger.classList.remove("active");
            menuPanel.classList.remove("active");
        }
    });
}
const glowLinks = document.querySelectorAll(".container a");

glowLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
        link.classList.add("is-glowing");
    });
    link.addEventListener("mouseleave", () => {
        link.classList.remove("is-glowing");
    });
});

// const bar = document.querySelector(".scgauge");
// window.addEventListener('load', (event) => {
//     let scroll_y = window.scrollY;
//     console.log(scroll_y);

//     // (2)スクロールするたびにスクロール量を出力
//     window.addEventListener('scroll', (event) => {
//         let scroll_y = window.scrollY;
//         console.log(scroll_y);
//         bar.style.height=scroll_y+"px";
//     });
// });
const moveKey = document.querySelectorAll(".movetrigger div");
const bgGif = document.querySelector(".container img");
const gifCoord = bgGif.getBoundingClientRect();
const UpEl = document.querySelector("#up");
const RightEl = document.querySelector("#right");
const DownEl = document.querySelector("#down");
const LeftEl = document.querySelector("#left");
const up =UpEl.getAttribute("data-text");
const right =RightEl.getAttribute("data-text");
const left =LeftEl.getAttribute("data-text");
const down =DownEl.getAttribute("data-text");
const Knote = document.querySelector("#Knote");
const mount = document.querySelector("#mountain");
const portfolio = document.querySelector("#portfolio");
moveKey.forEach((key) => {
    key.addEventListener("click", () => {
        if (bgGif.classList.contains("default")) {
            console.log("clear");
            bgGif.classList.remove("default");
            if (key.getAttribute("data-text") === "left") {
                bgGif.classList.toggle("left");
                key.style.display = "none";
                DownEl.style.display = "none";
                Knote.classList.toggle("left");
            } else if (key.getAttribute("data-text") === "right") {
                bgGif.classList.toggle("right");
                key.style.display = "none";
                DownEl.style.display = "none";
                mount.classList.toggle("right");
            } else if (key.getAttribute("data-text") === "down") {
                bgGif.classList.toggle("down");
                key.style.display = "none";
                LeftEl.style.display = "none";
                RightEl.style.display = "none";
                UpEl.style.display = "block";
                portfolio.classList.toggle("down");
            }
        } else if (bgGif.classList.contains("right")) {
            if (key.getAttribute("data-text") === "left") {
                bgGif.classList.remove("right");
                bgGif.classList.toggle("default");
                RightEl.style.display = "block";
                DownEl.style.display = "block";
                mount.classList.remove("right");
            }
        } else if (bgGif.classList.contains("left")) {
            if (key.getAttribute("data-text") === "right") {
                LeftEl.style.display = "block";
                DownEl.style.display = "block";
                Knote.classList.remove("left");
                bgGif.classList.remove("left");
                bgGif.classList.toggle("default");
            }
        }
        else if (bgGif.classList.contains("down")) {
            if (key.getAttribute("data-text") === "up") {
                RightEl.style.display = "block";
                LeftEl.style.display = "block";
                DownEl.style.display = "block";
                UpEl.style.display = "none";
                bgGif.classList.remove("down");
                bgGif.classList.toggle("default");
                portfolio.classList.remove("down");
            }
        }
    })
});