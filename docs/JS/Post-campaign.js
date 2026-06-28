const billboards = document.querySelectorAll(".billboard"); //所有看板字母
const letters = document.querySelectorAll(".letter"); //所有可操作字母
const lightCity = document.querySelector(".lightCity"); //亮版城市圖
const rules = document.querySelector(".rules"); //規則說明區
const coupon = document.querySelector(".coupon"); //優惠券

// 拖曳遊玩
//紀錄使用者目前正在拖拉的字母選項
let draggedLetter = null; //起始還沒拖拉，設定為null

// 點選遊玩
//記錄使用者目前點選到的字母
let selectedLetter = null;

//記錄使用者已經成功配對數量，等於6時，代表完成任務
let completedCount = 0;

//所有操作字母綁定拖拉事件
letters.forEach((letter) => {
    letter.addEventListener("dragstart", function () {
        draggedLetter = letter; //紀錄當前被拖拉的是哪一個字母
    });

    //將字母也綁定點擊事件，讓手機在不支援drag時，可以改用點擊進行遊戲
    letter.addEventListener("click", function () {
        //當點選的字母已經完成配對了，就離開函式，不做後續動作
        if (letter.classList.contains("is-matched")) return;

        //先移除所有字母的點選常駐狀態
        letters.forEach((letter) => {
            letter.classList.remove("is-selected");
        });

        //然後再針對當前點中的字母加入常駐狀態
        selectedLetter = letter;
        letter.classList.add("is-selected");
    });
});

//所有看板設定可接收拖曳
billboards.forEach((billboard) => {
    billboard.addEventListener("dragover", function (e) {
        //當有拖曳中的元素經過被綁定區塊時，就會觸發dragover事件
        e.preventDefault(); //因瀏覽器預設不允許很多元素被托放。
        //等同告訴瀏覽器，這個區塊可以接收托放

        //如果被拖放的字母已經完成配對了，就離開函式，不做後續動作
        if (billboard.classList.contains("is-lit")) return;

        //當有字母被拖拉經過字母看板時，加入對應css class狀態，製作類似hover效果
        billboard.classList.add("is-over");
    });

    //拖拉的物件離開字母看板時，就取消掉 is-over class名稱
    billboard.addEventListener("dragleave", () => {
        billboard.classList.remove("is-over");
    });

    //當有拖曳中的物件，在字母看板上放開滑鼠時，就會觸發drop事件
    billboard.addEventListener("drop", () => {
        //避免drop後，因為前面先觸發了dragover事件，就直接幫看板又加上is-over class
        billboard.classList.remove("is-over");

        // 讓drop跟click的配對判斷共用相同函式進行處理
        checkAnswer(draggedLetter, billboard);
    });

    // 針對手機版：點選看板時，以目前選到的字母進行配對判斷
    billboard.addEventListener("click", function () {
        checkAnswer(selectedLetter, billboard);
    });
});

// 共用配對判斷函式
function checkAnswer(letter, billboard) {
    // 防呆機制：如果目前沒有拖曳/選取任何字母，就不往下執行
    if (!letter) return;

    // 已經配對好、點亮的看板，不允許再次配對
    if (billboard.classList.contains("is-lit")) return;

    const targetLetter = billboard.getAttribute("data-letter"); //等於看板需要的字母
    const currentLetter = letter.getAttribute("data-letter"); // 等於使用者拖曳或點選的字母

    if (targetLetter === currentLetter) {
        // 答對後，操作字母加入已配對的css calss狀態
        letter.classList.add("is-matched");

        // 放對：看板中寫上正確字母文字
        billboard.textContent = currentLetter;

        // 加入is-lit class名稱，看板亮起
        billboard.classList.add("is-lit");

        // 手機：清除手機下，操作字母的點選常駐狀態
        letter.classList.remove("is-selected");

        // 桌機：避免再次拖拉這個字母
        letter.setAttribute("draggable", "false");

        // 清空目前記錄，避免下一次誤判
        draggedLetter = null;
        selectedLetter = null;

        //配對完成次數+1
        completedCount++;

        // 成功配滿6個字母，顯示完成任務後的亮版城市跟優惠券區塊，隱藏規則區
        if (completedCount === 6) {
            lightCity.style.opacity = "1";
            rules.style.display = "none";
            coupon.style.display = "block";
        }
    } else {
        // 放錯：加入is-wrong，看板搖晃
        billboard.classList.add("is-wrong");

        //設定setTimeout，不然錯誤狀態會一直顯示在看板上
        setTimeout(() => {
            billboard.classList.remove("is-wrong");
        }, 300);
    }
}
