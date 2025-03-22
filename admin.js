const AIRTABLE_BASE_ID = "appXXXXXXXXXXXXX"; // Replace with your Base ID
const AIRTABLE_TABLE_NAME = "Products"; // Replace with your table name
const AIRTABLE_API_KEY = "pat21XVTxCRSSYpcS.bcaac2bb0a55932ea139c57b4665b8f433779355b3e1005e2655e6ea50c336e5"; // Use your new secure token

const headers = {
    "Authorization": `Bearer ${AIRTABLE_API_KEY}`,
    "Content-Type": "application/json"
};

// Fetch & Display Products
function fetchProducts() {
    fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, { headers })
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById("productList");
            list.innerHTML = "";
            data.records.forEach(record => {
                const li = document.createElement("li");
                li.textContent = `${record.fields.Name} - $${record.fields.Price}`;
                list.appendChild(li);
            });
        });
}

// Add a New Product
function addProduct() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;

    fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, {
        method: "POST",
        headers,
        body: JSON.stringify({
            fields: { Name: name, Price: parseFloat(price) }
        })
    })
    .then(response => response.json())
    .then(() => fetchProducts()); // Refresh List
}

// Load products on page load
fetchProducts();
