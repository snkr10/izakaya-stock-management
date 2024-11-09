document.addEventListener('DOMContentLoaded', function() {
    console.log('在庫管理スクリプトがロードされました');

    fetchStocks();  // 在庫データを取得して表示

    window.addProduct = function() {
        const table = document.querySelector('tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" placeholder="商品名"></td>
            <td><input type="text" placeholder="カテゴリ"></td>
            <td><input type="number" placeholder="在庫数"></td>
            <td><button onclick="saveProduct(this)">保存</button></td>
        `;
        table.appendChild(newRow);
    }

    window.saveProduct = async function(button) {
        const row = button.parentElement.parentElement;
        const productName = row.querySelector('input[placeholder="商品名"]').value;
        const category = row.querySelector('input[placeholder="カテゴリ"]').value;
        const stock = row.querySelector('input[placeholder="在庫数"]').value;

        try {
            const response = await fetch('http://localhost:5000/api/stock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productName,
                    category,
                    stock
                })
            });

            if (response.ok) {
                const newStock = await response.json();
                row.innerHTML = `
                    <td>${newStock.productName}</td>
                    <td>${newStock.category}</td>
                    <td>${newStock.stock}</td>
                    <td><button onclick="editProduct('${newStock._id}')">編集</button></td>
                `;
            } else {
                console.error('商品を保存できませんでした', response.statusText);
            }
        } catch (error) {
            console.error('Fetchエラー:', error);
        }
    }

    window.editProduct = async function(id) {
        const response = await fetch(`http://localhost:5000/api/stock/${id}`);
        const stock = await response.json();

        const row = document.querySelector(`button[onclick="editProduct('${id}')"]`).parentElement.parentElement;
        row.innerHTML = `
            <td><input type="text" value="${stock.productName}"></td>
            <td><input type="text" value="${stock.category}"></td>
            <td><input type="number" value="${stock.stock}"></td>
            <td><button onclick="saveEditedProduct('${id}', this)">保存</button></td>
        `;
    }

    window.saveEditedProduct = async function(id, button) {
        const row = button.parentElement.parentElement;
        const productName = row.querySelector('input[type="text"]').value;
        const category = row.querySelector('input[type="text"]').value;
        const stock = row.querySelector('input[type="number"]').value;

        const response = await fetch(`http://localhost:5000/api/stock/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productName,
                category,
                stock
            })
        });

        if (response.ok) {
            const updatedStock = await response.json();
            row.innerHTML = `
                <td>${updatedStock.productName}</td>
                <td>${updatedStock.category}</td>
                <td>${updatedStock.stock}</td>
                <td><button onclick="editProduct('${updatedStock._id}')">編集</button></td>
            `;
        } else {
            console.error('商品を更新できませんでした', response.statusText);
        }
    }
});

// 在庫情報を取得して表示する関数
async function fetchStocks() {
    try {
        const response = await fetch('http://localhost:5000/api/stock');
        if (response.ok) {
            const stocks = await response.json();
            const table = document.querySelector('tbody');
            table.innerHTML = '';
            stocks.forEach(stock => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${stock.productName}</td>
                    <td>${stock.category}</td>
                    <td>${stock.stock}</td>
                    <td><button onclick="editProduct('${stock._id}')">編集</button></td>
                `;
                table.appendChild(row);
            });
        } else {
            console.error('在庫情報を取得できませんでした', response.statusText);
        }
    } catch (error) {
        console.error('Fetchエラー:', error);
    }
}
