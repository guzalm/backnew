document.addEventListener("DOMContentLoaded", function () {
  const productsContainer = document.getElementById("productSection");
  const filterItems = document.querySelectorAll(".filter-item");

  // Sample product data
  const products = [
    {
      category: "shoes",
      imageUrl: "product5.jpg",
      title: "Black trainers",
      description: "For man. New collection",
    },
    {
      category: "belts",
      imageUrl: "product2.jpg",
      title: "Belt",
      description: "For man.",
    },
    {
      category: "jackets",
      imageUrl: "product4.jpg",
      title: "Sweater",
      description: "For man.",
    },
    {
      category: "accessories",
      imageUrl: "necklace.jpg",
      title: "Necklace",
      description: "For man.",
    },
    // Add more product entries here
  ];

  // Function to create product cards
  function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "col-md-3";
    card.dataset.category = product.category;

    card.innerHTML = `
      <div class="card">
        <img src="${product.imageUrl}" class="card-img-top" alt="${product.title}" height="300px" width="50px" />
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <h6 class="card-text">${product.description}</h6>
          <a href="#" class="btn btn-primary">Buy Now</a>
        </div>
      </div>
    `;

    return card;
  }

  // Function to render products based on category
  function renderProducts(category) {
    productsContainer.innerHTML = "";

    const filteredProducts =
      category === "all"
        ? products
        : products.filter((p) => p.category === category);

    filteredProducts.forEach((product) => {
      const card = createProductCard(product);
      productsContainer.appendChild(card);
    });
  }

  // Event listener for filter items
  filterItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedCategory = this.dataset.category;
      renderProducts(selectedCategory);
    });
  });

  // Initial display of all products
  renderProducts("all");
});