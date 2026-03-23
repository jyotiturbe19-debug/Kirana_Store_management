function register() {
    alert("Button clicked");  // check ke liye

    let user = document.getElementById("newUser").value;
    let pass = document.getElementById("newPass").value;

    if(user === "" || pass === "") {
        alert("Please fill all fields");
        return;
    }

    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);

    alert("Account Created Successfully!");
    window.location.href = "login.html";  
     
} 
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    let storedUser = localStorage.getItem("username");
    let storedPass = localStorage.getItem("password");

    if(user === storedUser && pass === storedPass) {
        localStorage.setItem("user", user);
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Login");
    }
}


    // Center me welcome message
    if(document.getElementById("welcomeText")) {
        document.getElementById("welcomeText").innerText = "Welcome " + user + " 👋";
    
    
    }





function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct() {
    console.log("working");
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let qty = document.getElementById("qty").value;
    let cost = document.getElementById("cost").value;
     let unit = document.getElementById("unit").value;
    let file = document.getElementById("imageFile").files[0];
   
    if (!file) {
        alert("Please select image");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(e) {
        let imageBase64 = e.target.result;

        let product = { name, price,cost, qty,unit, image: imageBase64 };

        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));

        window.onload = function() {

};
    };

    reader.readAsDataURL(file);
}

function displayProducts() {

    let list = document.getElementById("list");
    if (!list) return;
    
products = JSON.parse(localStorage.getItem("products")) || [];
list.innerHTML = "";
    products.forEach((p, i) => {

        let warning = "";

        if (p.qty <= 2) {
            warning = `<span style="color:red;">⚠ Low Stock!</span>`;
        }
        list.innerHTML += `

        <li>
            <img src="${p.image}" width="50" height="50">
            ${p.name} - ₹${p.price} - ${p.qty} ${p.unit}
            <button onclick="deleteProduct(${i})">Delete</button>
        </li>`;
    });
    
}

function deleteProduct(i) {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}



let bill = [];
let total = 0;

function loadProducts() {
    let select = document.getElementById("productSelect");
    if(!select) return;
let products = JSON.parse(localStorage.getItem("products")) || [];

    select.innerHTML = "";

     products.forEach((p, i) => {
        select.innerHTML += `<option value="${i}">
            ${p.name} (${p.qty} ${p.unit})
        </option>`;
    });
}


function addToBill() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let index = document.getElementById("productSelect").value;
    let qty = parseInt(document.getElementById("qty").value);
    let product = products[index];

    if (!qty || qty <= 0) {
        alert("Enter valid quantity");
        return;
    }
     if (qty > product.qty) {
        alert("Not enough stock!");
        return;
    }


    let amount = product.price * qty;
    let profit = (product.price - product.cost) * qty;
    let totalElement = document.getElementById("total");
totalElement.innerText = parseInt(totalElement.innerText) + amount;
    
    // stock reduce
    product.qty -= qty;
    localStorage.setItem("products", JSON.stringify(products));

    // bill display
    let list = document.getElementById("billList");
    list.innerHTML += `<li>${product.name} x ${qty} ${product.unit} = ₹${amount}</li>`;
     // refresh dropdown
let sales = JSON.parse(localStorage.getItem("sales")) || [];

sales.push({
    product: product.name,
    qty: qty,
    amount: amount,
    profit: profit,
    date: new Date().toLocaleDateString()
});

localStorage.setItem("sales", JSON.stringify(sales));

loadProducts();


}



window.onload = function() {
    let user = localStorage.getItem("user");

    // dashboard
    if(document.getElementById("userInfo")) {
        document.getElementById("userInfo").innerText = "👤 " + user;
    }

    if(document.getElementById("welcomeText")) {
        document.getElementById("welcomeText").innerText = "Welcome " + user + " 👋";
    }

    // items page
    if (document.getElementById("list")){
        displayProducts();
    };

    // billing page
    if( document.getElementById("productSelect")) {
        loadProducts();
    }
;
};
window.onload = function() {
    loadProducts();
};

