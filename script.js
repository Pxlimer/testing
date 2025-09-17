document.addEventListener("DOMContentLoaded", function () {
    const card = document.querySelector(".flash-card");
    const options = document.querySelectorAll(".option");
    const back = document.querySelector(".back");
    const front = document.querySelector(".front");
    const backButton = document.querySelector(".back-button");

    // กำหนดคำตอบที่ถูกต้อง
    const correctAnswerText = "C. Paris";

    // ซ่อนด้านหลังของการ์ดตั้งแต่เริ่มต้น
    back.style.display = "none";

    options.forEach(option => {
        option.addEventListener("click", function (e) {
            e.stopPropagation();
            const selectedOption = e.target;
            if (selectedOption.textContent.trim() === correctAnswerText) {
                selectedOption.classList.add("correct");
                card.classList.add("flipped");
                setTimeout(() => {
                    front.style.display = "none";
                    back.style.display = "flex";
                }, 800);
            } else {
                selectedOption.classList.add("incorrect");
            }
        });
    });

    // เพิ่ม event listener ให้กับปุ่ม "Back to question"
    backButton.addEventListener("click", function (e) {
        e.stopPropagation();
        card.classList.remove("flipped");
        setTimeout(() => {
            front.style.display = "flex";
            back.style.display = "none";   
        }, 800);
    });
});