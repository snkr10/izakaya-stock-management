document.addEventListener('DOMContentLoaded', function() {
    console.log('スクリプトがロードされました');

    if (document.querySelector('h1').textContent.includes('在庫管理')) {
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
    }
    if (document.querySelector('h1').textContent.includes('仕入れ管理')) {
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
                    <td><button onclick="editSupplier('${newProcurement._id}')">編集</button></td>
                `;
            } else {
                console.error('仕入れ情報を保存できませんでした', response.statusText);
            }
        }

        window.editSupplier = async function(id) {
            const response = await fetch(`http://localhost:5000/api/procurement/${id}`);
            const procurement = await response.json();

            const row = document.querySelector(`button[onclick="editSupplier('${id}')"]`).parentElement.parentElement;
            row.innerHTML = `
                <td><input type="text" value="${procurement.supplierName}"></td>
                <td><input type="text" value="${procurement.contact}"></td>
                <td><input type="text" value="${procurement.address}"></td>
                <td><input type="text" value="${procurement.productName}"></td>
                <td><input type="number" value="${procurement.quantity}"></td>
                <td><button onclick="saveEditedSupplier('${id}', this)">保存</button></td>
            `;
        }

        window.saveEditedSupplier = async function(id, button) {
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
                    <td><button onclick="editSupplier('${updatedProcurement._id}')">編集</button></td>
                `;
            } else {
                console.error('仕入れ情報を更新できませんでした', response.statusText);
            }
        }
    }
    if (document.querySelector('h1').textContent.includes('販売管理')) {
        window.addSale = function() {
            const table = document.querySelector('tbody');
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td><input type="text" placeholder="商品名"></td>
                <td><input type="number" placeholder="数量"></td>
                <td><input type="date" placeholder="販売日"></td>
                <td><button onclick="saveSale(this)">保存</button></td>
            `;
            table.appendChild(newRow);
        }

        window.saveSale = async function(button) {
            const row = button.parentElement.parentElement;
            const productName = row.querySelector('input[placeholder="商品名"]').value;
            const quantity = row.querySelector('input[placeholder="数量"]').value;
            const saleDate = row.querySelector('input[placeholder="販売日"]').value;

            const response = await fetch('http://localhost:5000/api/sales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productName,
                    quantity,
                    saleDate
                })
            });

            if (response.ok) {
                const newSale = await response.json();
                row.innerHTML = `
                    <td>${newSale.productName}</td>
                    <td>${newSale.quantity}</td>
                    <td>${new Date(newSale.saleDate).toLocaleDateString()}</td>
                    <td><button onclick="editSale('${newSale._id}')">編集</button></td>
                `;
            } else {
                console.error('販売情報を保存できませんでした', response.statusText);
            }
        }

        window.editSale = async function(id) {
            const response = await fetch(`http://localhost:5000/api/sales/${id}`);
            const sale = await response.json();

            const row = document.querySelector(`button[onclick="editSale('${id}')"]`).parentElement.parentElement;
            row.innerHTML = `
                <td><input type="text" value="${sale.productName}"></td>
                <td><input type="number" value="${sale.quantity}"></td>
                <td><input type="date" value="${sale.saleDate.slice(0, 10)}"></td>
                <td><button onclick="saveEditedSale('${id}', this)">保存</button></td>
            `;
        }

        window.saveEditedSale = async function(id, button) {
            const row = button.parentElement.parentElement;
            const productName = row.querySelector('input[type="text"]').value;
            const quantity = row.querySelector('input[type="number"]').value;
            const saleDate = row.querySelector('input[type="date"]').value;

            const response = await fetch(`http://localhost:5000/api/sales/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productName,
                    quantity,
                    saleDate
                })
            });

            if (response.ok) {
                const updatedSale = await response.json();
                row.innerHTML = `
                    <td>${updatedSale.productName}</td>
                    <td>${updatedSale.quantity}</td>
                    <td>${new Date(updatedSale.saleDate).toLocaleDateString()}</td>
                    <td><button onclick="editSale('${updatedSale._id}')">編集</button></td>
                `;
            } else {
                console.error('販売情報を更新できませんでした', response.statusText);
            }
        }
    }

    if (document.querySelector('h1').textContent.includes('レポート')) {
        window.fetchStockReport = async function() {
            const response = await fetch('http://localhost:5000/api/report/stock');
            const stocks = await response.json();
            const tableBody = document.getElementById('stock-report-table');
            tableBody.innerHTML = '';
            stocks.forEach(stock => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${stock.productName}</td>
                    <td>${stock.category}</td>
                    <td>${stock.stock}</td>
                `;
                tableBody.appendChild(row);
            });
        }

        window.fetchSalesReport = async function() {
            const response = await fetch('http://localhost:5000/api/report/sales');
            const sales = await response.json();
            const tableBody = document.getElementById('sales-report-table');
            tableBody.innerHTML = '';
            sales.forEach(sale => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${new Date(sale.saleDate).getMonth() + 1}</td>
                    <td>${sale.quantity * sale.productPrice}</td>
                `;
                tableBody.appendChild(row);
            });
        }

        fetchStockReport();
        fetchSalesReport();
    }
});
document.addEventListener('DOMContentLoaded', function() {
    console.log('スクリプトがロードされました');

    if (document.querySelector('h1').textContent.includes('設定')) {
        window.addUser = function() {
            const table = document.querySelector('tbody');
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td><input type="text" placeholder="ユーザー名"></td>
                <td>
                    <select>
                        <option value="admin">admin</option>
                        <option value="staff">staff</option>
                    </select>
                </td>
                <td><button onclick="saveUser(this)">保存</button></td>
            `;
            table.appendChild(newRow);
        }

        window.saveUser = async function(button) {
            const row = button.parentElement.parentElement;
            const userName = row.querySelector('input[placeholder="ユーザー名"]').value;
            const role = row.querySelector('select').value;

            const response = await fetch('http://localhost:5000/api/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName,
                    role
                })
            });

            if (response.ok) {
                const newUser = await response.json();
                row.innerHTML = `
                    <td>${newUser.userName}</td>
                    <td>${newUser.role}</td>
                    <td><button onclick="editUser('${newUser._id}')">編集</button></td>
                `;
            } else {
                console.error('ユーザーを保存できませんでした', response.statusText);
            }
        }

        window.editUser = async function(id) {
            const response = await fetch(`http://localhost:5000/api/settings/${id}`);
            const user = await response.json();

            const row = document.querySelector(`button[onclick="editUser('${id}')"]`).parentElement.parentElement;
            row.innerHTML = `
                <td><input type="text" value="${user.userName}"></td>
                <td>
                    <select>
                        <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>admin</option>
                        <option value="staff" ${user.role === 'staff' ? 'selected' : ''}>staff</option>
                    </select>
                </td>
                <td><button onclick="saveEditedUser('${id}', this)">保存</button></td>
            `;
        }

        window.saveEditedUser = async function(id, button) {
            const row = button.parentElement.parentElement;
            const userName = row.querySelector('input[type="text"]').value;
            const role = row.querySelector('select').value;

            const response = await fetch(`http://localhost:5000/api/settings/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName,
                    role
                })
            });

            if (response.ok) {
                const updatedUser = await response.json();
                row.innerHTML = `
                    <td>${updatedUser.userName}</td>
                    <td>${updatedUser.role}</td>
                    <td><button onclick="editUser('${updatedUser._id}')">編集</button></td>
                `;
            } else {
                console.error('ユーザーを更新できませんでした', response.statusText);
            }
        }

        document.querySelector('form').addEventListener('submit', function(event) {
            event.preventDefault();
            const alertLevel = document.getElementById('alertLevel').value;
            alert(`在庫不足アラートの閾値が保存されました: ${alertLevel}`);
        });
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