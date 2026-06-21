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

//所有按鈕
const labelButtons = document.querySelectorAll(".labelButtons");

const progressButtons = document.querySelectorAll(".progressButtons");

//課程等級分類按鈕
const allButton = document.getElementById("allButton");
const a1Button = document.getElementById("a1Button");
const a2Button = document.getElementById("a2Button");
const b1Button = document.getElementById("b1Button");
const b2Button = document.getElementById("b2Button");
const c1Button = document.getElementById("c1Button");
const c2Button = document.getElementById("c2Button");

//課程進度按鈕
const allProgressButton = document.getElementById("allProgressButton");
const yetButton = document.getElementById("yetButton");
const inProgressButton = document.getElementById("inProgressButton");
const completeButton = document.getElementById("completeButton");

//課程卡片資訊
const courses = [
    {
        id: "a1_1",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/a1-1%20cover.png",
        title: "Introducing Yourself & Small Talk",
        intro: "學會基本自我介紹與寒暄，建立用英文開口的第一步。",
        level: "A1",
        progress: getCompletedCourse("a1_1"),
        url: "A1_1_course.html"
    },
    {
        id: "a1_2",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/a1-22%20cover.png",
        title: "Everyday Needs & Simple Requests",
        intro: "在旅遊與生活情境中，用英文完成簡單需求表達。",
        level: "A1",
        progress: getCompletedCourse("a1_2"),
        url: "#"
    },
    {
        id: "a2_1",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/a2-1ed%20cover.png",
        title: "Talking About Daily Life & Plans",
        intro: "練習描述生活經驗、行程安排與個人需求。",
        level: "A2",
        progress: getCompletedCourse("a2_1"),
        url: "#"
    },
    {
        id: "a2_2",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/a2-2ed%20cover.png",
        title: "Handling Everyday Services",
        intro: "應對常見服務與旅遊情境，讓日常溝通更順暢。",
        level: "A2",
        progress: getCompletedCourse("a1_2"),
        url: "#"
    },
    {
        id: "b1_1",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/b1-1ed%20cover.png",
        title: "Expressing Opinions at Work",
        intro: "在會議與討論中，清楚表達意見與想法。",
        level: "B1",
        progress: getCompletedCourse("b1_1"),
        url: "B1_1_course.html"
    },
    {
        id: "b1_2",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/b1-2ed%20cover.png",
        title: "Workplace Conversations & Short Presentations",
        intro: "處理日常職場溝通，並完成簡單的英文簡報。",
        level: "B1",
        progress: getCompletedCourse("b1_2"),
        url: "B1_2_course.html"
    },
    {
        id: "b2_1",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/b2-1ed%20cover.png",
        title: "Professional Presentations & Explanations",
        intro: "進行完整的專業說明，讓你的觀點更有說服力。",
        level: "B2",
        progress: getCompletedCourse("b2_1"),
        url: "#"
    },
    {
        id: "b2_2",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/b2-2ed%20cover.png",
        title: "Cross-Cultural Communication",
        intro: "練習跨文化溝通，在雙語環境中自在互動。",
        level: "B2",
        progress: getCompletedCourse("b2_2"),
        url: "#"
    },
    {
        id: "c1_1",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/c1-1ed%20cover.png",
        title: "Strategic Discussions & Decision-Making",
        intro: "在專業場合中進行策略性討論與觀點辯證。",
        level: "C1",
        progress: getCompletedCourse("c1_1"),
        url: "C1_1_course.html"
    },
    {
        id: "c1_2",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/c1-2ed%20cover.png",
        title: "Adjusting Tone for Different Audiences",
        intro: "依對象與情境調整語氣，精準傳達複雜想法。",
        level: "C1",
        progress: getCompletedCourse("c1_2"),
        url: "#"
    },
    {
        id: "c2_1",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/c2-1ed%20cover.png",
        title: "Advanced Professional Communication",
        intro: "在高階專業與國際場合中，進行深入而自然的交流。",
        level: "C2",
        progress: getCompletedCourse("c2_1"),
        url: "#"
    },
    {
        id: "c2_2",
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/c2-22ED%20cover.png",
        title: "Nuance, Implicit Meaning & Cultural Context",
        intro: "理解隱含語意與文化脈絡，讓表達更細膩精準。",
        level: "C2",
        progress: getCompletedCourse("c2_2"),
        url: "#"
    },
];
//抓取JS上進行中課程的進度時間，計算進度比
function getCourseProgress(courseId) {
    const saved = JSON.parse(localStorage.getItem(`course_${courseId}_progress`));

    if (!saved || !saved.currentTime || !saved.duration) {
        return 0; //資料不存在，等同進度0，未開始
    };

    //計算課程的進度百分比
    const percent = Math.round((saved.currentTime / saved.duration) * 100);
    return Math.min(percent, 100); //回傳百分比資料
    //故意設定取得與100中較小的值，作為防呆機制，避免超出100
};

