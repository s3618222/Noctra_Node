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

//優惠券顯示設定
const emptyCoupon = document.querySelector(".empty-coupon"); //無優惠券時的提示文字
const codeInput = document.querySelector(".coupon-input .inputText input"); //優惠代碼輸入欄位
const errorMsg = document.getElementById("errorMsg"); //代碼錯誤提示文
const redeemBtn = document.querySelector(".redeem-btn"); //兌換優惠券按鈕
const coupon = document.querySelector(".coupon"); //優惠券
const couponText = document.getElementById("couponText"); //優惠券說明文
const officialCoupon = [
    {
        title: "Noctra Light Up Challenge Reward",
        code: "NOCTRA1",
        id: "01"
    }
];

// 進分頁時，先存取使用者擁有的優惠券資訊
const ownedCoupon = JSON.parse(localStorage.getItem("ownedCoupon")) || [];

//當使用者持有優惠券時
if (ownedCoupon.length > 0) {
    emptyCoupon.style.display = "none";
    coupon.style.display = "block";
} else {
    emptyCoupon.style.display = "block";
    coupon.style.display = "none";
}

//點擊優惠券，展開或收起說明文字
coupon.addEventListener("click", () => {
    couponText.classList.toggle("show");
});

//核對輸入代碼是否存在
function checkInput() {
    const userInput = codeInput.value; //使用者輸入的代碼號
    const isValid = officialCoupon.some((coupon) => {
        return coupon.code === userInput; //比對序號陣列裡是否有相同代碼的優惠券資料
    });

    return isValid;
}

//核對使用者是否已經兌換過、擁有該筆優惠券了
function checkRepeated() {
    const userInput = codeInput.value; //使用者輸入的代碼號
    const isRepeated = ownedCoupon.some((coupon) => {
        return coupon.code === userInput; //比對使用者是否已擁有相同代碼的優惠券資料
    });

    return isRepeated; //true代表使用者其實已經有兌換過該代碼了
}

redeemBtn.addEventListener("click", function () {
    //先重新隱藏、清空錯誤提示文
    errorMsg.style.display = "none";
    errorMsg.textContent = "";

    const isMatched = checkInput();
    const isRedeemed = checkRepeated();

    if (isMatched && !isRedeemed) {
        const confirmedCoupon = officialCoupon.find((coupon) => {
            return coupon.code === codeInput.value; //找出使用者兌換的那一筆優惠券資料
        });

        confirmedCoupon.status = "unused"; //將兌換的優惠券先註記為尚未使用過

        ownedCoupon.push(confirmedCoupon); //將該筆優惠券資料儲存進使用者的優惠券擁有陣列
        localStorage.setItem("ownedCoupon", JSON.stringify(ownedCoupon));
        //將擁有的優惠券陣列重新儲存回localStorage

        alert("成功兌換");
        emptyCoupon.style.display = "none";
        coupon.style.display = "block";
        codeInput.value = ""; //清除原先代碼欄位
    } else if (isRedeemed) {
        errorMsg.textContent = "您已兌換過此代碼";
        errorMsg.style.display = "block";
        codeInput.value = "";
    } else if (codeInput.value === "") {
        errorMsg.textContent = "請輸入代碼";
        errorMsg.style.display = "block";
        codeInput.value = "";
    } else {
        errorMsg.textContent = "輸入代碼無效";
        errorMsg.style.display = "block";
        codeInput.value = "";
    }
});
