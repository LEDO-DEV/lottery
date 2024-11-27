document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-link"); // Chọn tất cả liên kết điều hướng
    const contentDiv = document.getElementById("content"); // Div hiển thị nội dung

    // Xử lý sự kiện cho các liên kết điều hướng
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

    // Xử lý khi bấm nút "Tạo ô nhập liệu"
    document.getElementById('generate-inputs').addEventListener('click', () => {
        const races = parseInt(document.getElementById('races').value, 10);
        const raceInputs = document.getElementById('race-inputs');
        raceInputs.innerHTML = ''; // Xóa nội dung cũ

        if (isNaN(races) || races <= 0) {
            alert('Vui lòng nhập số vòng đua hợp lệ!');
            return;
        }

        // Tạo các ô nhập liệu
        for (let i = 1; i <= races; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Nhập kết quả vòng ${i} (10 số cách nhau dấu cách)`;
            input.id = `race-${i}`;
            input.required = true;
            raceInputs.appendChild(input);
        }
    });

    // Xử lý khi bấm nút "Phân tích kết quả"
    document.getElementById('race-form').addEventListener('submit', (event) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form (tránh reload trang)

        const races = parseInt(document.getElementById('races').value, 10);
        const allNumbers = Array.from({ length: 10 }, (_, i) => (i + 1).toString().padStart(2, '0')); // Các số từ 01-10
        const data = [];

        // Lấy dữ liệu từ từng ô nhập
        for (let i = 1; i <= races; i++) {
            const raceData = document.getElementById(`race-${i}`).value.trim().split(/\s+/);
            if (raceData.length !== 10) {
                alert(`Vòng ${i} phải có đúng 10 số!`);
                return;
            }
            data.push(raceData.map(num => num.padStart(2, '0'))); // Đảm bảo định dạng số có 2 chữ số
        }

        // Tính tần suất xuất hiện
        const frequency = Object.fromEntries(allNumbers.map(num => [num, 0]));
        data.flat().forEach(num => {
            if (frequency[num] !== undefined) frequency[num]++;
        });

        // Hiển thị kết quả
        const output = Object.entries(frequency)
            .sort((a, b) => b[1] - a[1]) // Sắp xếp theo tần suất giảm dần
            .map(([num, count]) => `${num}: ${count} lần`)
            .join('\n');

        document.getElementById('output').textContent = `Tần suất xuất hiện các số:\n${output}`;
    });
});
