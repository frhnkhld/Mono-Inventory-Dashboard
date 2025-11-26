// 1. DATA DUMMY
const inventoryData = [
    { id: "BRG001", nama: "Kertas A4 80gsm", stok: 32, harga: 45000, kategori: "ATK", pembelian_bulanan: 120 },
    { id: "BRG002", nama: "Pulpen Gel Hitam", stok: 8, harga: 6000, kategori: "ATK", pembelian_bulanan: 480 },
    { id: "BRG003", nama: "Binder Clip 33mm", stok: 120, harga: 15000, kategori: "ATK", pembelian_bulanan: 200 },
    { id: "BRG004", nama: "Map Plastik Clear", stok: 14, harga: 5000, kategori: "ATK", pembelian_bulanan: 30 },
    { id: "BRG005", nama: "Stabilo Hijau", stok: 3, harga: 12000, kategori: "ATK", pembelian_bulanan: 52 },
    { id: "ELK001", nama: "Mouse Wireless", stok: 45, harga: 120000, kategori: "Elektronik", pembelian_bulanan: 15 },
    { id: "ELK002", nama: "USB Hub 3.0", stok: 5, harga: 85000, kategori: "Elektronik", pembelian_bulanan: 8 },
    { id: "PAN001", nama: "Kopi Sachet Pack", stok: 200, harga: 25000, kategori: "Pantry", pembelian_bulanan: 60 },
    { id: "PAN002", nama: "Gula Pasir 1kg", stok: 2, harga: 18000, kategori: "Pantry", pembelian_bulanan: 25 },
    { id: "ATK006", nama: "Buku Catatan A5", stok: 60, harga: 35000, kategori: "ATK", pembelian_bulanan: 40 }
];

// Data dummy untuk grafik (7 hari terakhir)
const salesTrend = [45, 60, 32, 70, 55, 80, 95];

// State untuk sorting
let sortState = {
    column: null,
    direction: 'asc' // or 'desc'
};

// 2. FUNGSI UTAMA: INIT
document.addEventListener('DOMContentLoaded', () => {
    // Fungsi Global (Berjalan di semua halaman)
    renderDate();
    highlightCurrentPage();

    // Logika Khusus Halaman Dashboard
    if (document.getElementById('totalItems')) {
        renderKPIs();
        renderLowStock();
        drawChart();
    }

    // Logika Khusus Halaman Inventory & Dashboard (yang punya tabel)
    if (document.getElementById('inventoryTable')) {
        renderTable(inventoryData);
    }
    
    // Logika Khusus Halaman Reports
    if (document.getElementById('reportChart')) {
        drawReportChart();
    }
});

// Helper: Highlight Sidebar Link berdasarkan URL
function highlightCurrentPage() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || 'index.html'; // Default ke index jika root
    
    const links = document.querySelectorAll('nav li a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === page || (page === '' && href === 'index.html')) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
}

// 3. RENDER TANGGAL
function renderDate() {
    const dateEl = document.getElementById('currentDate');
    if (dateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = new Date().toLocaleDateString('id-ID', options);
    }
}

// 4. LOGIKA KPI & RINGKASAN
function renderKPIs() {
    // Total Items (Jenis Barang)
    document.getElementById('totalItems').textContent = inventoryData.length;

    // Total Stok Fisik
    const totalStock = inventoryData.reduce((acc, curr) => acc + curr.stok, 0);
    document.getElementById('totalStock').textContent = totalStock;

    // Valuasi Aset (Stok * Harga)
    const totalVal = inventoryData.reduce((acc, curr) => acc + (curr.stok * curr.harga), 0);
    document.getElementById('totalValue').textContent = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalVal);

    // Best Seller (Max Pembelian Bulanan)
    const best = inventoryData.reduce((prev, current) => (prev.pembelian_bulanan > current.pembelian_bulanan) ? prev : current);
    document.getElementById('bestSeller').textContent = best.nama;
}

