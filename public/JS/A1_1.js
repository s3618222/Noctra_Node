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

// 載入youtube API
let tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

let player;
let hasStartedCourse = false; //防呆機制，確保使用者真的按下觀看影片

function onYouTubeIframeAPIReady() {
    player = new YT.Player("courseIframe", {
        events: {
            onReady: onPlayerReady
            //指當播放器準備好時，執行onPlayerReady這個函式
        }
    });
}


//紀錄正在撥放的課程影片進度函式
function onPlayerReady() {
    // resumeVideo(); → 之前會導致一進頁面，還沒點觀看按鈕就自己跑了。 記得之後要避免!

    setInterval(() => {
        // 防呆，如果課程還沒開始，就不做紀錄動作
        if (!hasStartedCourse) return;

        if (player && player.getCurrentTime) {
            const currentTime = player.getCurrentTime(); //取得影片進度
            const durationTime = player.getDuration(); //取得影片總時長

            const progressInfo = {
                currentTime: currentTime,
                duration: durationTime
            }

            localStorage.setItem(progress, JSON.stringify(progressInfo));
        }
    }, 2000); //每2秒記錄一次 
}

//抓取課程影片的播放進度，讓觀看課程時可以接續從先前的進度開始
function resumeVideo() {
    const saved = JSON.parse(localStorage.getItem(progress));

    if (!saved || saved.currentTime === undefined) return;

    const savedTime = saved.currentTime;
    const duration = saved.duration || 0;

    // 如果前次影片播放已經接近結尾時，就從頭開始
    if (duration > 0 && savedTime >= duration - 1) {
        player.seekTo(0);
    } else {
        player.seekTo(savedTime);
    }
}


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

//課程影片播放設定
const startClassBtn = document.getElementById("startClassBtn");
const classPreview = document.getElementById("classPreview"); //原先課程預覽圖
const classVideo = document.querySelector(".classVideo");
const videoPlayer = document.getElementById("videoPlayer"); //實際影片播放區
const courseVideo = document.getElementById("courseIframe"); //iframe影片元素
const hint = document.querySelector(".hint"); //錯誤後的題目提示文字

//更新、紀錄每堂進行中或已完成的課程資訊
function updateLearningCourses(courseId, status) {
    //先讀取、叫出整個進行中、已完成的課程清單資料
    const data = JSON.parse(localStorage.getItem("learningCourses")) || {};


    //寫入目前這門課程的資料，根據上課的流程、階段，將status輸入是in-progress或completed
    data[courseId] = {
        status: status,
        lastAccessed: Date.now(),
        level: "A1"
    };

    //最後再更新一次整個清單
    localStorage.setItem("learningCourses", JSON.stringify(data));
};

//紀錄課程基本資訊，讓JS抓取進行中的課程資訊
const courseInfo = {
    id: "a1_1",
    title: "Introducing Yourself & Small Talk (A1)",
    focus: "從簡單介紹自己開始，踏出英文開口的第一步。"
};

const progress = `course_${courseInfo.id}_progress`; // 供查看課程播放進度使用的變數

//播放影片按紐
startClassBtn.addEventListener("click", () => {
    hasStartedCourse = true; // 按下觀看按鈕，切換狀態，以便resumeVideo函式能運行

    classPreview.style.display = "none";
    videoPlayer.style.display = "flex";

    resumeVideo();
    player.mute();
    player.playVideo(); // 用 YT API 控制撥放影片

    //先記錄課程資訊，若後續學員沒有完成此課程，保持此紀錄，供後續在登入後的首頁可以銜接回進行中的課程
    localStorage.setItem("lastOpenedCourse", JSON.stringify(courseInfo));

    //將課程記錄至個人學習列表，並在此階段標記為進行中"in-progress"
    updateLearningCourses(courseInfo.id, "in-progress");
})

//課後練習設定
const postTest = document.getElementById("postTest");
const postTestBtn = document.getElementById("postTestBtn");
const answerBtn = document.getElementById("answerBtn");

const confirmBtn = document.getElementById("confirmBtn"); //獎勵提示後，確認按紐
const reWatchBtn = document.getElementById("reWatchBtn"); //已完成課程，重新觀看按鈕
const classComplete = document.getElementById("classComplete"); //已完成課程後的UI畫面


//課後練習開啟按紐
postTestBtn.addEventListener("click", () => {
    resetTest(); //進入作答區前，清除先前作答紀錄
    videoPlayer.style.display = "none";
    postTest.style.display = "block";
});

