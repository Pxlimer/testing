document.addEventListener("DOMContentLoaded", function () {
    let currentQuestion = 1;
    const totalQuestions = 3;

    function showQuestion(n) {
        document.querySelectorAll('.question').forEach((q, idx) => {
            q.style.display = (idx === n - 1) ? 'block' : 'none';
        });
    }

    function setupQuestionEvents(questionElem) {
        const options = questionElem.querySelectorAll(".option");
        const back = questionElem.querySelector(".back");
        const front = questionElem.querySelector(".front");
        const backButton = questionElem.querySelector(".back-button");
        // หาคำตอบที่ถูกต้องจาก text ใน back
        const answerText = back.querySelector("p")?.textContent.match(/is (.+)\./i)?.[1];
        let correctOption = null;
        options.forEach(option => {
            if (option.textContent.includes(answerText)) correctOption = option;
            option.onclick = function (e) {
                e.stopPropagation();
                if (option === correctOption) {
                    option.classList.add("correct");
                    questionElem.classList.add("flipped");
                    setTimeout(() => {
                        front.style.display = "none";
                        back.style.display = "flex";
                    }, 800);
                } else {
                    option.classList.add("incorrect");
                }
            };
        });
        backButton.onclick = function (e) {
            e.stopPropagation();
            questionElem.classList.remove("flipped");
            setTimeout(() => {
                front.style.display = "flex";
                back.style.display = "none";
                options.forEach(opt => {
                    opt.classList.remove("correct", "incorrect");
                });
            }, 800);
        };
        // ซ่อน back ตอนเริ่ม
        back.style.display = "none";
        front.style.display = "flex";
        options.forEach(opt => {
            opt.classList.remove("correct", "incorrect");
        });
        questionElem.classList.remove("flipped");
    }

    // setup ทุกข้อ
    document.querySelectorAll('.question').forEach(setupQuestionEvents);

    // ลูกศรเปลี่ยนข้อ
    document.querySelector('.icon-right-arrow').onclick = function () {
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            showQuestion(currentQuestion);
        }
    };
    document.querySelector('.icon-left-arrow').onclick = function () {
        if (currentQuestion > 1) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    };

    // เริ่มต้นแสดงข้อแรก
    showQuestion(currentQuestion);
});