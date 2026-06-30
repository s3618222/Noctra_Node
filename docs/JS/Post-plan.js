const currentNoctraUser = JSON.parse(localStorage.getItem("currentNoctraUser")); //抓取目前登入者資訊

//未登入下的防呆機制，跳轉回登入頁面
if (!currentNoctraUser) {
    window.location.href = "SignIn.html";
}

//登出帳號
const logoutLink = document.getElementById("logout");
logoutLink.addEventListener("click", () => {
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
});

//方案查看切換按鈕
const planBtn = document.getElementById("plan-btn"); //訂閱方案區塊按鈕
const quotaBtn = document.getElementById("quota-btn"); //擴充額度區塊按鈕

//訂閱方案與擴充方案顯示區
const memberSlogan = document.getElementById("membership"); //訂閱方案時的slogan
const quotaSlogan = document.getElementById("quota"); //擴充額度時的slogan
const membershipList = document.querySelector(".membership-list");
const quotaList = document.querySelector(".quota-list");

//訂閱方案按鈕設定
planBtn.addEventListener("click", function () {
    memberSlogan.style.display = "block";
    quotaSlogan.style.display = "none";

    quotaBtn.classList.remove("checked");
    planBtn.classList.add("checked");

    quotaList.classList.remove("show");
    membershipList.classList.add("show");
});

//擴充額度按鈕設定
quotaBtn.addEventListener("click", function () {
    quotaSlogan.style.display = "block";
    memberSlogan.style.display = "none";

    planBtn.classList.remove("checked");
    quotaBtn.classList.add("checked");

    membershipList.classList.remove("show");
    quotaList.classList.add("show");
});

//設定頁面錨點，其他分頁跳轉來的網址若帶#quota結尾，就會自動點擊打開擴充額度區
if (location.hash === "#quota") {
    quotaBtn.click();
}