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

const currentHour = document.getElementById("currentHour"); //hero區塊，greeting

//依照目前時間點，給不同的greeting
function greetingByHour() {
    let now = new Date(); //建立日期物件
    let HourForNow = now.getHours(); //抓取當前"小時"

    if (HourForNow < 12) {
        currentHour.innerText = "☀ 早安，";
    } else if (HourForNow < 18) {
        currentHour.innerText = "◐ 午安，";
    } else {
        currentHour.innerText = '☾ 晚安，';
    }
}

greetingByHour();

//抓取目前登入者的資訊，替換hero section的使用者名稱
const currentNameSlot = document.getElementById('currentNameSlot');
const currentNoctraUser = JSON.parse(localStorage.getItem("currentNoctraUser"));

if (currentNoctraUser) {
    currentNameSlot.textContent = currentNoctraUser.name;
} else {
    window.location.href = "SignIn.html";
    //登入防呆機制，如果currentNoctraUser不存在，代表目前非登入狀態，那就不能進入此頁面，會直接跳轉去登入頁面
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


const userInfoBtn = document.getElementById("user-info"); //使用者下拉選單按鈕
const userDropdown = document.querySelector(".user-dropdown"); //下拉選單

const avatarWelcomeCard = document.querySelector(".welcomeAvatar"); //歡迎區腳色卡
const avatarWelcome = document.getElementById("avatar-welcome"); //歡迎區腳色基底圖
const welcomeHeadSlot = document.getElementById("welcomeHeadSlot"); //歡迎區腳色卡帽子
const welcomeBodySlot = document.getElementById("welcomeBodySlot"); //歡迎區腳色卡上衣
const welcomeBottomSlot = document.getElementById("welcomeBottomSlot"); //歡迎區腳色卡褲子

const avatarFinal = document.getElementById("avatar-final"); //起始腳色卡的基底圖
const previewHeadSlot = document.getElementById("previewHeadSlot"); //起始腳色卡帽子
const previewBodySlot = document.getElementById("previewBodySlot"); //起始腳色卡上衣
const previewBottomSlot = document.getElementById("previewBottomSlot"); //起始腳色卡褲子


const avatar = document.getElementById("initialAvatar"); //起始角色圖片
const rightArrow = document.getElementById("arrow-right"); //往右切換腳色按鈕
const leftArrow = document.getElementById("arrow-left"); //往左切換腳色按鈕

const wardrobeButtons = document.querySelectorAll(".wardrobeButton"); //綁定衣櫥區塊分類按鈕
const headWardrobeButton = document.getElementById("headWardrobeButton"); //切換帽子區塊按鈕
const bodyWardrobeButton = document.getElementById("bodyWardrobeButton"); //切換上衣區塊按鈕
const bottomWardrobeButton = document.getElementById("bottomWardrobeButton"); //切換褲子區塊按鈕

const headSection = document.querySelector(".head-items");
const bodySection = document.querySelector(".body-items");
const bottomSection = document.querySelector(".bottom-items");

const headSlot = document.getElementById("headSlot");
const headButtons = document.querySelectorAll(".head-btn");
const tokenDisplays = document.querySelectorAll(".noctra-token"); //學習幣顯示

const bodySlot = document.getElementById("bodySlot");
const bodyButtons = document.querySelectorAll(".body-btn");

const bottomSlot = document.getElementById("bottomSlot");
const bottomButtons = document.querySelectorAll(".bottom-btn");

const avatarLook = document.querySelector(".avatarLook"); //腳色起始畫面卡
const avatarSetupBtn = document.getElementById("avatarSetup-btn"); //進入衣櫥按鈕
const avatarWardrobe = document.querySelector(".avatarSetup"); //腳色自訂衣櫥區塊
const saveAvatarBtn = document.getElementById("saveAvatar"); //儲存腳色造型按鈕


// 使用者下拉選單開關顯示
userInfoBtn.addEventListener("click", () => {
    userDropdown.classList.toggle("show");
})


//衣櫥區域按鈕常駐狀態顯示
function activateWardrobe(activeBtn) {
    wardrobeButtons.forEach((btn) => {
        btn.classList.remove("activated") //先把所有衣櫥按鈕清除常駐狀態
    });
    activeBtn.classList.add("activated") //再將目標按鈕加上點擊狀態的常駐效果
};

//帽子、上衣、褲子區域切換函式
function goHead() {
    activateWardrobe(headWardrobeButton);
    headSection.style.display = "grid";
    bodySection.style.display = "none";
    bottomSection.style.display = "none";
};

//預設先顯示帽子區塊物件
goHead();

headWardrobeButton.addEventListener("click", goHead);

function goBody() {
    activateWardrobe(bodyWardrobeButton);
    headSection.style.display = "none";
    bodySection.style.display = "grid";
    bottomSection.style.display = "none";
};

bodyWardrobeButton.addEventListener("click", goBody);

function goBottom() {
    activateWardrobe(bottomWardrobeButton);
    headSection.style.display = "none";
    bodySection.style.display = "none";
    bottomSection.style.display = "grid";
};

bottomWardrobeButton.addEventListener("click", goBottom);



const avatarAssets = { //管理avatar所有素材
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

//紀錄每個部位配件、腳色基底圖的最終選定結果 → 等於統一紀錄每個部位的選擇index
const avatarState = {
    base: 0,
    head: 0,
    body: 0,
    bottom: 0
};

// 讀取使用者已購買的 avatar 物品
function loadOwnedItems() {
    return JSON.parse(localStorage.getItem("noctraOwnedItems")) || {
        head: ["head-none"],
        body: ["body-none"],
        bottom: ["bottom-none"]
    };
}

//記錄使用者擁有的錢幣跟物件
const inventoryState = {
    coins: Number(localStorage.getItem("noctraCoins")) || 100, //"讀取"最新的學習幣總額，如果是第一次進入沒有儲存紀錄，就設定為起始100
    owned: loadOwnedItems()
};

//更新腳色畫面的函式
function updateAvatar() {
    avatar.src = avatarAssets.base[avatarState.base]; //更新人物基底圖
    headSlot.src = avatarAssets.head[avatarState.head].src; //更新帽子
    bodySlot.src = avatarAssets.body[avatarState.body].src; //更新上衣
    bottomSlot.src = avatarAssets.bottom[avatarState.bottom].src; //更新褲子
}

//畫面更新持有學習幣
function renderCoins() {
    tokenDisplays.forEach((token) => {
        token.innerText = inventoryState.coins;
        //從使用者的物品紀錄狀態去讀取還擁有多少學習幣
    });
}

renderCoins(); //一進頁面就先更新顯示金額一次

//物品購買函式
function buyItems(category, index) {
    const item = avatarAssets[category][index];
    if (inventoryState.owned[category].includes(item.id)) {
        return; //已擁有該物品就直接跳出
    };

    if (inventoryState.coins < item.price) {
        alert("學習幣不足！");
        return;
    }

    inventoryState.coins -= item.price;
    inventoryState.owned[category].push(item.id);
    renderCoins(); //更新畫面上的持有學習幣

    localStorage.setItem("noctraCoins", inventoryState.coins); //儲存最新的學習幣總額
    localStorage.setItem("noctraOwnedItems", JSON.stringify(inventoryState.owned)); //儲存已購買的物品

    renderWardrobe(category); //更新衣櫥區塊顯示畫面
}

//穿戴物件函式
function equipItem(category, index) {
    const item = avatarAssets[category][index];
    if (!inventoryState.owned[category].includes(item.id)) {
        alert("請先購買此物品！");
        return;
    }

    avatarState[category] = index;
    updateAvatar();
    renderWardrobe(category);
}

//更新衣櫥中 該類別物品 購買、穿戴後的狀態
function renderWardrobe(category) {
    const cards = document.querySelectorAll(`.${category}-btn`);

    cards.forEach((card, index) => {
        const item = avatarAssets[category][index];
        const buyBtn = card.querySelector(".buyButtons");
        const buyPrice = card.querySelector(".buyPrice");

        const isOwned = inventoryState.owned[category].includes(item.id);
        const isEquipped = avatarState[category] === index;

        card.classList.remove("equipped");

        if (isEquipped) {
            card.classList.add("equipped");
        }

        if (buyBtn) {

            buyBtn.classList.remove("owned", "equipped");

            // 穿戴中
            if (isEquipped) {

                buyBtn.style.display = "flex";
                buyBtn.innerHTML = "穿戴中";

                buyBtn.disabled = true;
                buyBtn.classList.add("equipped");

                // 已擁有
            } else if (isOwned) {

                buyBtn.style.display = "flex";
                buyBtn.innerHTML = "已擁有";

                buyBtn.disabled = true;
                buyBtn.classList.add("owned");

                // 尚未購買
            } else {

                buyBtn.style.display = "flex";

                buyBtn.innerHTML = `
      <img class="buyToken"
      src="https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/NoctraToken.png" alt="">
      <span class="buyPrice">${item.price}</span>
    `;

                buyBtn.disabled = false;
            }
        }
    });
}

//網頁載入，初始化時，先讓系統跑一次穿戴常駐顯示的函示，讓預設的none卡片亮起
renderWardrobe("head");
renderWardrobe("body");
renderWardrobe("bottom");
loadAvatarMemory();

//帽子購買按鈕
headButtons.forEach((card, index) => {
    //點整張卡片 穿戴
    card.addEventListener("click", () => {
        equipItem("head", index);
    });

    //點購買按鈕
    const buyBtn = card.querySelector(".buyButtons");
    if (buyBtn) {
        buyBtn.addEventListener("click", (e) => {
            e.stopPropagation(); //阻止事件上傳，避免卡片本體也被觸發，導致按下購買後，也跟著穿上物品
            buyItems("head", index);
        })
    }
});

//上衣購買按鈕
bodyButtons.forEach((card, index) => {
    //點整張卡片 穿戴
    card.addEventListener("click", () => {
        equipItem("body", index);
    });

    //點購買按鈕
    const buyBtn = card.querySelector(".buyButtons");
    if (buyBtn) {
        buyBtn.addEventListener("click", (e) => {
            e.stopPropagation(); //阻止事件上傳，避免卡片本體也被觸發，導致按下購買後，也跟著穿上物品
            buyItems("body", index);
        })
    }
});

//褲子購買按鈕
bottomButtons.forEach((card, index) => {
    //點整張卡片 穿戴
    card.addEventListener("click", () => {
        equipItem("bottom", index);
    });

    //點購買按鈕
    const buyBtn = card.querySelector(".buyButtons");
    if (buyBtn) {
        buyBtn.addEventListener("click", (e) => {
            e.stopPropagation(); //阻止事件上傳，避免卡片本體也被觸發，導致按下購買後，也跟著穿上物品
            buyItems("bottom", index);
        })
    }
});

//設定左右兩側按鈕  切換起始角色
function nextAvatar() {
    avatarState.base += 1;
    if (avatarState.base >= avatarAssets.base.length) { //如果腳色是最後一隻的話，會切回第一隻
        avatarState.base = 0;
    }

    updateAvatar();
}

rightArrow.addEventListener('click', nextAvatar);

function previousAvatar() {
    avatarState.base -= 1
    if (avatarState.base < 0) { //如果腳色是第一隻的話，會切回最後一隻
        avatarState.base = avatarAssets.base.length - 1;
    }

    updateAvatar();
}

leftArrow.addEventListener('click', previousAvatar);

//打開衣櫥，自訂腳色造型
avatarSetupBtn.addEventListener("click", () => {
    avatarWardrobe.style.display = "flex";
    avatarLook.style.display = "none";
});


//起始腳色卡跟著更新腳色造型
function updatePreviewAvatar() {
    avatarFinal.src = avatarAssets.base[avatarState.base];
    previewHeadSlot.src = avatarAssets.head[avatarState.head].src;
    previewBodySlot.src = avatarAssets.body[avatarState.body].src;
    previewBottomSlot.src = avatarAssets.bottom[avatarState.bottom].src;
};

//歡迎區腳色卡跟著更新腳色造型
function updateWelcomeAvatar() {
    avatarWelcome.src = avatarAssets.base[avatarState.base];
    welcomeHeadSlot.src = avatarAssets.head[avatarState.head].src;
    welcomeBodySlot.src = avatarAssets.body[avatarState.body].src;
    welcomeBottomSlot.src = avatarAssets.bottom[avatarState.bottom].src;
};

//進衣櫥後，再回到起始腳色卡區塊，並更新歡迎區腳色、起始腳色卡造型
function goAvatarLook() {
    avatarWardrobe.style.display = "none";
    avatarLook.style.display = "block";
    //關閉衣櫥區塊，回到腳色起始畫面卡
};

// 讀取使用者先前儲存的 avatar 造型
function loadAvatarMemory() {
    const savedAvatar = JSON.parse(localStorage.getItem("avatarMemory"));

    // 如果沒有儲存過 avatar，就維持預設角色，不顯示 hero avatar
    if (!savedAvatar) return;

    // 將 localStorage 中的造型資料寫回 avatarState
    avatarState.base = savedAvatar.base;
    avatarState.head = savedAvatar.head;
    avatarState.body = savedAvatar.body;
    avatarState.bottom = savedAvatar.bottom;

    // 更新衣櫥預覽 avatar
    updateAvatar();

    // 更新起始 avatar 卡片
    updatePreviewAvatar();

    // 更新 hero 區塊 avatar
    updateWelcomeAvatar();

    // 重新整理後也顯示 hero avatar
    avatarWelcomeCard.style.display = "block";
}

saveAvatarBtn.addEventListener("click", () => {
    goAvatarLook();
    updatePreviewAvatar();
    updateWelcomeAvatar();
    avatarWelcomeCard.style.display = "block"; //儲存自訂腳色後，連同打開歡迎區腳色卡

    localStorage.setItem("avatarMemory", JSON.stringify(avatarState));
    //記錄使用者最後的腳色造型，儲存至localStorage，方便後續延用至其他分頁
});

// 後續可以在其他分頁 使用JSON.parse 還原這邊儲存的localStorage字串資料


// 接收來自課程分頁的進行中課程資訊
const lastContinuedCourse = JSON.parse(localStorage.getItem("lastOpenedCourse"));

let progressData = null; //用來存放課程進度的資料，怕如果沒有進行中的課程時，會導致js報錯，無法順利執行後續程式，所以這邊先預設一個變數為null

// 當確認有進行中的課程  → 才去抓 progress
if (lastContinuedCourse) {
    progressData = JSON.parse(
        localStorage.getItem(`course_${lastContinuedCourse.id}_progress`)
        // 原本課程獨立分頁上的localStorage進度名稱是用動態變數來設定，來因應開啟的課程分頁不同，能自動存成不同對應課程id的progress資料
    );
}

const noCurrentLesson = document.querySelector(".noCurrentLesson");
const currentLesson = document.querySelector(".currentLesson");
const lessonTitle = document.getElementById("currentLesson-title");
const lessonFocus = document.getElementById("currentIntro");
const currentTime = document.getElementById("currentTime");

const currentCourseBtn = document.getElementById("currentCourse-btn")//繼續課程按鈕

//所有課程清單
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

function checkContinuedCourse() {
    if (lastContinuedCourse) {
        // 有正在進行中的課程
        currentLesson.style.display = "block";
        lessonTitle.textContent = lastContinuedCourse.title;
        lessonFocus.textContent = lastContinuedCourse.focus;

        // 找出最後打開、進行的那一門課
        const targetCourse = courses.find((course) => {
            return course.id === lastContinuedCourse.id;
        });

        // 如果有找到課程，將課程頁面的url資訊放進按鈕中
        if (targetCourse) {
            currentCourseBtn.href = targetCourse.url;
        };

        //抓取前次課程的觀影進度時間
        if (progressData) {
            const videoCurrentTime = progressData.currentTime;
            const videoDuration = progressData.duration;

            currentTime.textContent = `${Math.floor(videoCurrentTime)}秒 / ${videoDuration}秒`
        };
    } else {
        // 沒有進行中的課程
        noCurrentLesson.style.display = "block";
    }
};

checkContinuedCourse(); //頁面載入時，先確認有無進行中的課程

// ===從課程瀏覽分頁抓的函式功能===//
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
// ===========================================

//課程建議層級設定
const levelRecommend = document.getElementById("levelRecommend"); //建議層級顯示

const cardGroups = document.querySelectorAll(".cards"); //所有推薦課程卡片
const a1Cards = document.getElementById("A1Cards");
const a2Cards = document.getElementById("A2Cards");
const b1Cards = document.getElementById("B1Cards");
const b2Cards = document.getElementById("B2Cards");
const c1Cards = document.getElementById("C1Cards");
const c2Cards = document.getElementById("C2Cards");

//補上學習歷程中，用來計算建議層級的相關設定
const levels = ["A1", "A2", "B1", "B2", "C1", "C2"]; //層級順序清單

//抓取能力定位測驗結果
function getPlacementLevel() {
    return localStorage.getItem("placementLevel") || "A1";
}

//抓取修讀中、已完成的課程資料
function getLearningCoursesData() {
    return JSON.parse(localStorage.getItem("learningCourses")) || {};
}

//抓出已完成的課程ID
function getCompletedCourseIds() {
    const learningData = getLearningCoursesData();

    return Object.entries(learningData)
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
    const nextIndex = completedIndex + 1; // 下一層（升級）

    // 如果還有下一層
    if (levels[nextIndex]) {
        return levels[Math.max(placementIndex, nextIndex)];
        //Math.max會回傳括號內的最大值，所以可以達到比較層級高低的功能
    }

    // 已經最高層
    return levels[Math.max(placementIndex, completedIndex)];
}


const classCards = document.querySelector(".classCards");//網頁中的推薦卡片放置區

//動態生成推薦課程卡片
function renderRecommendedCourses(level) {
    const recommendedCourses = courses.filter((course) => {
        return course.level === level;
    });

    classCards.innerHTML = recommendedCourses.map(({ id, link, title, intro, level, progress, url }) => {
        const statusText = getCourseStatus(progress);
        const statusClass = getStatusClass(progress);

        return `
      <a class="courseCards" href="${url}" data-id="${id}">
        <img class="courseImg" src="${link}" alt="${title}">
        <p><i>${level}</i></p>
        <p class="cardTitle">${title}</p>
        <p>${intro}</p>

        <div class="courseStatusWrap">
          <span class="courseStatus ${statusClass}">${statusText}</span>
          <div class="courseProgressBar">
            <div class="courseProgressFill ${statusClass}" style="width: ${progress}%"></div>
          </div>
        </div>
      </a>
    `;
    }).join("");
}

//更新首頁的建議層級顯示，並同步更新快取，讓首頁跟學習歷程分頁都可以自動更新建議層級
function renderHomeRecommendedLevel() {
    const level = getRecommendedLevel();
    levelRecommend.textContent = level;
    localStorage.setItem("noctraRecommendedLevel", level);

    renderRecommendedCourses(level);
}

renderHomeRecommendedLevel();