const spans = document.querySelectorAll(".random-box");
const hamburger = document.querySelector(".btn-trigger");
const timerIds = [];
const menuPanel = document.querySelector(".menu");
// ２dコンテキストの取得

// ホバー演出
spans.forEach((span,index)=>{
    timerIds[index] = null;
    hamburger.addEventListener("mouseover",()=>{
        if(!hamburger.classList.contains("active")){
        // console.log("aa");
        if(timerIds[index]) clearInterval(timerIds[index]);
        timerIds[index] = setInterval(()=>{
            const randomWidth = Math.floor(Math.random()*(30 - 10 + 1)) + 10;
            span.style.width = `${randomWidth}px`;
        },300);
    }
    });
    hamburger.addEventListener("mouseleave",()=>{
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
