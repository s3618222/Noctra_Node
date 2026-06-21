//課程探索分類按鈕
const allButton = document.getElementById("allButton");
const a1Button = document.getElementById("a1Button");
const a2Button = document.getElementById("a2Button");
const b1Button = document.getElementById("b1Button");
const b2Button = document.getElementById("b2Button");
const c1Button = document.getElementById("c1Button");
const c2Button = document.getElementById("c2Button");

//所有按鈕
const labelButtons = document.querySelectorAll(".labelButtons");

//課程卡片放置區塊
const courseDiv = document.getElementById("courseDiv");

//課程卡片資訊
const courses = [
    {
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/a1-1%20cover.png",
        title: "Introducing Yourself & Small Talk",
        intro: "學會基本自我介紹與寒暄，建立用英文開口的第一步。",
        level: "A1",
    },
    {
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/a1-22%20cover.png",
        title: "Everyday Needs & Simple Requests",
        intro: "在旅遊與生活情境中，用英文完成簡單需求表達。",
        level: "A1",
    },
    {
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/a2-1ed%20cover.png",
        title: "Talking About Daily Life & Plans",
        intro: "練習描述生活經驗、行程安排與個人需求。",
        level: "A2",
    },
    {
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/a2-2ed%20cover.png",
        title: "Handling Everyday Services",
        intro: "應對常見服務與旅遊情境，讓日常溝通更順暢。",
        level: "A2",
    },
    {
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/b1-1ed%20cover.png",
        title: "Expressing Opinions at Work",
        intro: "在會議與討論中，清楚表達意見與想法。",
        level: "B1",
    },
    {
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/b1-2ed%20cover.png",
        title: "Workplace Conversations & Short Presentations",
        intro: "處理日常職場溝通，並完成簡單的英文簡報。",
        level: "B1",
    },
    {
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/b2-1ed%20cover.png",
        title: "Professional Presentations & Explanations",
        intro: "進行完整的專業說明，讓你的觀點更有說服力。",
        level: "B2",
    },
    {
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/b2-2ed%20cover.png",
        title: "Cross-Cultural Communication",
        intro: "練習跨文化溝通，在雙語環境中自在互動。",
        level: "B2",
    },
    {
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/c1-1ed%20cover.png",
        title: "Strategic Discussions & Decision-Making",
        intro: "在專業場合中進行策略性討論與觀點辯證。",
        level: "C1",
    },
    {
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/c1-2ed%20cover.png",
        title: "Adjusting Tone for Different Audiences",
        intro: "依對象與情境調整語氣，精準傳達複雜想法。",
        level: "C1",
    },
    {
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/c2-1ed%20cover.png",
        title: "Advanced Professional Communication",
        intro: "在高階專業與國際場合中，進行深入而自然的交流。",
        level: "C2",
    },
    {
        link: "https://raw.githubusercontent.com/s3618222/Noctra_Assets/refs/heads/main/images/c2-22ED%20cover.png",
        title: "Nuance, Implicit Meaning & Cultural Context",
        intro: "理解隱含語意與文化脈絡，讓表達更細膩精準。",
        level: "C2",
    },
];

Object.freeze(courses);

//按鈕點擊常駐狀態函式
function buttonHighlight(activeBTN) {
    labelButtons.forEach((btn) => {
        btn.classList.remove("highlight") //先把全部按鈕都去除常駐class
    });
    activeBTN.classList.add("highlight") //再將當下點擊的目標按鈕加回常駐狀態
};

buttonHighlight(allButton); //讓總攬區域成為一開始預設的常駐區域


//設定課程卡片函式
const setCourseCards = (arr = courses) => {
    courseDiv.innerHTML += arr.map(({ link, title, intro, level }) => {
        return `
    <div class="courseCards">
      <img class="courseImg" src="${link}" alt="Course cover for ${title}">
      <p><i>${level}</i></p>
      <p class='cardTitle'>${title}</p>
      <p>${intro}</p>
    </div>
    `
    }).join("");
};

// 總攬按鈕
allButton.addEventListener("click", () => {
    courseDiv.innerHTML = "";
    setCourseCards();
    buttonHighlight(allButton);
});


// A1按鈕
a1Button.addEventListener("click", () => {
    courseDiv.innerHTML = "";
    setCourseCards(
        courses.filter((course) => { return course.level === "A1" })
    );
    buttonHighlight(a1Button);
});

// A2按鈕
a2Button.addEventListener("click", () => {
    courseDiv.innerHTML = "";
    setCourseCards(
        courses.filter((course) => { return course.level === "A2" })
    );
    buttonHighlight(a2Button);
});

// B1按鈕
b1Button.addEventListener("click", () => {
    courseDiv.innerHTML = "";
    setCourseCards(
        courses.filter((course) => { return course.level === "B1" })
    );
    buttonHighlight(b1Button);
});

// B2按鈕
b2Button.addEventListener("click", () => {
    courseDiv.innerHTML = "";
    setCourseCards(
        courses.filter((course) => { return course.level === "B2" })
    );
    buttonHighlight(b2Button);
});

// C1按鈕
c1Button.addEventListener("click", () => {
    courseDiv.innerHTML = "";
    setCourseCards(
        courses.filter((course) => { return course.level === "C1" })
    );
    buttonHighlight(c1Button);
});

// C2按鈕
c2Button.addEventListener("click", () => {
    courseDiv.innerHTML = "";
    setCourseCards(
        courses.filter((course) => { return course.level === "C2" })
    );
    buttonHighlight(c2Button);
});

