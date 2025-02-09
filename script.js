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
        console.log("เพิ่มสินค้าเรียบร้อย");
    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error.message);
    }
}

// ฟังก์ชันอัปเดตสต็อกสินค้า
function updateStock(productId, quantity) {
    try {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        let product = products.find(p => p.id === productId);
        
        if (!product) throw new Error("ไม่พบสินค้าดังกล่าว");
        if (quantity < 0) throw new Error("จำนวนสินค้าไม่สามารถเป็นค่าลบได้");

        product.inStock += quantity;
        localStorage.setItem("products", JSON.stringify(products));
        console.log("อัปเดตสต็อกสินค้าเรียบร้อย");
    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error.message);
    }
}

// ฟังก์ชันตรวจสอบสินค้าที่เหลือน้อยกว่า 5 ชิ้น
function checkLowStock() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let lowStockProducts = products.filter(p => p.inStock < 5);
    
    console.log("สินค้าที่เหลือน้อยกว่า 5 ชิ้น:", lowStockProducts);
}

// ฟังก์ชันแสดงรายงานยอดขาย
function generateSalesReport() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let totalSales = products.reduce((sum, p) => sum + p.totalSales, 0);
    
    console.log(`ยอดขายรวมทั้งหมด: ${totalSales} บาท`);
}

// ตัวอย่างข้อมูลสินค้า
const sampleProduct = {
    id: "uniqueID1",
    name: "สินค้า A",
    price: 500,
    inStock: 10,
    category: "electronics",
    minStock: 5,
    totalSales: 50
};

// ทดลองเพิ่มสินค้าเข้าไป
addProduct(sampleProduct);

// ทดลองอัปเดตสินค้า
updateStock("uniqueID1", -2);

// ตรวจสอบสินค้าคงเหลือ
checkLowStock();

// แสดงรายงานยอดขาย
generateSalesReport();