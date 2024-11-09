document.addEventListener('DOMContentLoaded', function() {
    console.log('設定スクリプトがロードされました');

    fetchSettings();  // 設定データを取得して表示

    window.addSetting = function() {
        const table = document.querySelector('tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" placeholder="設定名"></td>
            <td><input type="text" placeholder="値"></td>
            <td><button onclick="saveSetting(this)">保存</button></td>
        `;
        table.appendChild(newRow);
    }

    window.saveSetting = async function(button) {
        const row = button.parentElement.parentElement;
        const settingName = row.querySelector('input[placeholder="設定名"]').value;
        const value = row.querySelector('input[placeholder="値"]').value;

        try {
            const response = await fetch('http://localhost:5000/api/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    settingName,
                    value
                })
            });

            if (response.ok) {
                const newSetting = await response.json();
                row.innerHTML = `
                    <td>${newSetting.settingName}</td>
                    <td>${newSetting.value}</td>
                    <td><button onclick="editSetting('${newSetting._id}')">編集</button></td>
                `;
            } else {
                console.error('設定を保存できませんでした', response.statusText);
            }
        } catch (error) {
            console.error('Fetchエラー:', error);
        }
    }

    window.editSetting = async function(id) {
        const response = await fetch(`http://localhost:5000/api/settings/${id}`);
        const setting = await response.json();

        const row = document.querySelector(`button[onclick="editSetting('${id}')"]`).parentElement.parentElement;
        row.innerHTML = `
            <td><input type="text" value="${setting.settingName}"></td>
            <td><input type="text" value="${setting.value}"></td>
            <td><button onclick="saveEditedSetting('${id}', this)">保存</button></td>
        `;
    }

    window.saveEditedSetting = async function(id, button) {
        const row = button.parentElement.parentElement;
        const settingName = row.querySelector('input[type="text"]').value;
        const value = row.querySelector('input[type="text"]').value;

        const response = await fetch(`http://localhost:5000/api/settings/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                settingName,
                value
            })
        });

        if (response.ok) {
            const updatedSetting = await response.json();
            row.innerHTML = `
                <td>${updatedSetting.settingName}</td>
                <td>${updatedSetting.value}</td>
                <td><button onclick="editSetting('${updatedSetting._id}')">編集</button></td>
            `;
        } else {
            console.error('設定を更新できませんでした', response.statusText);
        }
    }
});

// 設定情報を取得して表示する関数
async function fetchSettings() {
    try {
        const response = await fetch('http://localhost:5000/api/settings');
        if (response.ok) {
            const settings = await response.json();
            const table = document.querySelector('tbody');
            table.innerHTML = '';
            settings.forEach(setting => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${setting.settingName}</td>
                    <td>${setting.value}</td>
                    <td><button onclick="editSetting('${setting._id}')">編集</button></td>
                `;
                table.appendChild(row);
            });
        } else {
            console.error('設定情報を取得できませんでした', response.statusText);
        }
    } catch (error) {
        console.error('Fetchエラー:', error);
    }
}
