const cors = require("cors"); //安裝cors套件

// 導入express，建立後端伺服器
const express = require('express');

// 引入path 處理檔案路徑
const path = require('path');
const fs = require('fs'); //Node內建的檔案工具，用來讀取JSON檔

//建立express應用程式
const app = express();

//設定伺服器port
const PORT = process.env.PORT || 3000; //要部署在render上執行，所以不寫死3000

//讓express能讀取前端送來的JSON資料
app.use(express.json());

//使用cors套件，允許讓處於不同網域的前端來呼叫後端
app.use(cors({
    origin: "https://s3618222.github.io"
}));

//開放public資料夾，讓瀏覽器可以讀取Noctra的網頁內容
app.use(express.static(path.join(__dirname, "docs")));


app.get("/", (req, res) => { //首頁API測試路由
    res.send("Noctra API is running");
});

//登入API
app.post('/api/login', (req, res) => {
    try {

        const { email, password } = req.body; //取得前端送來的使用者登入資訊

        const usersData = fs.readFileSync(path.join(__dirname, "data", "users.json"), 'utf-8'); //讀取存放在後端資料夾的會員名單list

        const users = JSON.parse(usersData);

        //找出會員清單內，是否有吻合使用者輸入的信箱與密碼資訊
        const foundUser = users.find((user) => {
            return user.email === email && user.password === password;
        });

        //輸入資訊不存在，回傳登入不成功
        if (!foundUser) {
            return res.json({
                success: false,
                message: "電子郵件或密碼錯誤"
            });
        };

        //登入成功，回傳對應會員資料 (密碼為安全性敏感資料就不回傳)
        res.json({
            success: true,
            message: "登入成功",
            user: {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "伺服器登入處理發生錯誤"
        });
    }
});

//註冊API
app.post("/api/register", (req, res) => {
    try {
        const { name, email, password } = req.body; //取得使用者註冊輸入的姓名、信箱、密碼

        const usersData = fs.readFileSync(path.join(__dirname, "data", "users.json"), "utf-8");

        const users = JSON.parse(usersData);

        //檢查會員清單中是否已經有存在相同、註冊過的信箱
        const existingUser = users.find((user) => {
            return user.email === email;
        });

        if (existingUser) {
            return res.json({
                success: false,
                message: "此電子郵件已註冊過Noctra會員囉"
            });
        }

        //沒被註冊過，就建立新的會員資料，放入會員清單，並重新寫回資料庫內
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password
        };

        users.push(newUser);

        fs.writeFileSync(
            path.join(__dirname, "data", "users.json"),
            JSON.stringify(users, null, 2),
            "utf-8"
        );

        //將註冊成功資料再回傳給前端，讓前端根據回傳資訊，建立註冊後的當前登入使用者資訊
        res.json({
            success: true,
            message: "註冊成功",
            user: {
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "伺服器註冊處理發生錯誤"
        });

    }
});

//取得會員資料API
app.get("/api/member/profile", (req, res) => {
    const { email } = req.query;

    const userData = fs.readFileSync(path.join(__dirname, "data", "users.json"), "utf-8");
    const users = JSON.parse(userData);

    const foundUser = users.find((user) => user.email === email);

    if (!foundUser) {
        return res.json({
            success: false,
            message: "找不到此會員",
        });
    }

    //將找到的會員資訊回傳給前端
    res.json({
        success: true,
        user: {
            name: foundUser.name,
            email: foundUser.email,
            phone: foundUser.phone || "",
            gender: foundUser.gender || "",
            birthday: foundUser.birthday || "",
        },
    });
});

//會員資料更新API
app.patch('/api/member/profile', (req, res) => {
    const { email, name, phone, gender, birthday } = req.body; //取得前端送來的會員更新資料

    const userData = fs.readFileSync(path.join(__dirname, "data", "users.json"), "utf-8");
    const users = JSON.parse(userData);

    const foundUser = users.find((user) => {
        return user.email === email; //比對找出資料庫中，是否有吻合相同email的會員資料
    });

    if (!foundUser) {
        return res.json({
            success: false
        });
    }

    //找到吻合email的會員後，就更新該會員的相關資料
    foundUser.name = name;
    foundUser.phone = phone;
    foundUser.gender = gender;
    foundUser.birthday = birthday;

    //將更新完的會員資料再重新寫回JSON
    fs.writeFileSync(
        path.join(__dirname, "data", "users.json"),
        JSON.stringify(users, null, 2),
        "utf-8"
    );


    //回傳前端成功更新訊息，並提供對應更新後的會員姓名與信箱資料
    res.json({
        success: true,
        message: "會員資料更新成功",
        user: {
            name: foundUser.name,
            email: foundUser.email
        }
    });
});


//啟動伺服器
app.listen(PORT, () => {
    console.log(`Noctra is running at http://localhost:${PORT}`);
});