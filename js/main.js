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
    const modalClose = document.querySelector("#modalClose");
    const modalCloseRes = document.querySelector("#modalCloseRes");
    const body = document.querySelector("body");
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
                if (!modalCloseRes) {
                    modalCloseRes.style.display = "block";
                }
                overlay.classList.add("active");
                setTimeout(() => {
                    body.classList.add("is-fixed");
                    modalClose.classList.add("active");
                    modalCloseRes.classList.add("active");
                    modalWindow.classList.add("active");
                }, 10)
            }
        });
    });
    // モーダル閉じ
    modalClose.addEventListener("click", () => {
        modalWindow.classList.remove("active");
        modalClose.classList.remove("active");
        overlay.classList.remove("active");
        body.classList.remove("is-fixed");
    });
    modalCloseRes.addEventListener("click", () => {
        modalWindow.classList.remove("active");
        modalCloseRes.classList.remove("active");
        overlay.classList.remove("active");
        body.classList.remove("is-fixed");
    })
    overlay.addEventListener("click", () => {
        if (modalWindow.classList.contains("active")) {
            modalWindow.classList.remove("active");
            modalClose.classList.remove("active");
            body.classList.remove("is-fixed");
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

const documentHeight = document.documentElement.scrollHeight;
// const documentWidth = document.documentElement.
const bar = document.querySelector(".scgauge");
const barM = document.querySelector(".scgaugeMres");
if (bar) {
    window.addEventListener('scroll', () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.scrollY;
        const scrollPercent = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
        const inversePercent = 100 - scrollPercent;
        if (bar) {
            bar.style.backgroundSize = `100% ${inversePercent}%`;
        }else{
            bar.style.backgroundSize = `0 ${inversePercent}%`;
        }
    });
}
if (barM) {
    window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    
    if (scrollable > 0) {
        const scrollPercent = (scrollTop / scrollable) * 100;
        const inversePercent = 100 - scrollPercent;
        const barM = document.querySelector('.scgaugeMres');
        if (barM) {
            barM.style.width = `${inversePercent}%`;
        }
    }
});
}
const moveKey = document.querySelectorAll(".movetrigger div");
if (moveKey) {
    const bgGif = document.querySelector(".container img");
    const UpEl = document.querySelector("#up");
    const RightEl = document.querySelector("#right");
    const DownEl = document.querySelector("#down");
    const LeftEl = document.querySelector("#left");
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
}

// コンパクトにするとこうなる（覚えておきたい）
// const moveKey = document.querySelectorAll(".movetrigger div");
// const bgGif = document.querySelector(".container img");

// // 各要素をIDベースでまとめて取得
// const elements = {
//     up: document.querySelector("#up"),
//     right: document.querySelector("#right"),
//     down: document.querySelector("#down"),
//     left: document.querySelector("#left"),
//     Knote: document.querySelector("#Knote"),
//     mountain: document.querySelector("#mountain"),
//     portfolio: document.querySelector("#portfolio")
// };

// // 状態遷移の設定（どのキーを押した時にどう変化するか）
// const transitions = {
//     default: {
//         left:  { add: 'left',  hide: ['left', 'down'], show: [], target: 'Knote' },
//         right: { add: 'right', hide: ['right', 'down'], show: [], target: 'mountain' },
//         down:  { add: 'down',  hide: ['down', 'left', 'right'], show: ['up'], target: 'portfolio' }
//     },
//     left:  { right: { backTo: 'default', show: ['left', 'down'], target: 'Knote' } },
//     right: { left:  { backTo: 'default', show: ['right', 'down'], target: 'mountain' } },
//     down:  { up:    { backTo: 'default', show: ['right', 'left', 'down'], hide: ['up'], target: 'portfolio' } }
// };

// moveKey?.forEach(key => {
//     key.addEventListener("click", () => {
//         const action = key.getAttribute("data-text");
//         const currentState = bgGif.classList[0]; // 現在のクラス（default, left等）を取得
//         const config = transitions[currentState]?.[action];

//         if (!config) return;

//         // 1. クラスの切り替え
//         bgGif.classList.remove(currentState);
//         bgGif.classList.add(config.add || config.backTo);

//         // 2. ターゲット要素のクラス操作
//         if (config.target) {
//             elements[config.target].classList.toggle(config.add || currentState);
//         }

//         // 3. 表示・非表示の一括処理
//         config.hide?.forEach(id => elements[id].style.display = "none");
//         config.show?.forEach(id => elements[id].style.display = "block");
//     });
// });

// 波背景

