const currentNoctraUser = JSON.parse(localStorage.getItem("currentNoctraUser")); //抓取目前登入者資訊

//未登入下的防呆機制，跳轉回登入頁面
if (!currentNoctraUser) {
    window.location.href = "sign-in.html";
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

//分頁教師資訊
const tutor = {
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

    headIcon: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/indieTutorPage/tutor1_Icon_Emily%20Chen.png"
};


const tutorHeroName = document.getElementById("tutorHeroName"); //hero區教師姓名
const tutorHeroHead = document.getElementById("tutorHeroHead"); //hero區教師小頭像

const accentText = document.getElementById("accentText"); //hero區教師口音文字顯示
const tutorRate = document.getElementById("tutorRate"); //hero區教師評價顯示
const lessonsTaught = document.getElementById("lessonsTaught"); //hero區教師授課數顯示
const teachingLevel = document.getElementById("teachingLevel"); //hero區教學層級文字顯示

tutorHeroName.textContent = tutor.name;
tutorHeroHead.src = tutor.headIcon;
tutorHeroHead.alt = `${tutor.name} tutor portrait`;
accentText.textContent = tutor.accentText;
tutorRate.textContent = tutor.rate;
lessonsTaught.textContent = tutor.lessons;
teachingLevel.textContent = tutor.levelText;

//課程預約表單
const tutorPhoto = document.getElementById("tutorPhoto"); //課程表單區教師照片
const remainingQuota = document.getElementById("remainingQuota"); //表單顯示剩餘預約次數文字
const makeRequestBtn = document.getElementById("makeRequestBtn"); //預約申請按鈕
const cancelBtn = document.getElementById("cancelBtn"); //取消申請按鈕

const lessonDate = document.getElementById('lessonDate');
const lessonTime = document.getElementById('lessonTime');
const needNote = document.getElementById('needNote');
const formTutorName = document.getElementById('formTutorName');

tutorPhoto.src = tutor.photo;
tutorPhoto.alt = "tutor profile photo";

//以下特別注意!!!!!!!!!!!

//建立預約額度函式
function getQuota() {
    //建立訂閱方案的預約額度
    const planQuotaMap = {
        core: 1, //基礎方案可預約1次
        plus: 3 //進階方案可預約3次
    };

    //現在demo先定義為plus方案 (後面可再考慮另外單獨設一個localStorage，儲存目前方案）
    const currentPlan = localStorage.getItem("noctraCurrentPlan") || "plus";
    //初始化quota額度，這樣學員若是第一次登入平台就直接進入教師獨立分頁時，才可以正確顯示剩餘預約次數
    const defaultQuota = planQuotaMap[currentPlan] || 0;

    //抓取localStorage上儲存的剩餘預約次數
    const savedQuota = localStorage.getItem("noctraRemainingQuota");
    // 如果還沒有資料 → 用訂閱方案的預設額度
    if (savedQuota === null) {
        localStorage.setItem("noctraRemainingQuota", defaultQuota);
        return defaultQuota;
    } else {
        //如果有資料 → 直接使用
        return Number(savedQuota);
    };
}

//課程預約表單剩餘次數顯示
let noctraQuota = getQuota();
remainingQuota.textContent = noctraQuota;

//送出預約申請函式
let currentTutorId = tutor.id; //用來儲存目前分頁教師的id資料

//預約申請按鈕、表單內容狀態更換函式
function buttonStatus() {
    const savedRequests = JSON.parse(localStorage.getItem("noctraTutorRequests")) || []
    //先在localStorage上找尋有無舊的預約資料，如果沒有就先建立一個空陣列，用來存放本次預約資料

    //查看同位教師，先前是否已經有建立過預約申請，且還未確認完畢，所以無法再馬上申請第二次
    const hasPendingRequest = savedRequests.some((request) => {
        return request.tutorId === currentTutorId && request.status === "pending"; //設定查詢條件是已經有同位教師id且還未確認完畢的預約資訊
    });
    //some是陣列方法，會針對陣列中的每個元素都執行一次篩選條件，只要有其中一個符合條件就會回傳true

    if (hasPendingRequest) {
        //已預約過，按鈕更改為"已送出申請"，並且不能在被點擊
        makeRequestBtn.textContent = "已送出申請";
        makeRequestBtn.disabled = true;
        cancelBtn.style.display = "block"; //顯示取消預約按鈕

        //已預約過，就鎖住表單，讓日期、時段跟需求註記區塊不能編輯
        lessonDate.disabled = true;
        lessonTime.disabled = true;
        needNote.readOnly = true;
        //相比disabled會讓區塊完全不能操作與通常變灰，readOnly則是讓使用者還是能選取文字，但不能修改

    } else {
        makeRequestBtn.textContent = "課程預約"
        makeRequestBtn.disabled = false;
        cancelBtn.style.display = "none";

        //表單內容恢復可編輯
        lessonDate.disabled = false;
        lessonTime.disabled = false;
        needNote.readOnly = false;
    };
}

buttonStatus(); //初始化按鈕狀態


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
    if (noctraQuota <= 0) {
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

        studentName: currentNoctraUser.name, //抓取學員姓名
        studentEmail: currentNoctraUser.email, //學員信箱

        tutorId: currentTutorId,
        tutorName: formTutorName.textContent, //抓取表單中的教師姓名

        requestDate: requestDate, //抓取預約申請日期
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
    noctraQuota -= 1;
    localStorage.setItem("noctraRemainingQuota", noctraQuota);
    remainingQuota.textContent = noctraQuota;

    buttonStatus(); //更新按鈕狀態
});

//取消預約功能函式
function cancelTutorRequest() {
    //先抓取localStorage存取的完整預約陣列資料
    const savedRequests = JSON.parse(localStorage.getItem("noctraTutorRequests")) || [];

    //抓出要進行取消的目標預約資料 → 條件可以設定 1.教師id 且 2.該筆預約資料目前狀態是pending
    const targetRequest = savedRequests.find((request) => {
        return request.tutorId === tutor.id && request.status === "pending";
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

    noctraQuota += 1; //取消預約後，預約額度要加1回去
    localStorage.setItem("noctraRemainingQuota", noctraQuota); //將更新後的額度存回localStroage

    remainingQuota.textContent = noctraQuota; //更新畫面上顯示的額度文字

    //接著更新按鈕狀態
    buttonStatus();
}

//取消預約按鈕
cancelBtn.addEventListener("click", () => {
    cancelTutorRequest();
});


//讓預約表單送出後，原先填寫的內容能保留出現，並在取消申請後可從先前版本修改
//設立函式，抓取本教師最新一筆儲存的預約資料
function getLatestTutorRequest() {
    const savedRequests = JSON.parse(localStorage.getItem("noctraTutorRequests")) || [];

    //找出儲存資料中，這名教師id下的所有預約資料
    const tutorRequests = savedRequests.filter((request) => {
        return request.tutorId === tutor.id;
    });

    if (tutorRequests.length === 0) {
        return null;
    }
    //然後回傳其中最新、最近送出的那一筆
    return tutorRequests[tutorRequests.length - 1];
}

//再設立另一個函式，將抓到的資料回傳回表單
function fillRequestForm() {
    const latestRequest = getLatestTutorRequest(); //抓取教師最近儲存的那筆預約資料

    if (!latestRequest) {
        return;
    }

    lessonDate.value = latestRequest.lessonDate || '';
    lessonTime.value = latestRequest.lessonTime || "09:00";
    needNote.value = latestRequest.note || ''; //回填需求備註
}

fillRequestForm(); //初始畫面時，就先跑一次，回填表格資料