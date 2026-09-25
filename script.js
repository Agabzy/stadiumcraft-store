// ==========================================================
// StadiumCraft — product page logic
// ==========================================================

// Change this one line to your real Telegram channel/bot link
const TELEGRAM_LINK = "https://t.me/stadiumcraftreviews";

// ---- Product data --------------------------------------------------
const VARIANTS = [
    {
        id: "man-utd",
        name: "Manchester United",
        swatch: "man-u.jpeg",
        price: 149.99,
        compare: 299.99,
        images: ["man-u.jpeg"],
    },
    {
        id: "liverpool",
        name: "Liverpool",
        swatch: "liverpool.jpg",
        price: 149.99,
        compare: 299.99,
        images: ["liverpool.jpg"],
    },
    {
        id: "chelsea",
        name: "Chelsea",
        swatch: "chelsea.jpeg",
        price: 149.99,
        compare: 299.99,
        images: ["chelsea.jpeg"],
    },
    {
        id: "man-city",
        name: "Manchester City",
        swatch: "man-city.jpg",
        price: 149.99,
        compare: 299.99,
        images: ["man-city.jpg"],
    },
    {
        id: "tottenham",
        name: "Tottenham",
        swatch: "spurs.jpeg",
        price: 149.99,
        compare: 299.99,
        images: ["spurs.jpeg"],
    }
];

// ---- State -----------------------------------------------------------
let currentVariantIndex = 0;

// ---- Helpers -----------------------------------------------------------
const usd = (n) => `$${n.toFixed(2)}`;
const savePct = (price, compare) => Math.round((1 - price / compare) * 100);

// ==========================================================
// RENDER: Main gallery image
// ==========================================================
function renderGallery() {
    const variant = VARIANTS[currentVariantIndex];
    const mainImg = document.getElementById("galMainImg");

    mainImg.style.opacity = "0";
    setTimeout(() => {
        mainImg.src = variant.images[0];
        mainImg.alt = `${variant.name} stadium coffee table`;
        mainImg.style.opacity = "1";
    }, 150);
}

// ==========================================================
// RENDER: Thumbnails
// ==========================================================
function renderThumbs() {
    const thumbs = document.getElementById("galThumbs");
    thumbs.innerHTML = "";

    VARIANTS.forEach((v, i) => {
        const btn = document.createElement("button");
        btn.className = "gallery__thumb" + (i === currentVariantIndex ? " is-active" : "");
        btn.setAttribute("aria-label", `View ${v.name}`);
        btn.innerHTML = `<img src="${v.images[0]}" alt="${v.name} thumbnail">`;

        btn.addEventListener("click", () => {
            currentVariantIndex = i;
            renderAll();

            btn.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            });
        });

        thumbs.appendChild(btn);
    });

    requestAnimationFrame(updateThumbArrows);
}

// ==========================================================
// RENDER: Variant swatches
// ==========================================================
function renderVariants() {
    const grid = document.getElementById("variantGrid");
    grid.innerHTML = "";

    VARIANTS.forEach((v, i) => {
        const btn = document.createElement("button");
        btn.className = "variant__swatch" + (i === currentVariantIndex ? " is-active" : "");
        btn.setAttribute("aria-label", `${v.name} edition`);
        btn.innerHTML = `<img src="${v.swatch}" alt="">`;

        btn.addEventListener("click", () => {
            currentVariantIndex = i;
            renderAll();

            const thumbs = document.querySelectorAll(".gallery__thumb");
            if (thumbs[i]) {
                thumbs[i].scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center"
                });
            }
        });

        grid.appendChild(btn);
    });

    const variant = VARIANTS[currentVariantIndex];
    document.getElementById("productTitle").textContent = `${variant.name} Edition`;
    document.getElementById("variantName").textContent = variant.name;
}

// ==========================================================
// RENDER: Price
// ==========================================================
function renderPricing() {
    const variant = VARIANTS[currentVariantIndex];
    document.getElementById("priceCurrent").textContent = usd(variant.price);
    document.getElementById("priceCompare").textContent = usd(variant.compare);
    document.getElementById("priceSave").textContent = `Save ${savePct(variant.price, variant.compare)}%`;
}

// ==========================================================
// MASTER RENDER
// ==========================================================
function renderAll() {
    renderVariants();
    renderGallery();
    renderThumbs();
    renderPricing();
}

// ==========================================================
// MAIN GALLERY ARROWS (cycle clubs)
// ==========================================================
document.getElementById("galPrev").addEventListener("click", () => {
    currentVariantIndex = (currentVariantIndex - 1 + VARIANTS.length) % VARIANTS.length;
    renderAll();

    const thumbs = document.querySelectorAll(".gallery__thumb");
    if (thumbs[currentVariantIndex]) {
        thumbs[currentVariantIndex].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        });
    }
});

document.getElementById("galNext").addEventListener("click", () => {
    currentVariantIndex = (currentVariantIndex + 1) % VARIANTS.length;
    renderAll();

    const thumbs = document.querySelectorAll(".gallery__thumb");
    if (thumbs[currentVariantIndex]) {
        thumbs[currentVariantIndex].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        });
    }
});

// ==========================================================
// THUMBNAIL CAROUSEL
// ==========================================================
const thumbStrip = document.getElementById("galThumbs");
const thumbPrev = document.getElementById("thumbPrev");
const thumbNext = document.getElementById("thumbNext");

function updateThumbArrows() {
    if (!thumbStrip) return;

    const maxScroll = thumbStrip.scrollWidth - thumbStrip.clientWidth;
    const atStart = thumbStrip.scrollLeft <= 4;
    const atEnd = thumbStrip.scrollLeft >= maxScroll - 4;

    if (maxScroll <= 4) {
        thumbPrev.classList.add("is-hidden");
        thumbNext.classList.add("is-hidden");
        return;
    }

    thumbPrev.classList.toggle("is-hidden", atStart);
    thumbNext.classList.toggle("is-hidden", atEnd);
}

thumbPrev.addEventListener("click", () => {
    thumbStrip.scrollBy({ left: -200, behavior: "smooth" });
});

thumbNext.addEventListener("click", () => {
    thumbStrip.scrollBy({ left: 200, behavior: "smooth" });
});

thumbStrip.addEventListener("scroll", updateThumbArrows);
window.addEventListener("resize", updateThumbArrows);

// ==========================================================
// ACCORDIONS
// ==========================================================
document.querySelectorAll(".accordion__header").forEach((header) => {
    header.addEventListener("click", () => {
        const expanded = header.getAttribute("aria-expanded") === "true";
        header.setAttribute("aria-expanded", String(!expanded));
    });
});

// ==========================================================
// ORDER LINKS
// ==========================================================
document.querySelectorAll(".js-order-link").forEach((el) => {
    el.href = TELEGRAM_LINK;
});

// ==========================================================
// FOOTER YEAR
// ==========================================================
document.getElementById("year").textContent = new Date().getFullYear();

// ==========================================================
// INIT
// ==========================================================
renderAll();
