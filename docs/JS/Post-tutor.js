const currentNoctraUser = JSON.parse(localStorage.getItem("currentNoctraUser")); //抓取目前登入者資訊

//未登入下的防呆機制，跳轉回登入頁面
if (!currentNoctraUser) {
    window.location.href = "SignIn.html";
};

//登出帳號
const logoutLink = document.getElementById("logout");
logoutLink.addEventListener('click', () => {
    localStorage.removeItem("currentNoctraUser"); //清除目前登入者js紀錄

    window.location.href = "index.html"; //跳轉回訪客介面首頁
});

//手機介面下的登出帳號連結設定
const mobileLogoutLink = document.getElementById("mobile-logout");
mobileLogoutLink.addEventListener("click", () => {
    localStorage.removeItem("currentNoctraUser"); //清除目前登入者js紀錄

    window.location.href = "index.html"; //跳轉回訪客介面首頁
});

const header = document.getElementById("header");
const threshold = 20; // 設定當捲動超過 20px就會改變header底色

// header置頂 bar 往下捲動後 加入class "solid" 更換白底色
window.addEventListener("scroll", () => {
    if (window.scrollY > threshold) {
        header.classList.add("solid");
    } else {
        header.classList.remove("solid");
    }

    //scrollY是指距離距離頂端(scrollY=0)的距離
});

const userInfoBtn = document.getElementById("user-info"); //使用者下拉選單按鈕
const userDropdown = document.querySelector(".user-dropdown"); //下拉選單


// 使用者下拉選單開關顯示
userInfoBtn.addEventListener("click", () => {
    userDropdown.classList.toggle("show");
})

// 我的預約開關顯示
const myRequestBtn = document.getElementById("myRequestBtn"); //我的預約按鈕
const myRequestForm = document.getElementById("myRequestForm") //我的預約表格

myRequestBtn.addEventListener("click", (e) => {
    myRequestForm.classList.toggle("show");
    myRequestBtn.classList.toggle("highlight");
    e.stopPropagation();
});

//教師分類標籤開關顯示
const levelBtn = document.getElementById("levelBtn"); //程度標籤
const levelSpread = document.getElementById("levelSpread"); //程度標籤選單

const accentBtn = document.getElementById("accentBtn"); //口音標籤
const accentSpread = document.getElementById("accentSpread"); //口音標籤選單

const subjectBtn = document.getElementById("subjectBtn"); //主題標籤
const subjectSpread = document.getElementById("subjectSpread"); //主題標籤選單

const allBigButtons = document.querySelectorAll(".tagTitle"); //所有大分類按鈕
const allSpread = document.querySelectorAll(".tagSpread"); //所有標籤選單
const alltagButtons = document.querySelectorAll(".tagButtons"); //所有選中的按鈕

// 點擊外部任意區域時，關閉所有選單（包括我的預約區塊），並把被點擊的大分類按鈕常駐狀態取消
document.addEventListener("click", () => {
    allSpread.forEach((spread) => {
        spread.classList.remove("show");
    });

    allBigButtons.forEach((button) => {
        button.classList.remove("highlight");
    });

    myRequestForm.classList.remove("show");
    myRequestBtn.classList.remove("highlight");
});

//防止選單中的小標籤、或選單本身被點擊後，選單就被關閉 → 要保持該視窗打開，就要避免點擊事件往外傳
function spreadMaintain() {
    allSpread.forEach((div) => {
        div.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    });

    alltagButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    });

    myRequestForm.addEventListener("click", (e) => {
        e.stopPropagation();
    });
};

spreadMaintain();

//程度分類標籤開關顯示
levelBtn.addEventListener("click", (e) => {
    //點擊時，先清除所有大按鈕的點擊常駐狀態，然後再將當前按鈕加入常駐狀態
    allBigButtons.forEach((button) => {
        button.classList.remove("highlight");
    });

    levelBtn.classList.toggle("highlight");

    e.stopPropagation();
    //讓這個點擊事件只發生在levelBtn內，不要上傳到外面整個document，這樣可防止選單被  打開後，又馬上被關掉，視覺上看起來會像是選單一直打不開

    //先判斷程度選單是不是已經開著
    const wasOpen = levelSpread.classList.contains("show");

    //把所有選單清除
    allSpread.forEach((spread) => {
        spread.classList.remove("show")
    });

    //如果程度選單原本沒有打開，再打開
    if (!wasOpen) {
        levelSpread.classList.toggle("show");
    };

});

