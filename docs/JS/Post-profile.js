const API_BASE_URL = location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "https://noctra-api-s7tb.onrender.com";

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

//會員基本資料
const name = document.getElementById("name"); //姓名
const email = document.getElementById("email"); //信箱
const phone = document.getElementById("phone"); //手機
const gender = document.getElementById("gender"); //性別
const birthday = document.getElementById("birthday"); //生日

//基本資料按鈕
const editBtn = document.getElementById("edit-btn"); //編輯按鈕
const saveBtn = document.getElementById("save-btn"); //儲存按鈕

//會員總資訊欄位陣列
//信箱不開放更改，所以這裡不列
const memberInfo = [name, phone, gender, birthday];

// 進入會員資訊頁時，先向後端取得會員的完整資料，更新在畫面上
async function loadMemberProfile() { //預設method是get，不用另外寫
    try {
        const res = await fetch(
            `${API_BASE_URL}/api/member/profile?email=${currentNoctraUser.email}`
        );
        //把會員的信箱提供給後端，交給其比對符合資料的會員

        const result = await res.json();

        if (!result.success) {
            alert(result.message || "會員資料讀取失敗");
            return;
        }

        const user = result.user;

        name.value = user.name || "";
        email.value = user.email || "";
        phone.value = user.phone || "";
        gender.value = user.gender || "";
        birthday.value = user.birthday || "";
    } catch (error) {
        console.error(error);
        alert("會員資料讀取失敗，請稍後再試");
    }
}

loadMemberProfile();

//編輯資料按鈕設定
editBtn.addEventListener("click", function () {
    //點編輯按鈕後，隱藏編輯，改顯示儲存編輯按鈕
    editBtn.style.display = "none";
    saveBtn.style.display = "inline-flex";

    memberInfo.forEach((input) => {
        //資料欄位開放編輯
        input.disabled = false;
        input.classList.add("editing");
    });
});

//儲存變更按鈕設定
saveBtn.addEventListener("click", async function () {
    //紀錄會員儲存後的基本資料
    const updateInfo = {
        email: currentNoctraUser.email, //提供讓後端對照會員資料
        name: name.value.trim(),
        phone: phone.value.trim(),
        gender: gender.value,
        birthday: birthday.value
    };

    //傳送會員更新資料給後端
    try {
        const res = await fetch(`${API_BASE_URL}/api/member/profile`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateInfo)
        });

        const result = await res.json();

        //如果後端回傳沒成功更新資料，alert失敗訊息，並停止往下跑
        if (!result.success) {
            alert(result.message || "資料更新失敗");
            return;
        }

        //同步更新目前登入者的localStorage資料(使用者有可能更改name)
        localStorage.setItem(
            "currentNoctraUser",
            JSON.stringify({
                name: result.user.name,
                email: result.user.email
            })
        );

        memberInfo.forEach((input) => {
            input.disabled = true; //資訊欄位變成disabled狀態
            input.classList.remove("editing");
        });

        //按鈕顯示對調
        saveBtn.style.display = "none";
        editBtn.style.display = "inline-flex";

        alert("會員資料已更新");
    } catch (error) {
        console.error(error);
        alert("伺服器連線失敗，請稍後再試");
    }
});

// 密碼修改區
const passwordBtn = document.getElementById("password-btn"); //修改密碼按鈕
const passwordContainer = document.querySelector(".password-container"); //密碼欄位區塊
const curPassword = document.getElementById("cur-password"); //輸入目前密碼
const newPassword = document.getElementById("new-password"); //輸入新密碼
const confirmPassword = document.getElementById("confirm-password"); //確認新密碼
const confirmBtn = document.getElementById("confirm-btn"); //確認修改按鈕
const cancelBtn = document.getElementById("cancel-btn"); //取消按鈕
const errorMsg = document.querySelector(".errorMsg"); //錯誤提示區
const errorText = document.getElementById("errorText"); //錯誤提示文字

//清除密碼欄位函式，並同時清空、關閉錯誤提示
function clearFields() {
    curPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";

    errorText.textContent = ""; //錯誤文字清空
    errorMsg.style.display = "none"; //錯誤提示區塊關閉
}

// 顯示錯誤訊息函式
function showPasswordError(message) {
    errorText.textContent = message;
    errorMsg.style.display = "block";
}

//點擊修改按鈕後，先清除原先密碼欄位上的內容，再打開密碼修改區，然後修改按鈕消失
passwordBtn.addEventListener("click", () => {
    clearFields();
    passwordContainer.style.display = "block";
    passwordBtn.style.display = "none";
});

// 點擊取消按鈕，關閉密碼區
cancelBtn.addEventListener("click", () => {
    passwordContainer.style.display = "none";
    passwordBtn.style.display = "inline-flex"; //密碼修改按鈕重新顯示
    clearFields(); //清空欄位
});

// 點擊確認按鈕
confirmBtn.addEventListener("click", async function () {
    //確認前先清空一次錯誤提示區塊
    errorText.textContent = "";
    errorMsg.style.display = "none";

    //各密碼欄位的輸入值
    const oldPasswordValue = curPassword.value;
    const newPasswordValue = newPassword.value;
    const confirmPasswordValue = confirmPassword.value;

    //確認每個密碼欄位都有填寫
    if (!oldPasswordValue || !newPasswordValue || !confirmPasswordValue) {
        showPasswordError("請完整填寫各密碼欄位");
        return;
    }

    //確認新密碼輸入一致
    if (newPasswordValue !== confirmPasswordValue) {
        showPasswordError("新密碼與確認密碼不一致");
        return;
    }

    //上述條件皆通過後，將更新後的密碼資訊回傳給後端
    try {
        const res = await fetch(`${API_BASE_URL}/api/member/password`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: currentNoctraUser.email, //回傳信箱，供後端對照該筆資料是哪一位會員
                oldPassword: oldPasswordValue, //接著要對照會員提供的舊密碼是否正確
                newPassword: newPasswordValue
            })
        });

        const result = await res.json();
        if (!result.success) {
            showPasswordError(result.message || "密碼修改失敗");
            return;
        }

        //成功修改密碼，跳出提醒，並關閉密碼欄位區，重新顯示修改按鈕
        alert("密碼已修改成功");
        passwordContainer.style.display = "none";
        passwordBtn.style.display = "inline-flex";
        clearFields(); //清除密碼欄位
    } catch (error) {
        console.error(error);
        showPasswordError("伺服器連線失敗，請稍後再試");
    }
});