// 5. RENDER DAFTAR LOW STOCK
function renderLowStock() {
    const listContainer = document.getElementById('lowStockList');
    if (!listContainer) return;

    const lowStockItems = inventoryData.filter(item => item.stok < 10);

    let html = '';
    if (lowStockItems.length === 0) {
        html = '<div style="color:var(--text-muted); padding:10px;">Semua stok aman.</div>';
    } else {
        lowStockItems.forEach(item => {
            html += `
                <div class="list-item">
                    <div class="list-item-left">
                        <span class="item-name">${item.nama}</span>
                        <span class="item-sub">ID: ${item.id}</span>
                    </div>
                    <span class="status-badge critical">Sisa: ${item.stok}</span>
                </div>
            `;
        });
    }
    listContainer.innerHTML = html;
}

// 6. RENDER TABEL & SORTING
function renderTable(data) {
    const tbody = document.querySelector('#inventoryTable tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nama}</td>
            <td>${item.kategori}</td>
            <td>${new Intl.NumberFormat('id-ID').format(item.harga)}</td>
            <td>${item.stok}</td>
            <td>${item.pembelian_bulanan}</td>
        `;
        tbody.appendChild(tr);
    });
}

function sortTable(column) {
    // Toggle direction
    if (sortState.column === column) {
        sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc';
    } else {
        sortState.column = column;
        sortState.direction = 'asc';
    }

    const sortedData = [...inventoryData].sort((a, b) => {
        let valA = a[column];
        let valB = b[column];

        // Handle string comparison case-insensitive
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortState.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortState.direction === 'asc' ? 1 : -1;
        return 0;
    });

    // Update header indicators (Visual only - simple implementation)
    const headers = document.querySelectorAll('th');
    headers.forEach(th => th.style.color = 'var(--text-muted)');
    
    renderTable(sortedData);
}

// 7. CANVAS CHART (Dashboard)
function drawChart() {
    const canvas = document.getElementById('salesChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Fix blur on High DPI screens
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = 40;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Data config
    const maxVal = Math.max(...salesTrend) * 1.2; 
    const dataPoints = salesTrend.length;
    const stepX = (width - (padding * 2)) / (dataPoints - 1);

    const getY = (val) => height - padding - ((val / maxVal) * (height - (padding * 2)));

    // Grid
    ctx.beginPath();
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    const gridSteps = 5;
    for(let i=0; i<=gridSteps; i++) {
        const yVal = (maxVal / gridSteps) * i;
        const yPos = getY(yVal);
        ctx.moveTo(padding, yPos);
        ctx.lineTo(width - padding, yPos);
        ctx.fillStyle = '#888';
        ctx.font = '10px Inter';
        ctx.fillText(Math.round(yVal), 10, yPos + 4);
    }
    ctx.stroke();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    salesTrend.forEach((val, index) => {
        const x = padding + (index * stepX);
        const y = getY(val);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Points
    salesTrend.forEach((val, index) => {
        const x = padding + (index * stepX);
        const y = getY(val);
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    });
}

// 7.1 REPORT CHART (Halaman Reports - Dummy Bar Chart)
function drawReportChart() {
    const canvas = document.getElementById('reportChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    
    ctx.fillStyle = "#1a1a1a";
    // Simple bar chart logic
    const data = [120, 200, 150, 80, 70, 110];
    const barWidth = 40;
    const gap = 20;
    const startX = 50;
    
    data.forEach((val, i) => {
        const barHeight = val; 
        ctx.fillRect(startX + (i * (barWidth + gap)), height - barHeight - 30, barWidth, barHeight);
        
        ctx.fillStyle = "#888";
        ctx.font = "12px Inter";
        ctx.fillText(val, startX + (i * (barWidth + gap)) + 5, height - barHeight - 35);
        ctx.fillStyle = "#1a1a1a";
    });
}

// 8. INTERAKSI SIDEBAR
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const width = window.innerWidth;
    
    if (width <= 768) {
        sidebar.classList.toggle('open');
    } else {
        sidebar.classList.toggle('collapsed');
    }
}