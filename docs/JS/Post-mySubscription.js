const currentNoctraUser = JSON.parse(localStorage.getItem("currentNoctraUser")); //抓取目前登入者資訊

//未登入下的防呆機制，跳轉回登入頁面
if (!currentNoctraUser) {
    window.location.href = "sign-in.html";
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