//口音分類標籤開關顯示
accentBtn.addEventListener("click", (e) => {
    //先清除所有大按鈕常駐狀態
    allBigButtons.forEach((button) => {
        button.classList.remove("highlight");
    });
    //再加入當前按鈕常駐狀態
    accentBtn.classList.toggle("highlight");

    e.stopPropagation();

    //先判斷口音選單是不是已經開著
    const wasOpen = accentSpread.classList.contains("show");

    allSpread.forEach((spread) => {
        spread.classList.remove("show")
    });

    if (!wasOpen) {
        accentSpread.classList.toggle("show");
    };
});

//主題分類標籤開關顯示
subjectBtn.addEventListener("click", (e) => {
    //先清除所有大按鈕常駐狀態
    allBigButtons.forEach((button) => {
        button.classList.remove("highlight");
    });
    //再加入當前按鈕常駐狀態
    subjectBtn.classList.toggle("highlight");

    e.stopPropagation();

    //先判斷主題選單是不是已經開著
    const wasOpen = subjectSpread.classList.contains("show");

    allSpread.forEach((spread) => {
        spread.classList.remove("show")
    });

    if (!wasOpen) {
        subjectSpread.classList.toggle("show");
    };
});

//教師卡片資訊
const tutors = [
    { //教師打上要render的資訊
        id: "tutor-01",
        name: "Emily Chen",
        photo: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor1_Emily%20Chen.png",
        accentText: "澳洲口音",
        rate: "97%",
        lessons: 365,
        levelText: "所有程度",
        specialtiesText: "日常對話、簡報與提案、Email寫作、旅遊情境會話",

        //供系統進行標籤分類的資訊
        levels: ["basic", "mid", "advanced"],
        accents: ["australian"],
        subjects: ["daily", "business", "travel"],

        headIcon: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor1_Icon_Emily%20Chen.png",

        url: "Post-totur-Emily.html"
    },
    {
        id: "tutor-02",
        name: "David Huang",
        photo: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor2_DavidHuang.png",
        accentText: "美國口音",
        rate: "92%",
        lessons: 298,
        levelText: "所有程度",
        specialtiesText: "日常對話、口語流暢度訓練、影視娛樂相關用語",

        //供系統進行標籤分類的資訊
        levels: ["basic", "mid", "advanced"],
        accents: ["american"],
        subjects: ["daily", "casual"],

        headIcon: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor2_Icon_David%20Huang.png",

        url: "#"
    },
    {
        id: "tutor-03",
        name: "Lindsey Lin",
        photo: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor3_Lindsey%20Lin.png",
        accentText: "澳洲口音",
        rate: "93%",
        lessons: 413,
        levelText: "所有程度",
        specialtiesText: "商務會議表達、Email寫作、面試準備",

        //供系統進行標籤分類的資訊
        levels: ["basic", "mid", "advanced"],
        accents: ["australian"],
        subjects: ["business"],

        headIcon: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor3_Icon_Lindsey%20Lin.png",

        url: "#"
    },
    {
        id: "tutor-04",
        name: "Philip Chang",
        photo: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor4_Philip%20Chang.png",
        accentText: "美國口音",
        rate: "90%",
        lessons: 307,
        levelText: "中階、進階英語",
        specialtiesText: "發音與語調修正、社交聊天應對、簡報與提案、面試準備",

        //供系統進行標籤分類的資訊
        levels: ["mid", "advanced"],
        accents: ["american"],
        subjects: ["daily", "business"],

        headIcon: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor4_Icon_Phili%20Chang.png",

        url: "#"
    },
    {
        id: "tutor-05",
        name: "Robert Kuo",
        photo: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor5_Robert%20Kuo.png",
        accentText: "英國口音",
        rate: "89%",
        lessons: 257,
        levelText: "基礎、中階英語",
        specialtiesText: "基礎句型應用、英語開口習慣養成、發音與語調修正、旅遊情境會話",

        //供系統進行標籤分類的資訊
        levels: ["basic", "mid"],
        accents: ["british"],
        subjects: ["daily", "travel"],

        headIcon: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor5_Icon_Robert%20Kuo.png",

        url: "#"
    },
    {
        id: "tutor-06",
        name: "Olivia Chen",
        photo: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor6_Olivia%20Chen.png",
        accentText: "英國口音",
        rate: "91%",
        lessons: 281,
        levelText: "所有程度",
        specialtiesText: "生活情境會話、口語流暢度訓練、面試準備、職場溝通英語",

        //供系統進行標籤分類的資訊
        levels: ["basic", "mid", "advanced"],
        accents: ["british"],
        subjects: ["daily", "business"],

        headIcon: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor6_Icon_Olivia%20Chen.png",

        url: "#"
    },
    {
        id: "tutor-07",
        name: "Grace Huang",
        photo: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor7_Grace%20Huang.png",
        accentText: "澳洲口音",
        rate: "96%",
        lessons: 346,
        levelText: "基礎、中階英語",
        specialtiesText: "社交聊天應對、口語流暢度訓練、商務會議表達、報告與說明技巧",

        //供系統進行標籤分類的資訊
        levels: ["basic", "mid"],
        accents: ["australian"],
        subjects: ["daily", "business"],

        headIcon: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor7_Icon_Grace%20Huang.png",

        url: "#"
    },
    {
        id: "tutor-08",
        name: "Tylor Hong",
        photo: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor8_Tylor%20Hong.png",
        accentText: "美國口音",
        rate: "89%",
        lessons: 233,
        levelText: "中階英語",
        specialtiesText: "商務書信、英文履歷與自介、面試準備",

        //供系統進行標籤分類的資訊
        levels: ["mid"],
        accents: ["american"],
        subjects: ["business"],

        headIcon: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor8_Icon_Tylor%20Hong.png",

        url: "#"
    },
    {
        id: "tutor-09",
        name: "Ryan Chen",
        photo: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor9_Ryan%20Chen1.png",
        accentText: "澳洲口音",
        rate: "90%",
        lessons: 160,
        levelText: "初階英語",
        specialtiesText: "英語開口習慣養成、發音與語調調整、社群網路用語、電玩主題用語",

        //供系統進行標籤分類的資訊
        levels: ["basic"],
        accents: ["australian"],
        subjects: ["daily", "casual"],

        headIcon: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor9_Icon_Ryan%20Chen.png",

        url: "#"
    },
    {
        id: "tutor-10",
        name: "Emily Carter",
        photo: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor10_Emily%20Carter.png",
        accentText: "美國口音",
        rate: "97%",
        lessons: 453,
        levelText: "中階、進階英語",
        specialtiesText: "社交聊天應對、旅遊情境會話、即時對話反應訓練",

        //供系統進行標籤分類的資訊
        levels: ["mid", "advanced"],
        accents: ["american"],
        subjects: ["daily", "travel"],

        headIcon: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor10_Icon_Emily%20Carter.png",

        url: "#"
    },
    {
        id: "tutor-11",
        name: "Emily Carter",
        photo: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor11_David%20Thompson.png",
        accentText: "英國口音",
        rate: "98%",
        lessons: 425,
        levelText: "進階英語",
        specialtiesText: "口語流暢度訓練、面試準備、簡報與提案、職場溝通英語",

        //供系統進行標籤分類的資訊
        levels: ["advanced"],
        accents: ["british"],
        subjects: ["daily", "business"],

        headIcon: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tuto11_Icon_David%20ThompSon.png",

        url: "#"
    },
    {
        id: "tutor-12",
        name: "Sophia Martinez",
        photo: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor12_Sophia%20Martinez.png",
        accentText: "澳洲口音",
        rate: "94%",
        lessons: 483,
        levelText: "中階、進階英語",
        specialtiesText: "發音與語調修正、社交聊天應對、自由對話練習、運動主題用語",

        //供系統進行標籤分類的資訊
        levels: ["mid", "advanced"],
        accents: ["australian"],
        subjects: ["daily", "casual"],

        headIcon: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor12_Icon_Sophia%20Martinez.png",

        url: "#"
    }
];