(() => {
    let unit = 100,
        canvasList,
        drawInfo = {},
        colorList = [],
        innerFontColorList = [],
        innerBgColorList = [];
    /**
     * Init function.
     * 
     * Initialize variables and begin the animation.
     */
    const init = () => {
        drawInfo.seconds = 0;
        drawInfo.t = 0;

        // Get all canvas elements
        canvasList = document.querySelectorAll('.wave-bar');

        // Initialize each canvas
        Array.prototype.forEach.call(canvasList,
            (canvas, index) => {
                let canvasDataSet = canvas.dataset,
                    inner = canvas.nextElementSibling,
                    innerDataSet;
                // Set the canvas size (Retina ready)
                canvas.width = document.documentElement.clientWidth;
                canvas.width *= devicePixelRatio;
                canvas.height = canvas.width * .4;
                canvas.height *= devicePixelRatio;
                canvas.style.height = String(canvas.height / devicePixelRatio) + "px";

                canvas.contextCache = canvas.getContext("2d");

                // Add color
                colorList.push([canvasDataSet.color1, canvasDataSet.color2, canvasDataSet.color3]);

                // Wrapper background color
                if (canvasDataSet.bgcolor) {
                    canvas.parentNode.style.backgroundColor = canvasDataSet.bgcolor;
                }

                // Inner content area
                if (inner) {
                    innerDataSet = inner.dataset;
                    if (innerDataSet.color) {
                        inner.style.color = innerDataSet.color;
                    }
                    if (innerDataSet.bgcolor) {
                        inner.style.backgroundColor = innerDataSet.bgcolor;
                    }
                }
            }
        );
        update();
    }

    const update = () => {
        // Each canvas
        Array.prototype.forEach.call(canvasList,
            (canvas, index) => {
                draw(canvas, colorList[index]);
            }
        );
        // 共通の描画情報の更新
        drawInfo.seconds = drawInfo.seconds + .014;
        drawInfo.t = drawInfo.seconds * Math.PI;
        // Re-call
        setTimeout(update, 35);
    }

    /**
     * Draw animation function.
     * 
     * This function draws one frame of the animation, waits 20ms, and then calls
     * itself again.
     */
    const draw = (canvas, color) => {
        // 対象のcanvasのコンテキストを取得
        const context = canvas.contextCache;
        // キャンバスの描画をクリア
        context.clearRect(0, 0, canvas.width, canvas.height);

        //波を描画
        if (color[0]) {
            if (color[1] && color[2]) {
                // 3 waves
                drawWave(canvas, color[0], 0.3, 3, 0);
                drawWave(canvas, color[1], 0.5, 2, 250);
                drawWave(canvas, color[2], 0.2, 1.6, 100);
            } else if (color[1] && !color[2]) {
                // 2 waves
                drawWave(canvas, color[0], 0.4, 3, 0);
                drawWave(canvas, color[1], 0.6, 2, 250);
            } else {
                // single wave only
                drawWave(canvas, color[0], 1, 3, 0);
            }
        }
    }
    /**
    * 波を描画
    * drawWave(キャンバス, 色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
    */
    const drawWave = (canvas, color, alpha, zoom, delay) => {
        const context = canvas.contextCache;
        context.fillStyle = color;
        context.globalAlpha = alpha;

        context.beginPath(); //パスの開始
        drawSine(canvas, drawInfo.t / 0.5, zoom, delay);
        context.lineTo(canvas.width + 10, canvas.height); //パスをCanvasの右下へ
        context.lineTo(0, canvas.height); //パスをCanvasの左下へ
        context.closePath() //パスを閉じる
        context.fill(); //塗りつぶす
    }
    /**
     * Function to draw sine
     * 
     * The sine curve is drawn in 10px segments starting at the origin. 
     * drawSine(キャンバス, 時間, 波の幅のzoom, 波の開始位置の遅れ)
     */
    const drawSine = (canvas, t, zoom, delay) => {
        const xAxis = Math.floor(canvas.height / 2);
        const yAxis = 0;
        const context = canvas.contextCache;
        // Set the initial x and y, starting at 0,0 and translating to the origin on
        // the canvas.
        let x = t; //時間を横の位置とする
        let y = Math.sin(x) / zoom;
        context.moveTo(yAxis, unit * y + xAxis); //スタート位置にパスを置く

        // Loop to draw segments (横幅の分、波を描画)
        for (i = yAxis; i <= canvas.width + 10; i += 10) {
            x = t + (-yAxis + i) / unit / zoom;
            y = Math.sin(x - delay) / 2.4;
            context.lineTo(i, unit * y + xAxis);
        }
    }
    init();
})();
// cookingnoteのゲージ
// カルーセル
const foods = document.querySelectorAll(".food");
const carousel = document.querySelector(".carousel");
function fishingGauge(x) {
    const bar = document.querySelector(".scgaugeK");
    const rate = foods.length;
    bar.style.backgroundSize = `100% ${100 - 100 / rate * (x + 1)}%`;
}
function glassgauge(x){
    const bar = document.querySelector("#glass");
    const rate = foods.length;
    bar.style.transform = `translate(${100 / rate * (x + 1)}%)`
}
// レスポンシブゲージ

if (carousel) {
    const carouselImg = carousel.querySelector("img");
    const carouselText = carousel.querySelector("#article");
    const carouselTitle = carousel.querySelector("h1");
    const left = document.querySelector("#left");
    const right = document.querySelector("#right");
    let x = 0;
    fishingGauge(x);
    glassgauge(x);
    function innerCarousel(x) {
        let content = foods[x];
        const newSrc = content.getAttribute("data-src");
        const newText = content.getAttribute("data-text");
        const newTitle = content.getAttribute("data-title");
        carouselImg.src = newSrc;
        carouselText.innerText = newText;
        carouselTitle.innerText = newTitle;
    }
    left.addEventListener("click", () => {
        if (x === 0) {
            x = foods.length - 1;
        } else {
            x--;
        }
        carousel.classList.toggle("whiteout");
        setTimeout(() => {
            innerCarousel(x);
            fishingGauge(x);
            glassgauge(x);
            carousel.classList.remove("whiteout");
        }, 1000);
    });
    right.addEventListener("click", () => {
        if (x === foods.length - 1) {
            x = 0;
        } else {
            x++;
        }
        carousel.classList.toggle("whiteout");
        setTimeout(() => {
            innerCarousel(x);
            fishingGauge(x);
            glassgauge(x);
            carousel.classList.remove("whiteout");
        }, 700);
    });
    innerCarousel(x);
}