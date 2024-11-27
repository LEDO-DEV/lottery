document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-link"); // Chọn tất cả liên kết điều hướng
    const contentDiv = document.getElementById("content"); // Div hiển thị nội dung

    links.forEach(link => {
        link.addEventListener("click", async (e) => {
            e.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
            const target = link.getAttribute("data-target"); // Lấy tên file mục tiêu từ thuộc tính data-target

            // Hiển thị trạng thái đang tải
            contentDiv.innerHTML = `<p>Đang tải nội dung...</p>`;

            try {
                // Gửi yêu cầu tải nội dung từ file HTML
                const response = await fetch(`${target}.html`);

                if (response.ok) {
                    // Nếu thành công, chèn nội dung vào contentDiv
                    const htmlContent = await response.text();
                    contentDiv.innerHTML = htmlContent;
                } else {
                    // Hiển thị lỗi nếu file không được tìm thấy hoặc gặp lỗi server
                    contentDiv.innerHTML = `<p>Lỗi: Không tìm thấy nội dung từ file <strong>${target}.html</strong>.</p>`;
                }
            } catch (error) {
                // Xử lý lỗi khác (mạng, cú pháp,...)
                contentDiv.innerHTML = `<p>Lỗi khi tải nội dung: ${error.message}</p>`;
            }
        });
    });
});