//按鈕常駐狀態設定
const allLevelButtons = document.querySelectorAll(".tagButtons.level"); //所有程度分類按鈕
const allLevelBtn = document.getElementById("allLevel"); // 等級all按鈕
const basicLevelBtn = document.getElementById("basicLevel"); // 初階等級按鈕
const midLevelBtn = document.getElementById("midLevel"); // 中階等級按鈕
const advancedLevelBtn = document.getElementById("advancedLevel"); // 進階等級按鈕

const allAccentButtons = document.querySelectorAll(".tagButtons.accentt"); //所有口音分類按鈕
const allAccentBtn = document.getElementById("allAccent"); // 口音all按鈕
const americanBtn = document.getElementById("americanAccent"); //美國口音按鈕
const britishBtn = document.getElementById("britishAccent"); //英國口音按鈕
const australianBtn = document.getElementById("australianAccent"); //澳洲口音按鈕

const allSubjectButtons = document.querySelectorAll(".tagButtons.subject"); //所有主題分類按鈕
const allSubjectBtn = document.getElementById("allSubject"); //主題all按鈕
const dailyBtn = document.getElementById("dailySubject"); //生活會話主題按鈕
const businessBtn = document.getElementById("businessSubject"); //商用英語主題按鈕
const travelBtn = document.getElementById("travelSubject"); //旅行英語主題按鈕
const casualBtn = document.getElementById("casualSubject"); //休閒及興趣主題按鈕

