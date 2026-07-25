/* =========================================================
   Purchase Module — Supplier Priority Matrix
   Vanilla JS: data → ranking → DOM rendering, no dependencies.
========================================================= */

/* ---------------- Ranking criteria ----------------
   1. Quality of delivery (fewer defects in last 3 deliveries wins)
   2. Pricing (lower price wins)
   3. Delivery time (fewer days wins)
------------------------------------------------------ */
const QUALITY_TIER = {
    good: { rank: 1, label: "Zero Defect", cls: "quality-good" },
    amber: { rank: 2, label: "1 Defect", cls: "quality-amber" },
    bad: { rank: 3, label: "Multiple Defects", cls: "quality-bad" },
};

function qualityTier(defects) {
    if (defects <= 0) return QUALITY_TIER.good;
    if (defects === 1) return QUALITY_TIER.amber;
    return QUALITY_TIER.bad;
}

function rankSuppliers(suppliers) {
    return [...suppliers].sort((a, b) => {
        const tierA = qualityTier(a.defects).rank;
        const tierB = qualityTier(b.defects).rank;
        if (tierA !== tierB) return tierA - tierB;
        if (a.price !== b.price) return a.price - b.price;
        return a.deliveryDays - b.deliveryDays;
    });
}

/* ---------------- Raw material + supplier data ---------------- */
const purchaseData = {
    tubular: {
        materials: [
            {
                name: "Lead",
                color: "#6C4CFF",
                unit: "₹/kg",
                suppliers: [
                    { name: "Bharat Lead Industries", defects: 0, price: 168, deliveryDays: 2 },
                    { name: "Shakti Metals Pvt Ltd", defects: 0, price: 172, deliveryDays: 3 },
                    { name: "Om Smelters", defects: 1, price: 165, deliveryDays: 2 },
                    { name: "Vardhman Alloys", defects: 1, price: 170, deliveryDays: 4 },
                    { name: "National Lead Traders", defects: 2, price: 160, deliveryDays: 3 },
                ],
            },
            {
                name: "Gray Oxide",
                color: "#8A8FA3",
                unit: "₹/kg",
                suppliers: [
                    { name: "Ashoka Oxide Works", defects: 0, price: 142, deliveryDays: 3 },
                    { name: "Metro Chem Industries", defects: 1, price: 138, deliveryDays: 2 },
                    { name: "Prime Oxide Co.", defects: 1, price: 145, deliveryDays: 4 },
                ],
            },
            {
                name: "Red Oxide",
                color: "#DC3A3A",
                unit: "₹/kg",
                suppliers: [
                    { name: "Sundar Pigments", defects: 0, price: 96, deliveryDays: 3 },
                    { name: "Kavya Chemicals", defects: 2, price: 89, deliveryDays: 2 },
                ],
            },
            {
                name: "Container (Cases)",
                color: "#0EA5E9",
                unit: "₹/pc",
                suppliers: [
                    { name: "Poly Case Moulders", defects: 0, price: 210, deliveryDays: 5 },
                    { name: "Everlast Polymers", defects: 0, price: 205, deliveryDays: 6 },
                    { name: "Standard Plastics", defects: 1, price: 198, deliveryDays: 4 },
                    { name: "Reliable Case Co.", defects: 1, price: 215, deliveryDays: 3 },
                    { name: "Delta Mould Works", defects: 2, price: 190, deliveryDays: 5 },
                ],
            },
            {
                name: "Sulphuric Acid",
                color: "#0FA968",
                unit: "₹/L",
                suppliers: [
                    { name: "Ganga Acid Corp", defects: 0, price: 34, deliveryDays: 2 },
                    { name: "Purecore Chemicals", defects: 0, price: 36, deliveryDays: 2 },
                    { name: "Anmol Industrial Chem", defects: 1, price: 32, deliveryDays: 3 },
                    { name: "Kisan Chem Supplies", defects: 2, price: 30, deliveryDays: 4 },
                ],
            },
            {
                name: "Packaging Material",
                color: "#B8790A",
                unit: "₹/pc",
                suppliers: [
                    { name: "Safe Pack Solutions", defects: 1, price: 22, deliveryDays: 3 },
                    { name: "Guardian Packaging", defects: 1, price: 20, deliveryDays: 4 },
                ],
            },
        ],
    },

    liion: {
        materials: [
            {
                name: "Lithium Carbonate Aur kuch bhi aur nhi",
                color: "#6C4CFF",
                unit: "₹/kg",
                suppliers: [
                    { name: "Himalaya Li Chem", defects: 0, price: 720, deliveryDays: 6 },
                    { name: "Global Lithium Traders", defects: 0, price: 705, deliveryDays: 8 },
                    { name: "Everest Battery Materials", defects: 1, price: 690, deliveryDays: 5 },
                    { name: "Silverline Chemicals", defects: 2, price: 670, deliveryDays: 4 },
                ],
            },
            {
                name: "Cobalt Sulphate",
                color: "#EC4899",
                unit: "₹/kg",
                suppliers: [
                    { name: "Orion Cobalt Refiners", defects: 0, price: 980, deliveryDays: 7 },
                    { name: "MetCore Industries", defects: 1, price: 955, deliveryDays: 6 },
                ],
            },
            {
                name: "Nickel Sulphate",
                color: "#0EA5E9",
                unit: "₹/kg",
                suppliers: [
                    { name: "Vega Nickel Co.", defects: 0, price: 610, deliveryDays: 5 },
                    { name: "Sterling Metal Salts", defects: 0, price: 615, deliveryDays: 4 },
                    { name: "Precision Chem Works", defects: 1, price: 598, deliveryDays: 6 },
                ],
            },
            {
                name: "Separator Film",
                color: "#14B8A6",
                unit: "₹/sqm",
                suppliers: [
                    { name: "Nova Membrane Tech", defects: 0, price: 48, deliveryDays: 4 },
                    { name: "Apex Polymer Films", defects: 0, price: 46, deliveryDays: 5 },
                    { name: "ClearLayer Industries", defects: 1, price: 44, deliveryDays: 3 },
                    { name: "FlexiFilm Corp", defects: 1, price: 50, deliveryDays: 4 },
                    { name: "UltraSep Materials", defects: 2, price: 41, deliveryDays: 6 },
                ],
            },
            {
                name: "Electrolyte Solution",
                color: "#B8790A",
                unit: "₹/L",
                suppliers: [
                    { name: "IonFlow Chemicals", defects: 0, price: 310, deliveryDays: 5 },
                    { name: "Catalyst Fluid Systems", defects: 1, price: 298, deliveryDays: 4 },
                    { name: "PureCell Solutions", defects: 2, price: 285, deliveryDays: 3 },
                ],
            },
            {
                name: "Cell Casing (Aluminum)",
                color: "#8A8FA3",
                unit: "₹/pc",
                suppliers: [
                    { name: "MetalWrap Industries", defects: 0, price: 58, deliveryDays: 4 },
                    { name: "Alumina Precision Co.", defects: 1, price: 55, deliveryDays: 5 },
                ],
            },
        ],
    },
};