//獎勵腳色換裝設定
const rewardBase = document.getElementById("avatar-reward");
const rewardHead = document.getElementById("rewardHeadSlot");
const rewardBody = document.getElementById("rewardBodySlot");
const rewardBottom = document.getElementById("rewardBottomSlot");

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
    rewardBase.src = avatarAssets.base[savedAvatar.base];
    rewardHead.src = avatarAssets.head[savedAvatar.head].src;
    rewardBody.src = avatarAssets.body[savedAvatar.body].src;
    rewardBottom.src = avatarAssets.bottom[savedAvatar.bottom].src;
}

loadAvatarSystem(); //進頁面時，就先載入腳色造型設定

//對答案設定
const rewards = document.querySelector(".rewards"); //答對後，獎勵顯示區

//對答案按鈕
answerBtn.addEventListener("click", () => {
    const userResponse = document.querySelector("input[name='a1-test']:checked"); //抓取使用者選擇的答案選項
    const rightAnswer = "B"; //設定正確答案

    //沒有選答案時，提醒作答
    if (!userResponse) {
        alert("請先選擇一個答案！");
        return;
    };

    const shadowCover = document.getElementById("shadowCover");//彈出視窗後用的背景遮罩

    if (userResponse.value === rightAnswer) {
        //如果學員之前已經有完成過此課程，就不會有獎勵
        if (localStorage.getItem("course_a1_1_rewardClaimed") === "true") {
            alert("本課程獎勵已領取過，無法重複獲得學習幣。");
            postTest.style.display = "none";
            classComplete.style.display = "block";
        } else {
            alert("✨正確答案！✨");
            postTest.style.display = "none";
            rewards.style.display = "flex";
            classVideo.classList.add("correct");

            //背景遮罩打開
            shadowCover.style.display = "block";

            //避免課程影片區邊界露出
            classVideo.style.background = "transparent";
            classVideo.style.borderColor = "transparent";
            classVideo.style.boxShadow = "none";

            //讀取學習幣的總額資訊；若之前沒有儲存過學習幣資料，就設定為起始值100
            const currentCoins = Number(localStorage.getItem("noctraCoins")) || 100;
            //完成練習題，增加30枚學習幣
            const updatedCoins = currentCoins + 30;
            //接著再把已經加總完成的學習幣總額存回原先的noctraCoins localStorage資料
            localStorage.setItem("noctraCoins", updatedCoins);
        };
    } else {
        alert("再試試看，還有更合適的表達方式。");
        hint.style.display = "block";
    };
});

// 答對練習題後的獎勵確認按紐機制
confirmBtn.addEventListener("click", () => {
    localStorage.setItem("course_a1_1_completed", "true"); //紀錄課程已完成狀態
    localStorage.setItem("course_a1_1_rewardClaimed", "true"); //紀錄已領取過獎勵狀態
    localStorage.removeItem("lastOpenedCourse"); //已完成課程了，就將紀錄的課程資訊刪去

    //關閉背景遮罩
    shadowCover.style.display = "none";

    // 恢復課程影片區原本樣式
    classVideo.style.background = "#ffffff";
    classVideo.style.borderColor = "rgba(24, 33, 49, 0.08)";
    classVideo.style.boxShadow =
        "0 10px 30px rgba(15, 23, 42, 0.05), 0 2px 10px rgba(15, 23, 42, 0.03)";

    rewards.style.display = "none";
    classComplete.style.display = "block";
    classVideo.classList.remove("correct"); //把原本設定去除邊框border的狀態移除

    //當完成課程時，再把個人學習清單localStorage裡的這門課status更改為已完成"completed"
    updateLearningCourses(courseInfo.id, "completed");
});

//重置課後練習(消除hint、先前選擇的答案)===放在準備進入作答區的按鈕
function resetTest() {
    hint.style.display = "none";

    //清除之前選的答案
    const selectedAnswer = document.querySelector("input[name='a1-test']:checked");

    if (selectedAnswer) {
        selectedAnswer.checked = false;
    }
}

//重新觀課按鈕
reWatchBtn.addEventListener("click", () => {
    hasStartedCourse = true;

    videoPlayer.style.display = "block";
    classComplete.style.display = "none";

    localStorage.setItem("lastOpenedCourse", JSON.stringify(courseInfo));

    resumeVideo();     // 抓取先前播放進度位置
    player.mute();
    player.playVideo();   // 播放
});

// 載入頁面時，先檢查學員先前是否有上過此課程
function loadCourseStatus() {
    const isCompleted = localStorage.getItem("course_a1_1_completed");

    if (isCompleted === "true") {
        classPreview.style.display = "none";
        classComplete.style.display = "block";
    }
};

loadCourseStatus(); //一進畫面時，就先檢查是否先前有上過此課程