//等級按鈕點擊狀態常駐函式
function levelHighlight(activeBTN) {
    allLevelButtons.forEach((btn) => {
        btn.classList.remove("highlight") //先把全部按鈕都去除常駐class
    });
    activeBTN.classList.add("highlight") //再將當下點擊的目標按鈕加回常駐狀態
};

levelHighlight(allLevelBtn); //讓等級all按鈕成為一開始預設的常駐區域

//口音按鈕點擊狀態常駐函式
function accentHighlight(activeBTN) {
    allAccentButtons.forEach((btn) => {
        btn.classList.remove("highlight") //先把全部按鈕都去除常駐class
    });
    activeBTN.classList.add("highlight") //再將當下點擊的目標按鈕加回常駐狀態
};

accentHighlight(allAccentBtn); //讓口音all按鈕成為一開始預設的常駐區域

//主題按鈕點擊狀態常駐函式
function subjectHighlight(activeBTN) {
    allSubjectButtons.forEach((btn) => {
        btn.classList.remove("highlight") //先把全部按鈕都去除常駐class
    });
    activeBTN.classList.add("highlight") //再將當下點擊的目標按鈕加回常駐狀態
};

subjectHighlight(allSubjectBtn); //讓主題all按鈕成為一開始預設的常駐區域

// render教師卡片函式
const tutorContainer = document.getElementById("tutors"); //教師卡片放置區塊

function getSavedRequests() {
    return JSON.parse(localStorage.getItem("noctraTutorRequests")) || []; //讀取預約資料
}

const setTutorCards = (arr = tutors) => {
    const savedRequests = getSavedRequests(); //抓預約資料，供後面render教師卡片時，判斷預約按鈕是正常顯示，還是設定為"已送出申請"

    //arr = tutors 為預設參數，如果沒有傳入參數，就自動使用tutors資料作為參數

    // 無符合條件的資料時
    if (arr.length === 0) {
        tutorContainer.innerHTML = `
    <div class="emptyState">
      目前沒有符合條件的教師
    </div>
    `;
        return;
    }

    //有資料時，正常渲染教師卡片
    tutorContainer.innerHTML = arr.map(({ id, name, photo, accentText, rate, lessons, levelText, specialtiesText, url }) => {
        const hasPendingRequest = savedRequests.some((request) => {
            return request.tutorId === id && request.status === "pending";
        });

        const buttonText = hasPendingRequest ? "已送出申請" : "課程預約"; //如果已經有向同位教師送出申請了，且申請還未被確認，就無法再馬上申請第二次
        const buttonDisabled = hasPendingRequest ? "disabled" : ""; //如果已經有送過申請，就把按鈕加上disabled，防止點擊


        //教師卡架構
        return `
    <div class="tutorCard" data-id="${id}">
      <a class="tutorProfileLink" href="${url}" >
      <div class="selfieDiv">
        <img class="tutorSelfie" src="${photo}" alt="tutor:${name}" loading="lazy" decoding="async">
      </div>
      <div class="tutorInfo">
        <p class="tutorName">${name}</p>
       
        <div class="accent">
            <img class="infoIcon" src="https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/accentIcon2.png" alt=''>
            <p>${accentText}</p>
          </div>
          <div class="levels">
        <img class="infoIcon" src="https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/learningLevelIcon2.png" alt=''>
        <p>${levelText}，已教授 <span>${lessons}</span> 堂課   (<span>★ ${rate}</span>)</p>
      </div>
      <div class="specialties">
        <img class="infoIcon" src="https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/specialtyIcon.png" alt=''>
        <p>專長：${specialtiesText}</p>
      </div>
      </a>
      <button class="reserveBtn" ${buttonDisabled}>${buttonText}</button>
    </div>
  </div>
    `
    }).join("");

};

