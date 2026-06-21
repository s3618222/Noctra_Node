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

// avatar 互動對話文字
const avatarWords = document.querySelector(".avatarWords");

//互動文字庫
const wordList = [
    "哈囉，我是你的 Noctra 學習夥伴。在「學習歷程」裡，你可以查看學習紀錄與進度，幫助你掌握學習步調。",
    "今天也很適合前進一點點。你可以從進行中的課程開始，慢慢累積自己的學習節奏。",
    "每完成一堂課，都是一次小小的進步。記得看看你的課程進度和成就徽章喔。",
    "不用急著一次完成所有內容。穩定回來學習，才是最重要的節奏。",
    "你的學習歷程會記錄每一步努力。準備好時，就挑選一門喜歡的課開始吧。",
    "如果不知道要從哪裡開始，可以先看看建議學習層級，再選擇適合自己的課程。"
];

// 隨機挑選互動訊息
function getRandomWords() {
    //取得隨機index，從文字庫中抓出對應文字
    let randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

// 更新 avatar 說話內容
function updateAvatarWords() {
    avatarWords.textContent = getRandomWords();
}

// 進入頁面時先隨機挑一句，之後每 8 秒更換一次
updateAvatarWords();
setInterval(updateAvatarWords, 8000);


// 個人基本學習資訊
const recommendLevel = document.getElementById("recommendLevel"); //建議的學習層級
const ownedCoins = document.getElementById("ownedCoins"); //持有學習幣數量
const currentLessons = document.getElementById("currentLessons"); //目前修讀課程數量

// 更新持有學習幣
// 如果是第一次進入沒有儲存紀錄，就設定為起始100
const coinInventory = Number(localStorage.getItem("noctraCoins")) || 100;
ownedCoins.textContent = `${coinInventory}`;

//抓取修讀中的課程數量
const data = JSON.parse(localStorage.getItem("learningCourses")) || {};

//將課程清單物件裡的值(in-progress、completed)全抓出來，建立成陣列，再藉由篩選in-progress，計算此陣列長度，就可以知道進行中的課程數
// !!!因為要變陣列後，才可以使用filter功能，所以必須透過Object.values( )來達成
const inProgressCount = Object.values(data).filter((course) => course.status === "in-progress").length;

function countingCurrentLessons() {
    if (inProgressCount > 0) {
        currentLessons.textContent = `你目前正在進行 ${inProgressCount} 門課程。`;
    };

    if (inProgressCount === 0) {
        currentLessons.textContent = "目前沒有正在進行的新課程。"
    };
};

countingCurrentLessons();

//所有課程卡片資訊
const courses = [
    {
        id: "a1_1",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/a1-1%20cover.png",
        title: "Introducing Yourself & Small Talk",
        intro: "學會基本自我介紹與寒暄，建立用英文開口的第一步。",
        level: "A1",
        url: "A1_1_course.html"
    },
    {
        id: "a1_2",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/a1-22%20cover.png",
        title: "Everyday Needs & Simple Requests",
        intro: "在旅遊與生活情境中，用英文完成簡單需求表達。",
        level: "A1",
        url: "#"
    },
    {
        id: "a2_1",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/a2-1ed%20cover.png",
        title: "Talking About Daily Life & Plans",
        intro: "練習描述生活經驗、行程安排與個人需求。",
        level: "A2",
        url: "#"
    },
    {
        id: "a2_2",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/a2-2ed%20cover.png",
        title: "Handling Everyday Services",
        intro: "應對常見服務與旅遊情境，讓日常溝通更順暢。",
        level: "A2",
        url: "#"
    },
    {
        id: "b1_1",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/b1-1ed%20cover.png",
        title: "Expressing Opinions at Work",
        intro: "在會議與討論中，清楚表達意見與想法。",
        level: "B1",
        url: "B1_1_course.html"
    },
    {
        id: "b1_2",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/b1-2ed%20cover.png",
        title: "Workplace Conversations & Short Presentations",
        intro: "處理日常職場溝通，並完成簡單的英文簡報。",
        level: "B1",
        url: "B1_2_course.html"
    },
    {
        id: "b2_1",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/b2-1ed%20cover.png",
        title: "Professional Presentations & Explanations",
        intro: "進行完整的專業說明，讓你的觀點更有說服力。",
        level: "B2",
        url: "#"
    },
    {
        id: "b2_2",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/b2-2ed%20cover.png",
        title: "Cross-Cultural Communication",
        intro: "練習跨文化溝通，在雙語環境中自在互動。",
        level: "B2",
        url: "#"
    },
    {
        id: "c1_1",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/c1-1ed%20cover.png",
        title: "Strategic Discussions & Decision-Making",
        intro: "在專業場合中進行策略性討論與觀點辯證。",
        level: "C1",
        url: "C1_1_course.html"
    },
    {
        id: "c1_2",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/c1-2ed%20cover.png",
        title: "Adjusting Tone for Different Audiences",
        intro: "依對象與情境調整語氣，精準傳達複雜想法。",
        level: "C1",
        url: "#"
    },
    {
        id: "c2_1",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/c2-1ed%20cover.png",
        title: "Advanced Professional Communication",
        intro: "在高階專業與國際場合中，進行深入而自然的交流。",
        level: "C2",
        url: "#"
    },
    {
        id: "c2_2",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/c2-22ED%20cover.png",
        title: "Nuance, Implicit Meaning & Cultural Context",
        intro: "理解隱含語意與文化脈絡，讓表達更細膩精準。",
        level: "C2",
        url: "#"
    },
];

//抓取進行中的課程，並渲染為畫面上的課程卡片
const ongoingCourseCards = document.querySelector(".ongoingCourseCards"); //進行中的課程卡片區塊

//抓出進行中的所有課程Id，存成一個陣列。
const inProgressCourseIds = Object.entries(data).filter(([courseId, courseInfo]) => courseInfo.status === "in-progress").map(([courseId]) => courseId);

//在課程清單中，利用剛剛取得的進行中課程id，來篩選出對應的課程卡片
const inProgressCourses = courses.filter((course) => inProgressCourseIds.includes(course.id));

//計算課程的進度百分比
function getCourseProgress(courseId) {
    const savedProgress = JSON.parse(localStorage.getItem(`course_${courseId}_progress`));
    if (!savedProgress || !savedProgress.duration) {
        return 0; //如果沒有進度資料，就是還沒開始，設定0
    };

    const progressPercent = Math.floor(savedProgress.currentTime / savedProgress.duration * 100);
    return progressPercent;
};

const inProgressCards = inProgressCourses.map((course) => {
    return {
        ...course,
        progress: getCourseProgress(course.id)
    }; //更新一份帶有進度百分比的正在進行中課程資料
});

//更新進行中課程區塊的畫面顯示
function renderOngoingCourses(courseArr) {
    ongoingCourseCards.innerHTML = courseArr.map((course) => {
        //課程卡片架構
        return ` 
    <a class="courseCards" href="${course.url}" data-id="${course.id}">
        <img class="courseImg" src="${course.link}" alt="${course.title}">
        <p><i>${course.level}</i></p>
        <p class="cardTitle">${course.title}</p>
        <p class="courseDesc">${course.intro}</p>
        <div class="courseStatusWrap">
          <span class="courseStatus inProgress">進行中</span>
          <div class="courseProgressBar">
            <div class="courseProgressFill inProgress" style="width: ${course.progress}%"></div>
          </div>
        </div>
      </a>
    `
    }).join("");
}

renderOngoingCourses(inProgressCards);


//抓取已完成的課程，並更新畫面
const completedCourseCards = document.querySelector(".completedCourseCards"); //已完成的課程卡片區塊

//抓出已完成的課程Id，存成一個陣列。
const completedCourseIds = Object.entries(data).filter(([courseId, courseInfo]) => courseInfo.status === "completed").map(([courseId]) => courseId);

//在課程清單中，篩選出對應的課程卡片
const completedCourses = courses.filter((course) => completedCourseIds.includes(course.id));

const completedCards = completedCourses.map((course) => {
    return {
        ...course,
        progress: 100
    }; //將課程資料加上進度條100資訊
});

//更新已完成課程的畫面顯示
function renderCompletedCourses(courseArr) {
    completedCourseCards.innerHTML = courseArr.map((course) => {
        //課程卡片架構
        return ` 
    <a class="courseCards" href="${course.url}" data-id="${course.id}">
        <img class="courseImg" src="${course.link}" alt="${course.title}">
        <p><i>${course.level}</i></p>
        <p class="cardTitle">${course.title}</p>
        <p class="courseDesc">${course.intro}</p>
        <div class="courseStatusWrap">
          <span class="courseStatus completed">已完成</span>
          <div class="courseProgressBar">
            <div class="courseProgressFill inProgress" style="width: 100%"></div>
          </div>
        </div>
      </a>
    `
    }).join("");
}

renderCompletedCourses(completedCards);

//沒有進行中，或已完成課程時的UI顯示
const noOngoingCourse = document.querySelector(".noOngoingCourse"); //無進行中課程區塊
const noCompletedCourse = document.querySelector(".noCompletedCourse"); //無已完成課程區塊
const ongoingCourseWrap = document.querySelector(".ongoingCourse .courseWrap");//進行中的卡片區
const completedCourseWrap = document.querySelector(".completedCourse .courseWrap");//已完成的卡片區


function renderNoGoingCourse() {
    if (!inProgressCourseIds || inProgressCourseIds.length === 0) {
        noOngoingCourse.style.display = "block"; // 沒有進行中的課程時，叫出此畫面
        ongoingCourseWrap.classList.add('empty'); //把用來放進行中的卡片區隱藏
    } else {
        noOngoingCourse.style.display = "none";
        ongoingCourseWrap.classList.remove('empty'); //打開進行中的卡片區
    }
};

renderNoGoingCourse();

function renderNoCompletedCourse() {
    if (!completedCourseIds || completedCourseIds.length === 0) {
        noCompletedCourse.style.display = "block"; // 沒有已完成的課程時，叫出此畫面
        completedCourseWrap.classList.add('empty'); // 把放已完成卡片的區塊隱藏 
    } else {
        noCompletedCourse.style.display = "none";
        completedCourseWrap.classList.remove('empty'); // 把已完成卡片區打開
    }
};

renderNoCompletedCourse();

//徽章成就區塊
const a1Badge = document.getElementById("a1Badge"); // a1徽章
const a2Badge = document.getElementById("a2Badge"); // a2徽章
const b1Badge = document.getElementById("b1Badge"); // b1徽章
const b2Badge = document.getElementById("b2Badge"); // b2徽章
const c1Badge = document.getElementById("c1Badge"); // c1徽章
const c2Badge = document.getElementById("c2Badge"); // c2徽章

//抓出各層級已完成的課程ID
const a1CompletedCourses = Object.entries(data).filter(([courseId, courseInfo]) => courseInfo.status === "completed" && courseInfo.level === "A1").map(([courseId]) => courseId);

const a2CompletedCourses = Object.entries(data).filter(([courseId, courseInfo]) => courseInfo.status === "completed" && courseInfo.level === "A2").map(([courseId]) => courseId);

const b1CompletedCourses = Object.entries(data).filter(([courseId, courseInfo]) => courseInfo.status === "completed" && courseInfo.level === "B1").map(([courseId]) => courseId);

const b2CompletedCourses = Object.entries(data).filter(([courseId, courseInfo]) => courseInfo.status === "completed" && courseInfo.level === "B2").map(([courseId]) => courseId);

const c1CompletedCourses = Object.entries(data).filter(([courseId, courseInfo]) => courseInfo.status === "completed" && courseInfo.level === "C1").map(([courseId]) => courseId);

const c2CompletedCourses = Object.entries(data).filter(([courseId, courseInfo]) => courseInfo.status === "completed" && courseInfo.level === "C2").map(([courseId]) => courseId);

//更新徽章成就函式
function renderBadges() {
    // 若a1層級兩門課程皆完成，就顯示a1的badge
    if (a1CompletedCourses.length === 2) {
        a1Badge.style.display = "flex"
    };

    if (a2CompletedCourses.length === 2) {
        a2Badge.style.display = "flex"
    };

    if (b1CompletedCourses.length === 2) {
        b1Badge.style.display = "flex"
    };

    if (b2CompletedCourses.length === 2) {
        b2Badge.style.display = "flex"
    };

    if (c1CompletedCourses.length === 2) {
        c1Badge.style.display = "flex"
    };

    if (c2CompletedCourses.length === 2) {
        c2Badge.style.display = "flex"
    };
};

renderBadges();

//建議學習層級相關功能設定
const levels = ["A1", "A2", "B1", "B2", "C1", "C2"]; //層級順序清單

//抓取能力定位測驗結果
function getPlacementLevel() {
    return localStorage.getItem("placementLevel") || "A1";
};

// 抓出所有已完成課程 ID
function getCompletedCourseIds() {
    return Object.entries(data)
        .filter(([courseId, courseInfo]) => courseInfo.status === "completed")
        .map(([courseId]) => courseId);
}

// 抓某一層級的所有課程
function getCoursesByLevel(level) {
    return courses.filter((course) => course.level === level);
}

// 判斷某層級課程是否全數完成
function isLevelFullyCompleted(level) {
    const levelCourses = getCoursesByLevel(level); //先取得該層級所有課程
    const completedIds = getCompletedCourseIds(); //取得使用者目前已完成的課程清單

    if (levelCourses.length === 0) return false;

    //查看已完成課程清單中，是否有包含該層級的所有課程 → 等同檢查該層級課程是否都已完成
    return levelCourses.every((course) => completedIds.includes(course.id));
}

// 找出「已完整完成」的最高層級
function getHighestLevel() {
    const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
    let highestLevel = null;

    levels.forEach((level) => {
        if (isLevelFullyCompleted(level)) {
            highestLevel = level;
            //依序查看層級列表中的課程是否都已完成，最後吻合的剛好就會是「已完整完成」中的最高級
        }
    });

    return highestLevel;
}

// 取得建議層級函示
function getRecommendedLevel() {
    const placementLevel = getPlacementLevel(); //能力定位的層級結果
    const highestCompletedLevel = getHighestLevel(); //學員完成所有課程的最高層級

    // 沒完成任何層級時，就回傳測驗結果
    if (!highestCompletedLevel) {
        return placementLevel;
    }

    //取得層級在清單中的index數字，數字較大即等同層級較高
    const placementIndex = levels.indexOf(placementLevel);
    const completedIndex = levels.indexOf(highestCompletedLevel);

    // 下一層（升級）
    const nextIndex = completedIndex + 1;

    // 如果還有下一層
    if (levels[nextIndex]) {
        return levels[Math.max(placementIndex, nextIndex)];
        //Math.max會回傳括號內的最大值，所以可以達到比較層級高低的功能
    }

    // 已經最高層
    return levels[Math.max(placementIndex, completedIndex)];
}

//更新建議層級畫面
function renderRecommendedLevel() {
    const level = getRecommendedLevel();

    recommendLevel.textContent = level;

    // 存給首頁用
    localStorage.setItem("noctraRecommendedLevel", level);
}

renderRecommendedLevel();

//學習歷程avatar開關
const avatar = document.querySelector(".progressAvatar"); //角色卡區塊
const avatarBtn = document.querySelector(".avatar-toggle"); //腳色開關

avatarBtn.addEventListener("click", () => {
    avatar.classList.toggle("hidden"); //點下按鈕時，可關閉or打開角色
})

//學習歷程avatar換裝設定
const progressBase = document.getElementById("avatar-progress");
const progressHead = document.getElementById("progressHeadSlot");
const progressBody = document.getElementById("progressBodySlot");
const progressBottom = document.getElementById("progressBottomSlot");

const avatarAssets = { //avatar所有素材
    base: [ //角色基底圖
        "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/Avatar_Assets/baseAvatar1.png",
        "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/Avatar_Assets/baseAvatar5.png",
        "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/Avatar_Assets/baseAvatar4.png"
    ],

    head: [
        {  //帽子配件圖
            id: "head-none",
            src: "",
            price: 0
        },
        {
            id: "baseball-cap",
            src: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/Avatar_Assets/head-baseballCap.png",
            price: 30
        },
        {
            id: "beret",
            src: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/Avatar_Assets/head-berethat2.png",
            price: 30
        },
        {
            id: "bucket-hat",
            src: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/Avatar_Assets/head-bucketHat2.png",
            price: 30
        }
    ],

    body: [
        {//衣服配件圖
            id: "body-none",
            src: "",
            price: 0
        },
        {
            id: "sweatshirt",
            src: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/Avatar_Assets/body-sweatshirt4.png",
            price: 50
        },
        {
            id: "shirt",
            src: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/Avatar_Assets/body-shirt2.png",
            price: 50
        },
        {
            id: "polo-shirt",
            src: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/Avatar_Assets/body-polo2.png",
            price: 50
        }
    ],

    bottom: [
        {//褲子配件圖
            id: "bottom-none",
            src: "",
            price: 0
        },
        {
            id: "jeans",
            src: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/Avatar_Assets/bottom-jeans.png",
            price: 50
        },
        {
            id: "chinos",
            src: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/Avatar_Assets/bottom-chinos2.png",
            price: 50
        },
        {
            id: "trousers",
            src: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/Avatar_Assets/bottom-trousers.png",
            price: 50
        },
    ],

    //後續把所有素材的src放進這裡!!!
};

//讀取在登入後首頁的avatar設定
function loadAvatarSystem() {
    const savedAvatar = JSON.parse(localStorage.getItem("avatarMemory")) || {
        base: 0,
        head: 0,
        body: 0,
        bottom: 0
    };

    //換裝實穿
    progressBase.src = avatarAssets.base[savedAvatar.base];
    progressHead.src = avatarAssets.head[savedAvatar.head].src;
    progressBody.src = avatarAssets.body[savedAvatar.body].src;
    progressBottom.src = avatarAssets.bottom[savedAvatar.bottom].src;
}

loadAvatarSystem(); //進頁面時，就先載入腳色造型設定