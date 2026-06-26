const API_BASE_URL = location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "https://noctra-api-s7tb.onrender.com";
//根據目前網址判斷，API是本機的localhost還是要fetch到佈署在render上的雲端網址

const emailInput = document.getElementById("user-email");
const passwordInput = document.getElementById("user-password");
const signInBtn = document.getElementById("signInButton");
const errorMsg = document.getElementById("errorMsg");

// // 建立 Noctra的會員總名單
// let noctraUsers = JSON.parse(localStorage.getItem("noctraUsers")) || [];

// // 加入Demo用帳號
// const demoUser = {
//     name: "Bill",
//     email: "s3618222@gmail.com",
//     password: "123"
// };

// // 檢查 demo 帳號是否已存在，沒有就加入總清單中
// const hasDemoUser = noctraUsers.some((user) => {
//     return user.email === demoUser.email;
// });

// if (!hasDemoUser) {
//     noctraUsers.push(demoUser);

//     localStorage.setItem("noctraUsers", JSON.stringify(noctraUsers));
// }

//登入訊息 簡易Validation
signInBtn.addEventListener("click", async () => {
    errorMsg.textContent = ""; //清空錯誤訊息，避免前次訊息殘留

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    //trim()可以去除輸入內容字串的前後空白，把前後空白移除後，再做輸入判斷

    if (!email || !password) {
        errorMsg.textContent = "請輸入電子郵件與密碼";
        return;
    }

    if (!email.includes("@")) {
        errorMsg.textContent = "請輸入有效的電子郵件格式";
        return;
    }

    //將使用者輸入的信箱、密碼資訊，傳給後端進行比對，respnse即等同送出資料後，後端再回傳過來的訊息
    const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const data = await response.json(); //將後端回傳的JSON字串轉為JS物件
    if (!data.success) {
        errorMsg.textContent = data.message;
        return;
    }

    //登入成功時，就更新、覆寫目前使用者帳號資訊
    localStorage.setItem("currentNoctraUser", JSON.stringify({
        name: data.user.name,
        email: data.user.email
    })
    );

    //將openingAnime設定為false，讓每次登入進學習中心頁面時會執行開場動畫
    localStorage.setItem("playOpeningAnime", JSON.stringify(false));

    //接著跳轉至學習中心首頁
    window.location.href = "Post-learningCenter.html";
});