setTutorCards(); //初始化畫面

//篩選條件設定
let activeLevel = "all"; //程度條件，設定all可以理解為篩選條件不設限，顯示所有程度的卡片
let activeAccent = "all"; //口音條件
let activeSubject = "all"; //主題條件

//函式：讓程度、口音與主題條件必須同時成立
const applyFilters = () => {
    const filteredTutors = tutors.filter((tutor) => {
        //程度篩選條件設定
        const levelMatch = activeLevel === "all" || tutor.levels.includes(activeLevel);
        // "all" 是一個刻意設定的狀態值，因為沒另外建立篩選條件，所以這個狀態值就可以用來代表不啟用篩選機制，讓全部卡片通過


        //口音篩選條件設定
        const accentMatch = activeAccent === "all" || tutor.accents.includes(activeAccent);

        //主題篩選條件
        const subjectMatch = activeSubject === "all" || tutor.subjects.includes(activeSubject);

        return levelMatch && accentMatch && subjectMatch; //必須要三個篩選條件都符合才會顯示在畫面上

    });

    setTutorCards(filteredTutors);
};

//等級all按鈕設定
allLevelBtn.addEventListener("click", () => {
    activeLevel = "all";
    applyFilters();
    levelHighlight(allLevelBtn);
});

//初階英語按鈕
basicLevelBtn.addEventListener("click", () => {
    activeLevel = "basic";
    applyFilters();
    levelHighlight(basicLevelBtn);
});

//中階英語按鈕
midLevelBtn.addEventListener("click", () => {
    activeLevel = "mid";
    applyFilters();
    levelHighlight(midLevelBtn);
});

//進階英語按鈕
advancedLevelBtn.addEventListener("click", () => {
    activeLevel = "advanced";
    applyFilters();
    levelHighlight(advancedLevelBtn);
});

//口音all按鈕設定
allAccentBtn.addEventListener("click", () => {
    activeAccent = "all";
    applyFilters();
    accentHighlight(allAccentBtn);
});

//美國國口音按鈕
americanBtn.addEventListener("click", () => {
    activeAccent = "american";
    applyFilters();
    accentHighlight(americanBtn);
});

//英國口音按鈕
britishBtn.addEventListener("click", () => {
    activeAccent = "british";
    applyFilters();
    accentHighlight(britishBtn);
});

//澳洲口音按鈕
australianBtn.addEventListener("click", () => {
    activeAccent = "australian";
    applyFilters();
    accentHighlight(australianBtn);
});

//主題all按鈕設定
allSubjectBtn.addEventListener("click", () => {
    activeSubject = "all";
    applyFilters();
    subjectHighlight(allSubjectBtn);
});

//生活會話主題按鈕
dailyBtn.addEventListener("click", () => {
    activeSubject = "daily";
    applyFilters();
    subjectHighlight(dailyBtn);
});

//商用英語主題按鈕
businessBtn.addEventListener("click", () => {
    activeSubject = "business";
    applyFilters();
    subjectHighlight(businessBtn);
});

//旅行英語主題按鈕
travelBtn.addEventListener("click", () => {
    activeSubject = "travel";
    applyFilters();
    subjectHighlight(travelBtn);
});

//休閒與興趣主題按鈕
casualBtn.addEventListener("click", () => {
    activeSubject = "casual";
    applyFilters();
    subjectHighlight(casualBtn);
});