let activeCategory = "tubular";
const RANK_LABELS = ["Priority 1", "Priority 2", "Priority 3", "Priority 4"];

/* ---------------- Render ---------------- */
function renderSupplierTable() {
    const thead = document.getElementById("supplierThead");
    const tbody = document.getElementById("supplierTbody");
    const category = purchaseData[activeCategory];

    thead.innerHTML = `
    <tr>
      <th>Raw Material</th>
      ${RANK_LABELS.map((l) => `<th class="rank-col">${l}</th>`).join("")}
    </tr>
  `;

    tbody.innerHTML = category.materials
        .map((material) => {
            const ranked = rankSuppliers(material.suppliers).slice(0, 4);
            const cells = [];

            for (let i = 0; i < 4; i++) {
                const s = ranked[i];
                if (!s) {
                    cells.push(`<td><div class="supplier-cell empty-cell">No Supplier</div></td>`);
                    continue;
                }
                const tier = qualityTier(s.defects);
                cells.push(`
          <td>
            <div class="supplier-cell">
              <div class="supplier-name">${s.name}</div>
              <span class="quality-pill ${tier.cls}">${tier.label}</span>
              <div class="supplier-meta">
                <div class="meta-row">
                  <span class="meta-label">Price</span>
                  <span class="meta-value">${fmt(s.price)} ${material.unit}</span>
                </div>
                <div class="meta-row">
                  <span class="meta-label">Delivery</span>
                  <span class="meta-value">${s.deliveryDays}d</span>
                </div>
              </div>
            </div>
          </td>
        `);
            }

            return `
        <tr>
          <td>
            <div class="mat-name">
              <span class="mat-swatch" style="background:${material.color}"></span>
              ${material.name}
            </div>
          </td>
          ${cells.join("")}
        </tr>
      `;
        })
        .join("");
}

function fmt(n) {
    return n.toLocaleString("en-IN");
}

function initCategoryToggle() {
    const toggle = document.getElementById("categoryToggle");
    toggle.addEventListener("click", (e) => {
        const btn = e.target.closest(".seg-btn");
        if (!btn) return;
        toggle.querySelectorAll(".seg-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeCategory = btn.dataset.view;
        renderSupplierTable();
    });
}

/* ---------------- Clock ---------------- */
function tickClock() {
    const el = document.getElementById("clock");
    el.textContent = new Date().toLocaleTimeString("en-IN", { hour12: true });
}

/* ---------------- Init ---------------- */
function init() {
    renderSupplierTable();
    initCategoryToggle();
    tickClock();
    setInterval(tickClock, 1000);
}

document.addEventListener("DOMContentLoaded", init);
