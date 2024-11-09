document.addEventListener('DOMContentLoaded', function() {
    console.log('レポートスクリプトがロードされました');

    fetchReports();  // レポートデータを取得して表示

    window.addReport = function() {
        const table = document.querySelector('tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" placeholder="レポート名"></td>
            <td><input type="date" placeholder="日付"></td>
            <td><button onclick="saveReport(this)">保存</button></td>
        `;
        table.appendChild(newRow);
    }

    window.saveReport = async function(button) {
        const row = button.parentElement.parentElement;
        const reportName = row.querySelector('input[placeholder="レポート名"]').value;
        const date = row.querySelector('input[placeholder="日付"]').value;

        try {
            const response = await fetch('http://localhost:5000/api/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reportName,
                    date
                })
            });

            if (response.ok) {
                const newReport = await response.json();
                row.innerHTML = `
                    <td>${newReport.reportName}</td>
                    <td>${newReport.date}</td>
                    <td><button onclick="editReport('${newReport._id}')">編集</button></td>
                `;
            } else {
                console.error('レポートを保存できませんでした', response.statusText);
            }
        } catch (error) {
            console.error('Fetchエラー:', error);
        }
    }

    window.editReport = async function(id) {
        const response = await fetch(`http://localhost:5000/api/report/${id}`);
        const report = await response.json();

        const row = document.querySelector(`button[onclick="editReport('${id}')"]`).parentElement.parentElement;
        row.innerHTML = `
            <td><input type="text" value="${report.reportName}"></td>
            <td><input type="date" value="${report.date}"></td>
            <td><button onclick="saveEditedReport('${id}', this)">保存</button></td>
        `;
    }

    window.saveEditedReport = async function(id, button) {
        const row = button.parentElement.parentElement;
        const reportName = row.querySelector('input[type="text"]').value;
        const date = row.querySelector('input[type="date"]').value;

        const response = await fetch(`http://localhost:5000/api/report/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reportName,
                date
            })
        });

        if (response.ok) {
            const updatedReport = await response.json();
            row.innerHTML = `
                <td>${updatedReport.reportName}</td>
                <td>${updatedReport.date}</td>
                <td><button onclick="editReport('${updatedReport._id}')">編集</button></td>
            `;
        } else {
            console.error('レポートを更新できませんでした', response.statusText);
        }
    }
});

// レポート情報を取得して表示する関数
async function fetchReports() {
    try {
        const response = await fetch('http://localhost:5000/api/report');
        if (response.ok) {
            const reports = await response.json();
            const table = document.querySelector('tbody');
            table.innerHTML = '';
            reports.forEach(report => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${report.reportName}</td>
                    <td>${report.date}</td>
                    <td><button onclick="editReport('${report._id}')">編集</button></td>
                `;
                table.appendChild(row);
            });
        } else {
            console.error('レポート情報を取得できませんでした', response.statusText);
        }
    } catch (error) {
        console.error('Fetchエラー:', error);
    }
}
