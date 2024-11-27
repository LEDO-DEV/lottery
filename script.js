document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-link");
    const contentDiv = document.getElementById("content");

    links.forEach(link => {
        link.addEventListener("click", async (e) => {
            e.preventDefault();
            const target = link.getAttribute("data-target");
            try {
                // Tải nội dung từ file tương ứng
                const response = await fetch(`${target}.html`);
                if (response.ok) {
                    const htmlContent = await response.text();
                    contentDiv.innerHTML = htmlContent;
                } else {
                    contentDiv.innerHTML = `<p>Lỗi: Không tìm thấy nội dung từ file ${target}.html</p>`;
                }
            } catch (error) {
                contentDiv.innerHTML = `<p>Lỗi khi tải nội dung: ${error.message}</p>`;
            }
        });
    });
});