//預約申請表單建立
const directRequestForm = document.getElementById("directRequestForm"); //預約申請表單
const formTutorAvatar = document.getElementById("formTutorAvatar"); //預約表單教師頭像
const formTutorName = document.getElementById("formTutorName"); //預約表單教師姓名
const cancelBtn = document.getElementById("cancelBtn"); //預約取消按鈕
const makeRequestBtn = document.getElementById("makeRequestBtn"); //確認預約按鈕

const lessonDate = document.getElementById("lessonDate"); //表單中的希望日期
const lessonTime = document.getElementById("lessonTime"); //表單中的希望時段
const needNote = document.getElementById("needNote"); //表單中的需求備註區

//打開、建立預約表單函式
let currentTutorId = ""; //用來存教師的id資料

function openRequestForm(tutorData) {
    currentTutorId = tutorData.id;
    formTutorAvatar.src = tutorData.headIcon; //頭貼連結
    formTutorAvatar.alt = tutorData.name;

    formTutorName.textContent = tutorData.name; //教師姓名
    directRequestForm.classList.add("show"); //顯示預約表單
};

//當教師卡片上的預約申請按鈕被點擊時，就叫出表單，並放入對應教師資訊
//因為網頁中的教師卡片是透過js code render出來，並非固定的，所以這邊click監聽對象選用固定寫在html中的外層tutorContain會更好

tutorContainer.addEventListener("click", (e) => {
    //e是當瀏覽者點擊畫面時，js自動產生的事件物件，會記錄點擊的相關資訊
    //e.target則可以鎖定「真正被點中」的那個元素，在這邊用來找出預約按鈕

    if (e.target.classList.contains("reserveBtn")) {
        e.stopPropagation(); //避免事件冒泡至document，將表單關閉

        //把執行邏輯限縮在，只有真的是"預約課程"按鈕被點擊時，才執行

        const card = e.target.closest(".tutorCard")
        //從被點擊的按鈕往外找，找出該按鈕是屬於哪張教師卡片

        const tutorId = card.dataset.id;
        //找出之前在render教師卡時，為每張卡片建立的data-id屬性資訊

        const tutorData = tutors.find((tutor) => tutor.id === tutorId);
        //再利用該id資料回去找出先前建立的tutors陣列資料中，特定tutor的相關資訊
        //用find方法，可以直接回傳遞一個符合搜選條件的元素，所以這邊等於會回傳存取該名教師id的完整物件資訊

        openRequestForm(tutorData); //將教師物件資訊餵回給用來建立表單的函式
    }

});

//預約表單取消按鈕
cancelBtn.addEventListener("click", () => {
    lessonDate.value = "";
    lessonTime.value = "09:00";
    needNote.value = "";
    //初始化、清空原先的欄位資訊，避免開啟新表單時，舊有填寫的資料還在上面

    directRequestForm.classList.remove("show"); //關閉預約表單
});

//點擊外圍區域時，讓教師預約表單可以被關閉
document.addEventListener("click", () => {
    //確認教師預約表單已經是打開狀態，再將其關閉
    if (directRequestForm.classList.contains("show")) {
        directRequestForm.classList.remove("show");

        //重置表單內容
        lessonDate.value = "";
        lessonTime.value = "09:00";
        needNote.value = "";
    }
});

//防止教師表單的按鈕點擊事件冒泡，避免其上傳至document又將表單關閉
directRequestForm.addEventListener("click", (e) => {
    e.stopPropagation();
});

//我的預約狀態區塊顯示
const requestQuotaText = document.getElementById("requestQuota") //預約狀態中的剩餘預約次數顯示

//建立訂閱方案的預約額度
const planQuotaMap = {
    core: 1, //基礎方案可預約1次
    plus: 3 //進階方案可預約3次
};

const currentPlan = "plus"; //現在demo先定義為plus方案
const requestQuota = planQuotaMap[currentPlan]; //抓取現行方案的預約額度

let remainingQuota = localStorage.getItem("noctraRemainingQuota");
//抓取目前剩餘的預約次數

if (remainingQuota === null) {
    remainingQuota = requestQuota; //如果還沒有建立剩餘次數的localStorage的話，就讓剩餘次數等於方案的起始額度，並且建立localStorage
    localStorage.setItem("noctraRemainingQuota", remainingQuota);
} else {
    remainingQuota = Number(remainingQuota);
};