//抓取js上「已完成」的課程資料
function getCompletedCourse(courseId) {
    const completedCourse = localStorage.getItem(`course_${courseId}_completed`);

    //如果是已完成的，就直接回傳100
    if (completedCourse === "true") {
        return 100;
    }

    //沒完成的課就另外去計算影片進度是多少
    return getCourseProgress(courseId);
}


//等級按鈕點擊常駐狀態函式
function buttonHighlight(activeBTN) {
    labelButtons.forEach((btn) => {
        btn.classList.remove("highlight") //先把全部按鈕都去除常駐class
    });
    activeBTN.classList.add("highlight") //再將當下點擊的目標按鈕加回常駐狀態
};

buttonHighlight(allButton); //讓總攬區域成為一開始預設的常駐區域

//進度按鈕點擊常駐狀態函式
function progressHighlight(activeBTN) {
    progressButtons.forEach((btn) => {
        btn.classList.remove("highlight")
    });
    activeBTN.classList.add("highlight")
};

progressHighlight(allProgressButton);


//抓取課程進度狀態
const getCourseStatus = (progress) => {
    if (progress === 0) return "未開始";
    if (progress === 100) return "已完成";
    return "進行中";
};

const getStatusClass = (progress) => {
    if (progress === 0) return "notStarted";
    if (progress === 100) return "completed";
    return "inProgress";
};

//設定課程卡片函式
const courseDiv = document.querySelector(".courseDiv");
const setCourseCards = (arr = courses) => {  //arr= courses的寫法是預設參數，代表如果沒傳參數，就自動用courses
    // 無符合條件的資料
    if (arr.length === 0) {
        courseDiv.innerHTML = `
    <div class="emptyState">
      目前沒有符合條件的課程
    </div>
    `;
        return;
    }


    //有資料時，正常render卡片
    courseDiv.innerHTML = arr.map(({ id, link, title, intro, level, progress, url }) => {
        const statusText = getCourseStatus(progress); //抓進度文字標籤
        const statusClass = getStatusClass(progress); //抓進度分類class名稱

        //課程卡片架構
        return `
    <a class="courseCards" href="${url}" data-id="${id}">
      <img class="courseImg" src="${link}" alt="${title}">
      <p><i>${level}</i></p>
      <p class="cardTitle">${title}</p>
      <p class="courseDesc">${intro}</p>
      <div class="courseStatusWrap">
        <span class="courseStatus ${statusClass}">${statusText}</span>
        <div class="courseProgressBar">
          <div class="courseProgressFill ${statusClass}" style="width: ${progress}%"></div>
        </div>
      </div>
    </a>
    `
    }).join("");
};

setCourseCards(); //初始化畫面

//篩選條件設定
let activeLevel = "all";  //等級條件
let activeProgress = "all"; // 進度條件

// 函式：讓等級和進度的篩選條件必須同時成立
const applyFilters = () => {
    const filteredCourses = courses.filter((course) => {
        const levelMatch =
            activeLevel === "all" || course.level === activeLevel;

        const progressMatch =
            activeProgress === "all" ||
            (activeProgress === "notStarted" && course.progress === 0) ||
            (activeProgress === "inProgress" && course.progress > 0 && course.progress < 100) ||
            (activeProgress === "completed" && course.progress === 100);

        return levelMatch && progressMatch;
    });

    setCourseCards(filteredCourses);
};


// 等級總攬按鈕
allButton.addEventListener("click", () => {
    activeLevel = "all";
    applyFilters();
    buttonHighlight(allButton);
});


// A1按鈕
a1Button.addEventListener("click", () => {
    activeLevel = "A1";
    applyFilters();
    buttonHighlight(a1Button);
});

// A2按鈕
a2Button.addEventListener("click", () => {
    activeLevel = "A2";
    applyFilters();
    buttonHighlight(a2Button);
});

// B1按鈕
b1Button.addEventListener("click", () => {
    activeLevel = "B1";
    applyFilters();
    buttonHighlight(b1Button);
});

// B2按鈕
b2Button.addEventListener("click", () => {
    activeLevel = "B2";
    applyFilters();
    buttonHighlight(b2Button);
});

// C1按鈕
c1Button.addEventListener("click", () => {
    activeLevel = "C1";
    applyFilters();
    buttonHighlight(c1Button);
});

// C2按鈕
c2Button.addEventListener("click", () => {
    activeLevel = "C2";
    applyFilters();
    buttonHighlight(c2Button);
});

// 進度總攬按鈕
allProgressButton.addEventListener("click", () => {
    activeProgress = "all";
    applyFilters();
    progressHighlight(allProgressButton);
});

// 未開始按鈕
yetButton.addEventListener("click", () => {
    activeProgress = "notStarted";
    applyFilters();
    progressHighlight(yetButton);
});

// 進行中按鈕
inProgressButton.addEventListener("click", () => {
    activeProgress = "inProgress";
    applyFilters();
    progressHighlight(inProgressButton);
});


// 已完成按鈕
completeButton.addEventListener("click", () => {
    activeProgress = "completed";
    applyFilters();
    progressHighlight(completeButton);
});

applyFilters(); //初始畫面