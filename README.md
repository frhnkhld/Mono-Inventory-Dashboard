# Mono Stock - Minimalist Inventory Dashboard

![Project Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Tech](https://img.shields.io/badge/built%20with-Vanilla%20JS-yellow)

**Mono Stock** is a lightweight, aesthetically pleasing inventory management dashboard built entirely with core web technologies. It features a strict monochrome design system and demonstrates advanced DOM manipulation and data visualization without the use of any external libraries or frameworks.

---

## 📸 Preview

<img src="https://via.placeholder.com/800x400/000000/FFFFFF?text=Mono+Stock+Dashboard+Preview" alt="Dashboard Preview" width="100%">

## ✨ Key Features

* **Strict Monochrome UI:** A clean, distraction-free design using only black, white, and shades of gray.
* **Interactive Dashboard:** Real-time KPI cards calculating total stock, asset valuation, and best-selling items.
* **Custom Data Visualization:** A sales trend chart built from scratch using the **HTML5 Canvas API** (No Chart.js or D3 used).
* **Inventory Management:** A sortable data table to manage product stock, prices, and categories.
* **Responsive Design:** Features a collapsible sidebar navigation that adapts to different screen sizes.
* **Multi-Page Structure:** Includes Dashboard, Inventory, Reports, and Settings views.

## 🛠️ Tech Stack

This project was built to demonstrate mastery of the fundamentals:

* **HTML5:** Semantic markup and structure.
* **CSS3:** Modern layout techniques (Flexbox & CSS Grid), CSS Variables for theming.
* **Vanilla JavaScript (ES6+):**
    * DOM Manipulation.
    * Event Handling.
    * `CanvasRenderingContext2D` for drawing charts.
    * `Intl.NumberFormat` for currency formatting.

## 🚀 How to Run

Since this project uses no build tools or bundlers (like Webpack or Vite), running it is extremely simple:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/frhnkhld/Mono-Inventory-Dashboard.git](https://github.com/frhnkhld/Mono-Inventory-Dashboard.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd Mono-Inventory-Dashboard
    ```

3.  **Open the project:**
    Simply open the `index.html` file in any modern web browser (Chrome, Firefox, Safari, Edge).

    > **Tip:** For the best experience, use an extension like "Live Server" in VS Code.

## 📂 Project Structure

```text
/
├── index.html        # Main Dashboard View
├── inventory.html    # Inventory Management View
├── reports.html      # Reports & Analytics View
├── settings.html     # User Settings View
├── style.css         # Global Stylesheet (Variables, Layout, Components)
└── script.js         # Application Logic (Data handling, Chart rendering, UI interaction)

🔮 Future Improvements
[ ] Dark Mode toggle.

[ ] Backend integration (Node.js or Firebase) for real-time data persistence.

[ ] Export data to CSV/PDF functionality.

📄 License
Distributed under the MIT License. See LICENSE for more information.

<p align="center"> Built with passion by <strong>Farhan Kh</strong> </p>
