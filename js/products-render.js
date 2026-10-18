document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    if (typeof products !== 'undefined' && Array.isArray(products) && products.length > 0) {
        renderProductsList(products, grid);
    } else {
        fetch('data/products.json')
            .then(res => res.json())
            .then(data => renderProductsList(data, grid))
            .catch(err => console.error('Error loading products:', err));
    }
});

function renderProductsList(productsList, grid) {
    if (!grid) return;

    grid.innerHTML = productsList.map(product => {
        const imageUrl = product.image || (product.images && product.images[0]) || '';
        const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image-container">
                    ${discount > 0 ? `<span class="discount-badge">${discount}% OFF</span>` : ''}
                    <img src="${imageUrl}" alt="${product.title}" onerror="this.onerror=null; this.src='https://i.ibb.co/Y79Z5gRC/105141.jpg';">
                </div>
                <div class="product-details">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        <span class="current-price">₹${product.price}</span>
                        ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}
