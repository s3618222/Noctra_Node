const API_BASE_URL = "http://localhost:3000"; //初始本地端API網址
const nameInput = document.getElementById("user-name");
const emailInput = document.getElementById("user-email");
const passwordInput = document.getElementById("user-password");
const password2Input = document.getElementById("user-password2");
const signUpBtn = document.getElementById("signUpButton");
const errorMsg = document.getElementById("errorMsg");

// //先建立Noctra的總會員清單
// //從localStorage存取資料，如果還沒有建立過，預設值就先建立空陣列
// let noctraUsers = JSON.parse(localStorage.getItem("noctraUsers")) || [];

// //建立Demo測試帳號，將測試帳號存入會員清單中
// const demoUser = {
//     name: "Bill",
//     email: "s3618222@gmail.com",
//     password: "123"
// };

// const hasDemoUser = noctraUsers.some((user) => {
//     return user.email === demoUser.email;
// });

// if (!hasDemoUser) {
//     noctraUsers.push(demoUser);
//     localStorage.setItem("noctraUsers", JSON.stringify(noctraUsers));
// }

//註冊訊息 簡易Validation
signUpBtn.addEventListener("click", async () => {
    // 先清空訊息
    errorMsg.textContent = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    //trim()可以去除輸入內容字串的前後空白，把前後空白移除後，再做輸入判斷
    const password = passwordInput.value;
    const password2 = password2Input.value;
    //密碼保留空白


    //必填資訊檢查
    if (!name || !email || !password || !password2) {
        errorMsg.textContent = "請完整填寫所有註冊資訊";
        return;
    }


    //email格式 簡易檢查
    if (!email.includes("@")) {
        errorMsg.textContent = "請輸入有效的電子郵件格式";
        return;
    }

    //密碼一致檢查
    if (password !== password2) {
        errorMsg.textContent = "兩次輸入的密碼不一致";
        return;
    }

    //將使用者的註冊資訊送給後端，查看信箱有沒有重複註冊
    const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    });

    //將後端回傳的資訊轉為js物件
    const data = await response.json();

    if (!data.success) {
        errorMsg.textContent = data.message;
        return; //如果該信箱已被註冊過，就停止往下跑
    }

    //通過以上檢查、成功註冊後，將後端回傳的新會員資料再存入、銜接回localStorage，作為目前登入者資訊
    localStorage.setItem("currentNoctraUser", JSON.stringify({
        name: data.user.name,
        email: data.user.email
    })
    );

    alert('已成功註冊會員，接下來將跳轉英語能力定位測驗分頁~')

    //建立帳號後，直接跳轉到定位測驗分頁
    window.location.href = "PlacementTest.html";

});