requestQuotaText.textContent = remainingQuota; //預約剩餘次數畫面顯示



//送出預約申請函式
makeRequestBtn.addEventListener("click", () => {
    const savedRequests = JSON.parse(localStorage.getItem("noctraTutorRequests")) || []
    //先在localStorage上找尋有無舊的預約資料，如果沒有就先建立一個空陣列，用來存放本次預約資料

    //查看同位教師，先前是否已經有建立過預約申請，且還未確認完畢，所以無法再馬上申請第二次
    const hasPendingRequest = savedRequests.some((request) => {
        return request.tutorId === currentTutorId && request.status === "pending"; //設定查詢條件是已經有同位教師id且還未確認完畢的預約資訊
    });
    //some是陣列方法，會針對陣列中的每個元素都執行一次篩選條件，只要有其中一個符合條件就會回傳true

    if (hasPendingRequest) {
        return; //防呆機制：如果已經有送出預約，且還未確認完畢的資料，就跳回
    }

    //防呆，確保預約日期與時段都有填寫
    if (!lessonDate.value || !lessonTime.value) {
        alert("請選擇希望上課日期與時間");
        return;
    }

    //預約剩餘次數是否足夠判斷
    if (remainingQuota <= 0) {
        alert("目前預約次數已滿");
        return
    }

    // confirm 視窗
    const confirmMessage = "申請送出後，教師將依照您的時段偏好與學習需求，進一步確認正式上課時間與授課方式。\n\n確定進行預約嗎？";
    const userConfirmed = confirm(confirmMessage);

    if (!userConfirmed) {
        return;
    }

    //確認預約時，建立對應的預約資訊，並存進localStorage
    //建立預約申請當下日期
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; //因為JS上的月份是從0開始算
    const date = now.getDate();

    //要顯示的完整預約日期資訊 
    const requestDate = `${year}/${month}/${date}`;

    //建立確認好的預約資訊
    const bookingData = {
        requestId: Date.now().toString(),
        //利用建立預約時的日期作為每筆預約的獨特Id，方便後續做取消預約功能時，可以找出個別預約資料，因為同一位教師姓名或教師id可能同時存在有多筆預約資料，所以不適合用其作為導引參數來做取消功能。

        studentName: currentNoctraUser.name, //預約學員的姓名
        studentEmail: currentNoctraUser.email, //學員信箱

        tutorId: currentTutorId,
        tutorName: formTutorName.textContent, //抓取表單中的教師姓名

        requestDate: requestDate, //抓取預約申請送出日期
        lessonDate: lessonDate.value, //抓取選擇的希望日期
        lessonTime: lessonTime.value, //抓取選擇的希望時段
        note: needNote.value, //抓取備註內容

        status: "pending",
        //代表此筆預約正在等待確認中，設計讓筆預約如果還未被確認的話，不能向同位教師馬上又預約第二次
        //這邊的資料後續可以用confirmed代表預約已確認、completed代表已上課完成、cancelled代表已取消
    }

    //把本次預約內容加進預約變數中儲存起來，並將預約變數儲存為localStorage，以利後續可以持續儲存不同的預約資料
    savedRequests.push(bookingData);
    localStorage.setItem("noctraTutorRequests", JSON.stringify(savedRequests));

    //成功預約後，預約次數減一
    remainingQuota -= 1;
    localStorage.setItem("noctraRemainingQuota", remainingQuota);
    requestQuotaText.textContent = remainingQuota;

    setTutorCards(); //更新、重新render一次畫面
    directRequestForm.classList.remove("show"); //送出申請後，關閉預約表單
    renderRequestList(); //送出申請後，即時更新預約區塊中的預約資訊
});

//我的預約區塊顯示
const requestList = document.getElementById("requestList"); //存放預約資料的容器
const latestRequestDate = document.getElementById("latestRequestDate"); //預約日期顯示
const latestRequestTutorName = document.getElementById("latestRequestTutorName"); //預約的教師姓名
const latestRequestPreferredTime = document.getElementById("latestRequestPreferredTime"); //預約偏好時段
const latestRequestNote = document.getElementById("latestRequestNote"); //預約需求備註
const latestRequestStatus = document.getElementById("latestRequestStatus"); //預約進度顯示

