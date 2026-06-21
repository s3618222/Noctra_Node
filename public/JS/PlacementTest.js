const startBtn = document.getElementById("startBtn");
const testIntro = document.querySelector(".explainDiv");

const buttonsDiv = document.querySelector(".buttonsDiv")
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const finishBtn = document.getElementById("finishBtn");

const question = document.querySelectorAll(".questions");
let currentQueIndex = 0;

const resultArea = document.querySelector(".results")
const noctraBtn = document.getElementById("startNoctra")

//測驗題答案
const answerKey = {
    q1: "C",
    q2: "B",
    q3: "C",
    q4: "C",
    q5: "C",
    q6: "B",
    q7: "A",
    q8: "B",
    q9: "C",
    q10: "B",
};

const correctNumber = document.getElementById("correctNumber"); //顯示答對幾題
const startLevel = document.getElementById("startLevel"); //顯示建議起始層級
const levelDescription = document.getElementById("levelDescription"); //顯示層級能力描述
const direction = document.getElementById("direction"); //顯示方向建議

//起始按鈕設定
startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    //顯示下一頁按鈕 隱藏上一頁
    buttonsDiv.style.display = "flex";
    nextBtn.style.display = "block";
    previousBtn.style.display = "none";

    testIntro.style.display = "none";
    currentQueIndex = 0;
    question[currentQueIndex].style.display = "block";

});

//翻頁前，檢查是否已作答
function checkAnswered() {
    const currentQuestion = question[currentQueIndex];
    const questionId = currentQuestion.id;

    const selectedAnswer = document.querySelector(`input[name=${questionId}]:checked`);

    if (!selectedAnswer) {
        alert("請先選擇一個答案，再前往下一頁。");
        return false;
    } else {
        return true;
    };
};

//下一頁按鈕
function nextPage() {
    //檢查是否有作答了；沒作答就return，不繼續執行後續邏輯
    if (checkAnswered() === false) {
        return;
    }

    //先把所有的題目卡片關起來
    question.forEach((card) => {
        card.style.display = "none";
    });

    currentQueIndex++;

    //打開上一頁按鈕
    previousBtn.style.display = "block";

    //打開下一頁的目標題目卡片
    if (currentQueIndex === 9) {
        question[currentQueIndex].style.display = "block";
        nextBtn.style.display = "none"; //最後一題時 關閉下一頁
        finishBtn.style.display = "block"; //打開完成按鈕
    } else {
        question[currentQueIndex].style.display = "block";
        finishBtn.style.display = "none";
    };
}

nextBtn.addEventListener("click", nextPage);

//上一頁按鈕
function previousPage() {
    question.forEach((card) => {
        card.style.display = "none";
    });

    finishBtn.style.display = "none" // 把完成作答按鈕關閉
    nextBtn.style.display = "block" //打開下一頁按鈕

    currentQueIndex--;
    if (currentQueIndex === 0) {
        question[currentQueIndex].style.display = "block";
        //回到第一題時 把上一頁按鈕隱藏起來
        previousBtn.style.display = "none";
    } else {
        question[currentQueIndex].style.display = "block";
    };
}

previousBtn.addEventListener("click", previousPage);

//測驗對答案函式
let score = 0; //起始分數 0分

function checkAnswers() {
    for (const qName in answerKey) { //抓出答案表物件內的每個qx屬性 q1-q10
        const selected = document.querySelector(`input[name="${qName}"]:checked`);
        //透過:checked抓取每題作答選什麼答案
        const userAnswer = selected ? selected.value : null;
        //若該題沒選答案 直接不算分

        if (userAnswer === answerKey[qName]) {
            score++; //答對就+1分
        };
    };
}

//分數轉換成建議的起始層級函式
function levelRecommend(score) {
    if (score <= 2) return { cefr: "A1", band: "Beginner" };
    if (score <= 4) return { cefr: "A2", band: "Beginner" };
    if (score <= 6) return { cefr: "B1", band: "Intermediate" };
    if (score <= 8) return { cefr: "B2", band: "Intermediate" };
    if (score === 9) return { cefr: "C1", band: "Advanced" };
    return { cefr: "C2", band: "Advanced" }; // return時就會結束函式，所以不用特別打else
};

//建議課程函式
const cardGroups = document.querySelectorAll(".cards");

function CourseRecommend(level) {
    //先關掉全部課程卡片
    cardGroups.forEach((card) => {
        card.style.display = "none";
    });

    //接著打開要建議的卡片組
    const targetCards = document.getElementById(`${level}Cards`);
    targetCards.style.display = "flex";
};

//層級能力描述函式
//各級能力文字
const levelInfo = {
    A1: {
        summary: "你目前能理解並使用一些基礎的英語句型，例如自我介紹、簡單問答與日常用語。在熟悉的情境中，你可以用簡單句子表達基本需求。",
        next: "接下來可以加強句型結構與常用情境對話，讓開口說英語變得更自然、更有信心。",
    },
    A2: {
        summary: "你已經能在日常情境中進行簡單溝通，例如談論生活、行程安排或提出需求。雖然句型仍偏基礎，但已能理解較完整的對話內容。",
        next: "可以開始練習更完整的句型與時間表達，讓你不只能說英語，還能說得更清楚。",
    },
    B1: {
        summary: "你可以在工作或生活情境中清楚表達想法，並理解大部分日常與職場對話。在熟悉主題下，你已具備進行討論與說明的能力。",
        next: "可以加強語氣掌握與觀點組織能力，讓表達更有條理與說服力。",
    },
    B2: {
        summary: "你能在專業或較複雜的情境中清楚表達觀點，並理解抽象或進階內容。在會議或簡報場合中，已具備相當的溝通能力。",
        next: "可以進一步優化語氣、流暢度與細節精準度，讓溝通更自然且有影響力。",
    },
    C1: {
        summary: "你能在多數專業與跨文化情境中自然且有效地溝通。能理解細微語意差異，並清楚表達複雜觀點。",
        next: "可以強化策略性表達與語感細膩度，讓語言成為你思考與決策的工具。",
    },
    C2: {
        summary: "你的英語已達高度流暢與精準程度。無論在專業討論、抽象議題或跨文化交流中，都能自然運用語言。",
        next: "可以專注於語氣風格調整、文化細節與語言深度，讓表達更具個人風格與影響力。",
    },
};


//完成作答按鈕
finishBtn.addEventListener("click", () => {
    //檢查是否有作答了；沒作答就return，不繼續執行後續邏輯
    if (checkAnswered() === false) {
        return;
    }

    question.forEach((card) => {
        card.style.display = "none";
    });
    buttonsDiv.style.display = "none";
    resultArea.style.display = "block";

    checkAnswers(); //計算測驗分數
    correctNumber.textContent = `${score}`; //顯示總共對幾題

    //將分數轉換成對應起始層級
    const levelResult = levelRecommend(score);
    startLevel.textContent = `${levelResult.cefr} / ${levelResult.band}`; //顯示建議起始層級

    //顯示對應的建議課程卡片
    const targetLevel = levelResult.cefr; //取得前面分數配對到的對應等級 例如A1、A2...
    CourseRecommend(targetLevel); //把對應到的等級 餵給課程建議函式


    //顯示對應層級的文字描述
    levelDescription.textContent = levelInfo[targetLevel].summary;
    direction.textContent = levelInfo[targetLevel].next;

    //把起始層級資料存起來，方便等使用者進入Noctra平台頁面後，可以直接顯示對應初始層級
    localStorage.setItem("placementLevel", targetLevel);
});