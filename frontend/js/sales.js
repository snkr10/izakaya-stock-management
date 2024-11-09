document.addEventListener('DOMContentLoaded', function() {
    console.log('販売管理スクリプトがロードされました');

    fetchSales();  // 販売データを取得して表示

    window.addSale = function() {
        const table = document.querySelector('tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" placeholder="商品名"></td>
            <td><input type="text" placeholder="数量"></td>
            <td><input type="text" placeholder="価格"></td>
            <td><button onclick="saveSale(this)">保存</button></td>
        `;
        table.appendChild(newRow);
    }

    window.saveSale = async function(button) {
        const row = button.parentElement.parentElement;
        const productName = row.querySelector('input[placeholder="商品名"]').value;
        const quantity = row.querySelector('input[placeholder="数量"]').value;
        const price = row.querySelector('input[placeholder="価格"]').value;

        try {
            const response = await fetch('http://localhost:5000/api/sales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productName,
                    quantity,
                    price
                })
            });

            if (response.ok) {
                const newSale = await response.json();
                row.innerHTML = `
                    <td>${newSale.productName}</td>
                    <td>${newSale.quantity}</td>
                    <td>${newSale.price}</td>
                    <td><button onclick="editSale('${newSale._id}')">編集</button></td>
                `;
            } else {
                console.error('販売情報を保存できませんでした', response.statusText);
            }
        } catch (error) {
            console.error('Fetchエラー:', error);
        }
    }

    window.editSale = async function(id) {
        const response = await fetch(`http://localhost:5000/api/sales/${id}`);
        const sale = await response.json();

        const row = document.querySelector(`button[onclick="editSale('${id}')"]`).parentElement.parentElement;
        row.innerHTML = `
            <td><input type="text" value="${sale.productName}"></td>
            <td><input type="text" value="${sale.quantity}"></td>
            <td><input type="text" value="${sale.price}"></td>
            <td><button onclick="saveEditedSale('${id}', this)">保存</button></td>
        `;
    }

    window.saveEditedSale = async function(id, button) {
        const row = button.parentElement.parentElement;
        const productName = row.querySelector('input[type="text"]').value;
        const quantity = row.querySelector('input[type="text"]').value;
        const price = row.querySelector('input[type="text"]').value;

        const response = await fetch(`http://localhost:5000/api/sales/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productName,
                quantity,
                price
            })
        });

        if (response.ok) {
            const updatedSale = await response.json();
            row.innerHTML = `
                <td>${updatedSale.productName}</td>
                <td>${updatedSale.quantity}</td>
                <td>${updatedSale.price}</td>
                <td><button onclick="editSale('${updatedSale._id}')">編集</button></td>
            `;
        } else {
            console.error('販売情報を更新できませんでした', response.statusText);
        }
    }
});

// 販売情報を取得して表示する関数
async function fetchSales() {
    try {
        const response = await fetch('http://localhost:5000/api/sales');
        if (response.ok) {
            const sales = await response.json();
            const table = document.querySelector('tbody');
            table.innerHTML = '';
            sales.forEach(sale => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${sale.productName}</td>
                    <td>${sale.quantity}</td>
                    <td>${sale.price}</td>
                    <td><button onclick="editSale('${sale._id}')">編集</button></td>
                `;
                table.appendChild(row);
            });
        } else {
            console.error('販売情報を取得できませんでした', response.statusText);
        }
    } catch (error) {
        console.error('Fetchエラー:', error);
    }
}