//更新預約區塊的函式 → 供一開始載入頁面初始化時跑一次，然後每次送出教師預約申請也跑一次
function renderRequestList() {
    const savedRequests = JSON.parse(localStorage.getItem("noctraTutorRequests")) || [];
    //先抓取localStorage存取的預約資料，如果未預約過，還沒有資料，就建立一個空陣列

    //當還未提出過預約申請時
    if (savedRequests.length === 0) {
        requestList.innerHTML = "<p id='emptyRequestText'>目前尚無預約紀錄</p>";
        return;
    }

    //利用...先展開各筆預約資料，然後將陣列中的元素順序顛倒，讓最新一筆資料可以優先顯示，最後再透過map，將陣列中的每筆資料進行處理後回傳
    requestList.innerHTML = [...savedRequests].reverse().map((request) => {
        let statusClass = ''; //供css切換狀態的class名稱

        //根據預約資料中的預約狀態，顯示對應文字內容
        if (request.status === "pending") {
            statusText = "等待確認中";
        } else if (request.status === "confirmed") {
            statusText = "已確認";
        } else if (request.status === "completed") {
            statusText = "已完成課程";
        } else if (request.status === "cancelled") {
            statusText = "已取消申請"
        }

        //製作取消預約的按鈕架構，只有在待確認狀態下的預約可以進行取消，然後把取消按鈕加入每筆預約資料的獨立Id
        let cancelButtonHTML = "";
        if (request.status === "pending") {
            cancelButtonHTML = `
        <button class="cancelRequestBtn" data-id="${request.requestId}">
          取消申請
        </button>
      `
        }

        return `
      <div class="recentRequestBox">
        <p class="requestDate">${request.requestDate}</p>
        <p>教師：<span class="requestTutorName">${request.tutorName}</span></p>
        <p>希望上課時間：<span class="requestPreferredTime">${request.lessonDate} ${request.lessonTime}</span></p>
        <p>備註：<span class="requestNote">${request.note || "—"}</span></p>
        <p class="statusRow">預約進度：<span class="requestStatus ${request.status}">${statusText}</span></p>
        ${cancelButtonHTML}
      </div>
    `
    }).join(""); //最後的join可以把「HTML字串陣列」合併成「一整段乾淨的HTML字串（沒有逗號）」
};

renderRequestList(); //載入頁面初始化時，先render一次預約狀態區塊內的資料

//取消預約功能函式
function cancelTutorRequest(requestId) {
    //先抓取localStorage存取的完整預約陣列資料
    const savedRequests = JSON.parse(localStorage.getItem("noctraTutorRequests")) || [];

    //再利用requestId從中抓出需要進行取消的"那一筆"資料
    const targetRequest = savedRequests.find((request) => {
        return request.requestId === requestId;
    });

    if (!targetRequest) {
        return;
    }

    if (targetRequest.status !== "pending") {
        return;
    }

    // confirm 視窗
    const confirmMessage = "確定取消此預約申請嗎？";
    const userConfirmed = confirm(confirmMessage);

    if (!userConfirmed) {
        return;
    }

    targetRequest.status = "cancelled"; //將目標預約資料的狀態更改為取消申請
    localStorage.setItem("noctraTutorRequests", JSON.stringify(savedRequests)); //修改完資料後，重新儲存回localStorage

    remainingQuota += 1; //取消預約後，預約額度要加1回去
    localStorage.setItem("noctraRemainingQuota", remainingQuota); //將更新後的額度存回localStroage

    requestQuotaText.textContent = remainingQuota //更新畫面上顯示的額度文字

    //接著重新render分頁上的教師卡片與我的預約狀態欄位，更新最新卡片狀態和資訊
    setTutorCards();
    renderRequestList();
}

//將預約取消按鈕加入對應函式功能
// !!!因為預約狀態視窗裡的資料與取消按鈕都是靠js render出來的，所以click監聽事件的綁定對象適合加在固定出現畫面中的requestList容器
requestList.addEventListener("click", (e) => {
    //當取消按鈕被點擊時
    if (e.target.classList.contains("cancelRequestBtn")) {
        const requestId = e.target.dataset.id; //抓取該取消按鈕上已經綁定的該筆預約資料獨立id

        //進一步套用在取消申請函式上
        cancelTutorRequest(requestId);
    }
});