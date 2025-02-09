// ระบบจัดการสั่งสินค้าขนาดเล็ก

// ฟังก์ชันเพิ่มสินค้าเข้าไปใน localStorage
function addProduct(productData) {
    try {
        if (!productData.id || !productData.name || !productData.price || !productData.inStock) {
            throw new Error("ข้อมูลสินค้าไม่ครบถ้วน");
        }
        
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(productData);
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts(); // แสดงข้อมูลที่เพิ่มเข้ามา
        console.log("เพิ่มสินค้าเรียบร้อย");
    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error.message);
    }
}

// ฟังก์ชันอัปเดตสต็อกสินค้า
function updateStock(productId, quantity) {
    try {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        let productIndex = products.findIndex(p => p.id === productId);
        
        if (productIndex === -1) throw new Error("ไม่พบสินค้าดังกล่าว");
        
        // ตรวจสอบห้ามจำนวนติดลบ
        if (quantity < 0 && products[productIndex].inStock + quantity < 0) {
            throw new Error("สินค้าในคลังมีไม่เพียงพอ");
        }

        products[productIndex].inStock += quantity;
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts(); // อัปเดตการแสดงผล
        console.log(`อัปเดตสต็อกสินค้า ${products[productIndex].name} เรียบร้อย`);
    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error.message);
        alert(error.message); // แจ้งเตือนเมื่อเกิดข้อผิดพลาด
    }
}

// ฟังก์ชันลดสินค้าในคลัง
function reduceStock(productId) {
    try {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        let productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) throw new Error("ไม่พบสินค้าดังกล่าว");

        // ตรวจสอบว่าจำนวนสินค้าไม่ติดลบ
        if (products[productIndex].inStock <= 0) {
            alert("สินค้าในคลังหมดแล้ว");
            return;
        }

        products[productIndex].inStock -= 1;
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();
        console.log(`ลดสินค้า ${products[productIndex].name} สำเร็จ`);
    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error.message);
    }
}

// ฟังก์ชันลบสินค้า
function deleteProduct(productId) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter(p => p.id !== productId);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
    console.log("ลบสินค้าเรียบร้อย");
}

// ฟังก์ชันแสดงสินค้าขายดี
function showBestSellingProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let bestSelling = products.sort((a, b) => b.totalSales - a.totalSales).slice(0, 5);
    console.log("สินค้าขายดี 5 อันดับแรก:", bestSelling);
}

// ฟังก์ชันตรวจสอบสินค้าที่เหลือน้อยกว่า 5 ชิ้น
function checkLowStock() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let lowStockProducts = products.filter(p => p.inStock < 5);
    console.log("สินค้าที่เหลือน้อยกว่า 5 ชิ้น:", lowStockProducts);
}

// ฟังก์ชันแสดงรายงานยอดขาย
function generateSalesReport() {
    let products = JSON.parse(localStorage.getItem("์name")) || [];
    let totalSales = products.reduce((sum, p) => sum + p.totalSales, 0);
    console.log(`ยอดขายรวมทั้งหมด: ${totalSales} บาท`);
}

// ฟังก์ชันแสดงข้อมูลสินค้าในหน้าเว็บ
function renderProducts() {
    const productList = document.getElementById("product-list");
    let products = JSON.parse(localStorage.getItem("products")) || [];
    productList.innerHTML = products.map(product => `
        <div class="product-item">
            <h3>${product.name}</h3>
            <p>ราคา: ${product.price} บาท</p>
            <p>จำนวนคงเหลือ: ${product.inStock}</p>
            <p>ยอดขายทั้งหมด: ${product.totalSales}</p>
            <button onclick="updateStock('${product.id}', 1)">เพิ่มสต็อก</button>
            <button onclick="reduceStock('${product.id}')">ลดสต็อก</button>
            <button onclick="deleteProduct('${product.id}')">ลบสินค้า</button>
        </div>
    `).join("");
}

function resetForm() {
    document.getElementById("blog-form").reset();
    console.log("รีเซ็ตข้อมูลที่กรอกไว้เรียบร้อย");
}

// ฟังก์ชันจัดการการส่งฟอร์ม
document.getElementById("blog-form").addEventListener("cancel", function(event) {
    event.preventDefault();
    const productData = {
        id: Date.now().toString(),
        name: document.getElementById("name").value,
        price: parseFloat(document.getElementById("price").value),
        inStock: parseInt(document.getElementById("inStock").value),
        category: document.getElementById("category").value,
        totalSales: parseInt(document.getElementById("totalSales").value)
    };
    addProduct(productData);
    resetForm(); // รีเซ็ตฟอร์มหลังจากเพิ่มสินค้า
});

// ฟังก์ชันจัดการการส่งฟอร์ม
document.getElementById("blog-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const productData = {
        id: Date.now().toString(),
        name: document.getElementById("name").value,
        price: parseFloat(document.getElementById("price").value),
        inStock: parseInt(document.getElementById("inStock").value),
        category: document.getElementById("category").value,
        totalSales: parseInt(document.getElementById("totalSales").value)
    };
    addProduct(productData);
    this.reset(); // รีเซ็ตฟอร์มหลังจากเพิ่มสินค้า
});

// โหลดข้อมูลสินค้าเมื่อเปิดหน้าเว็บ
window.onload = renderProducts;
