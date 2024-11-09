document.addEventListener('DOMContentLoaded', function() {
    console.log('仕入れ管理スクリプトがロードされました');

    fetchProcurements();  // 仕入れデータを取得して表示

    window.addSupplier = function() {
        const table = document.querySelector('tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" placeholder="仕入れ先名"></td>
            <td><input type="text" placeholder="連絡先"></td>
            <td><input type="text" placeholder="住所"></td>
            <td><input type="text" placeholder="商品名"></td>
            <td><input type="number" placeholder="数量"></td>
            <td><button onclick="saveSupplier(this)">保存</button></td>
        `;
        table.appendChild(newRow);
    }

    window.saveSupplier = async function(button) {
        const row = button.parentElement.parentElement;
        const supplierName = row.querySelector('input[placeholder="仕入れ先名"]').value;
        const contact = row.querySelector('input[placeholder="連絡先"]').value;
        const address = row.querySelector('input[placeholder="住所"]').value;
        const productName = row.querySelector('input[placeholder="商品名"]').value;
        const quantity = row.querySelector('input[placeholder="数量"]').value;

        try {
            const response = await fetch('http://localhost:5000/api/procurement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    supplierName,
                    contact,
                    address,
                    productName,
                    quantity
                })
            });

            if (response.ok) {
                const newProcurement = await response.json();
                row.innerHTML = `
                    <td>${newProcurement.supplierName}</td>
                    <td>${newProcurement.contact}</td>
                    <td>${newProcurement.address}</td>
                    <td>${newProcurement.productName}</td>
                    <td>${newProcurement.quantity}</td>
                    <td><button onclick="editProcurement('${newProcurement._id}')">編集</button></td>
                `;
            } else {
                console.error('仕入れ情報を保存できませんでした', response.statusText);
            }
        } catch (error) {
            console.error('Fetchエラー:', error);
        }
    }

    window.editProcurement = async function(id) {
        const response = await fetch(`http://localhost:5000/api/procurement/${id}`);
        const procurement = await response.json();

        const row = document.querySelector(`button[onclick="editProcurement('${id}')"]`).parentElement.parentElement;
        row.innerHTML = `
            <td><input type="text" value="${procurement.supplierName}"></td>
            <td><input type="text" value="${procurement.contact}"></td>
            <td><input type="text" value="${procurement.address}"></td>
            <td><input type="text" value="${procurement.productName}"></td>
            <td><input type="number" value="${procurement.quantity}"></td>
            <td><button onclick="saveEditedProcurement('${id}', this)">保存</button></td>
        `;
    }

    window.saveEditedProcurement = async function(id, button) {
        const row = button.parentElement.parentElement;
        const supplierName = row.querySelector('input[type="text"]').value;
        const contact = row.querySelector('input[type="text"]').value;
        const address = row.querySelector('input[type="text"]').value;
        const productName = row.querySelector('input[type="text"]').value;
        const quantity = row.querySelector('input[type="number"]').value;

        const response = await fetch(`http://localhost:5000/api/procurement/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                supplierName,
                contact,
                address,
                productName,
                quantity
            })
        });

        if (response.ok) {
            const updatedProcurement = await response.json();
            row.innerHTML = `
                <td>${updatedProcurement.supplierName}</td>
                <td>${updatedProcurement.contact}</td>
                <td>${updatedProcurement.address}</td>
                <td>${updatedProcurement.productName}</td>
                <td>${updatedProcurement.quantity}</td>
                <td><button onclick="editProcurement('${updatedProcurement._id}')">編集</button></td>
            `;
        } else {
            console.error('仕入れ情報を更新できませんでした', response.statusText);
        }
    }
});

// 仕入れ情報を取得して表示する関数
async function fetchProcurements() {
    try {
        const response = await fetch('http://localhost:5000/api/procurement');
        if (response.ok) {
            const procurements = await response.json();
            const table = document.querySelector('tbody');
            table.innerHTML = '';
            procurements.forEach(procurement => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${procurement.supplierName}</td>
                    <td>${procurement.contact}</td>
                    <td>${procurement.address}</td>
                    <td>${procurement.productName}</td>
                    <td>${procurement.quantity}</td>
                    <td><button onclick="editProcurement('${procurement._id}')">編集</button></td>
                `;
                table.appendChild(row);
            });
        } else {
            console.error('仕入れ情報を取得できませんでした', response.statusText);
        }
    } catch (error) {
        console.error('Fetchエラー:', error);
    }
}
