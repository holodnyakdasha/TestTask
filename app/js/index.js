(()=>{
  const productsListContainer = document.querySelector(".products_list_container");
  const listView = document.querySelector(".list_view_icon");
  const gridView = document.querySelector(".grid_view_icon");
  const sortOptions = document.querySelector(".sort_options");
  const filterOptions = document.querySelector(".filter_options");
  let products = [];
  let filteredProducts = [];

  const fetchProducts = async () => {
    const jsonData = await fetch("../src/data/products.json").then((response) =>
      response.json()
    );
    return jsonData;
  };

  const addProductToList = (product, index) => {
    const productCard =
      `<div class="product_card">
        <div class="product_card_header">
          <p class="favorite">
            <span class="icon">
              ${ 
                product.isFav
                ? '<i class="fa fa-heart" aria-hidden="true"></i>'
                : '<i class="fa fa-heart-o" aria-hidden="true"></i>'
              }
            </span>
          </p>
          <a href="${product.url}" target="_blank">
            <img src="${product.picture}" alt="product image">
          </a>
        </div>
        <div class="card_body">
          <p class="title">${product.name}</p>
          <p class='product_details'><span class="size">${product.size}</span> 
            <span class="rating">
              ${'<i class="fa fa-star" aria-hidden="true"></i>'.repeat(product.rating)}
            </span>
          </p>
          <p class="product_pricing">
            <span class="price"> ${product.price}</span>
            <span class="striked_text">
              ${
                  product.oldPrice ? product.oldPrice : ""
              }
            </span>
            <span class="red-text">
              ${
                product.savings ? " You save " + product.savings : ""
              }
            </span>
          </p>
        </div>
      </div>`;

    productsListContainer.innerHTML += productCard;

  };

  fetchProducts().then((fetchedProducts) => {
    products = [...fetchedProducts];
    document.querySelector('.products_count').innerHTML = `<h6>${ products.length } results</h6>`;
    productsListContainer.querySelector(".loading").classList.add("hide");
    fetchedProducts.map((product, index) => {
      addProductToList(product, index);
      products[index].sortPrice = parseInt(product.price.replace('$', ''));
    });

  });

  gridView.addEventListener("click", function() {
    productsListContainer.classList.remove("list");
    this.classList.add('active');
    listView.classList.remove('active');
  });

  listView.addEventListener("click", function() {
    productsListContainer.classList.add("list");
    this.classList.add('active');
    gridView.classList.remove('active');
  });


  filterOptions.addEventListener("change", (e) => {
    let productsForFiltering = [...products];

    switch(e.target.value) {
      case 'S':
        productsForFiltering = productsForFiltering.filter((product) => product.size === "S - Small");
        break;
      case 'M':
        productsForFiltering = productsForFiltering.filter((product) => product.size === "M - Medium");
        break;
      case 'L':
        productsForFiltering = productsForFiltering.filter((product) => product.size === "L - Large");
        break;
      case 'XL':
        productsForFiltering = productsForFiltering.filter((product) => product.size === "XL - Extra large");
        break;
    }

    productsListContainer.innerHTML = "";
    productsForFiltering.map(addProductToList);
    document.querySelector('.products_count').innerHTML = `<h6> ${productsForFiltering.length} results</h6>`;
    filteredProducts = [...productsForFiltering];
    sortOptions.dispatchEvent(new Event('change'));

  });


  sortOptions.addEventListener("change", (e) => {
    const sortedProducts = filteredProducts.length ? [...filteredProducts] : [...products];

    switch (e.target.value) {
      case 'priceAsc':
        sortedProducts.sort((a, b) => {
          return a.sortPrice - b.sortPrice;
        });
        break;
      case 'priceDesc':
        sortedProducts.sort((a, b) => {
          return b.sortPrice - a.sortPrice;
        });
        break;
      case 'name':
        sortedProducts.sort((a, b) => {
          return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
        });
        break;
    }
      productsListContainer.innerHTML = "";
      sortedProducts.map(addProductToList);
      document.querySelector('.products_count').innerHTML = `<h6> ${sortedProducts.length} results</h6> `;
  });

})()