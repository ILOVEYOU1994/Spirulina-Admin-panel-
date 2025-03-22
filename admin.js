const AIRTABLE_BASE_ID = "appAmGEyKLCfHanU5"; // Replace with your Base ID
const API_KEY = "pat21XVTxCRSSYpcS.bcaac2bb0a55932ea139c57b4665b8f433779355b3e1005e2655e6ea50c336e5"; // Replace with your token

const headers = {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json"
};

// Toggle Sections
function showSection(section) {
    document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
    document.getElementById(section).style.display = "block";
    document.getElementById("section-title").innerText = `Manage ${section.charAt(0).toUpperCase() + section.slice(1)}`;
}

// Fetch & Display Products
function fetchProducts() {
    fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Products`, { headers })
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById("productList");
            list.innerHTML = "";
            data.records.forEach(record => {
                const row = `<tr>
                    <td>${record.fields.Name}</td>
                    <td>$${record.fields.Price}</td>
                    <td><button onclick="deleteProduct('${record.id}')">Delete</button></td>
                </tr>`;
                list.innerHTML += row;
            });
        });
}

// Add a New Product
function addProduct() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;

    fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Products`, {
        method: "POST",
        headers,
        body: JSON.stringify({ fields: { Name: name, Price: parseFloat(price) } })
    }).then(() => fetchProducts());
}

// Delete Product
function deleteProduct(id) {
    fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Products/${id}`, {
        method: "DELETE",
        headers
    }).then(() => fetchProducts());
}

// Fetch & Display Blogs
function fetchBlogs() {
    fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Blogs`, { headers })
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById("blogList");
            list.innerHTML = "";
            data.records.forEach(record => {
                const row = `<tr>
                    <td>${record.fields.Title}</td>
                    <td><button onclick="deleteBlog('${record.id}')">Delete</button></td>
                </tr>`;
                list.innerHTML += row;
            });
        });
}

// Add a New Blog
function addBlog() {
    const title = document.getElementById("blogTitle").value;
    const content = document.getElementById("blogContent").value;

    fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Blogs`, {
        method: "POST",
        headers,
        body: JSON.stringify({ fields: { Title: title, Content: content } })
    }).then(() => fetchBlogs());
}

// Load Data on Page Load
fetchProducts();
fetchBlogs();