function showReport() {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    let totalProducts = products.length;
    let totalStock = 0;
    

    products.forEach(p => {
        totalStock += parseInt(p.qty);
    });

    let reportText = `
        Total Products: ${totalProducts} <br>
        Total Stock Available: ${totalStock} kg
    `;

    document.getElementById("reportData").innerHTML = reportText;
}


function showTodayReport() {
    let sales = JSON.parse(localStorage.getItem("sales")) || [];

    let today = new Date().toLocaleDateString();

    let todaySales = sales.filter(s => s.date === today);

    let total = 0;
    let totalQty = 0;
    let totalProfit = 0;

    todaySales.forEach(s => {
        total += s.amount;
        totalQty += s.qty;
        totalProfit += s.profit || 0; // safe
    });

    document.getElementById("reportData").innerHTML = `
        <h3>Today's Report</h3>
        Sales: ₹${total} <br>
        Profit: ₹${totalProfit} <br>
        Items Sold: ${totalQty}
    `;
}

function showHistory() {
    let sales = JSON.parse(localStorage.getItem("sales")) || [];

    let grouped = {};

    sales.forEach(s => {
        if (!grouped[s.date]) {
            grouped[s.date] = { total: 0, qty: 0 };
        }
        grouped[s.date].total += s.amount;
        grouped[s.date].qty += s.qty;
    });

    let output = "<h3>History</h3>";

    for (let date in grouped) {
        output += `
            
                 <p onclick="showDetails('${date}')" style="cursor:pointer; color:blue;"><br>
                📅 ${date} <br>
                Sales: ₹${grouped[date].total} <br>
                Items Sold: ${grouped[date].qty}
            </p>
        `;
    }

    document.getElementById("reportData").innerHTML = output;
}

    


            
    


function showStock() {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    let output = "<h3>Stock Report</h3>";

    products.forEach(p => {
        output += `
            <p>${p.name} - ${p.qty}kg remaining</p>
        `;
    });

    document.getElementById("reportData").innerHTML = output;
}

function showDetails(date) {
    let sales = JSON.parse(localStorage.getItem("sales")) || [];

    let filtered = sales.filter(s => s.date === date);

    let output = `<h3>${date} Details Date Wise</h3>`;

    filtered.forEach(s => {
        output += `
            <p>🛒 ${s.product} <br>
                Qty: ${s.qty} <br>
                Amount: ₹${s.amount} <br>
                Profit: ₹${s.profit || 0}</p>
        `;
    });

    document.getElementById("reportData").innerHTML = output;
}

function printBill() {
    let content = document.getElementById("billList").innerHTML;
    let total = document.getElementById("total").innerText;

    let newWindow = window.open("", "", "width=600,height=600");

    newWindow.document.write(`
        <h2>Kirana Store Bill</h2>
        <hr>
        ${content}
        <hr>
        <h3>Total: ₹${total}</h3>
    `);

    newWindow.print();
}

function showChart() {
    let sales = JSON.parse(localStorage.getItem("sales")) || [];

    if (sales.length === 0) {
        alert("No sales data");
        return;
    }

    let dates = {};

    sales.forEach(s => {
        if (!dates[s.date]) {
            dates[s.date] = 0;
        }
        dates[s.date] += s.amount;
    });

    let labels = Object.keys(dates);
    let data = Object.values(dates);

    let ctx = document.getElementById("salesChart");

    if (!ctx) {
        alert("Canvas not found");
        return;
    }

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Sales ₹",
                data: data
            }]
        }
    });
}
function showLowStock() {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    let output = "";

    products.forEach(p => {
        if (parseInt(p.qty) <= 2) {
            output += `<p>⚠ ${p.name} (${p.qty} ${p.unit})</p>`;
        }
    });

    if (output === "") {
        output = "<p>No low stock items ✅</p>";
    }

    document.getElementById("lowStockList").innerHTML = output;
}
function toggleLowStock() {
    console.log("clicked"); 
    let box = document.getElementById("lowStockList");

    if (box.style.display === "none") {
        box.style.display = "block";
        showLowStock(); // data load karo
    } else {
        box.style.display = "none";
    }
}
function goToItems() {
    window.location.href = "items.html";
}

window.onload = function() {
    if (document.getElementById("list")) displayProducts();
    if (document.getElementById("productSelect")) loadProducts();
};
