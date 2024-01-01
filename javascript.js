const searchInput = document.querySelector("#search");
const productsDom = document.querySelector(".products-center");
const btns = document.querySelectorAll(".btn");
let allProductsData = [];
const filters = {
  searchItem: "",
};
document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded...");
  axios
    .get("https://fakestoreapi.com/products")
    .then((res) => {
      console.log(res.data);
      allProductsData = res.data;
      //render
      renderProducts(res.data, filters);
    })
    .catch((err) => console.log(err));
});

function renderProducts(_products, _filters) {
  const filteredProducts = _products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchItem.toLowerCase());
  });

  productsDom.innerHTML = " ";
  console.log(filteredProducts);

  // render to dom
  filteredProducts.forEach((item, index) => {
    //create
    //content
    //append
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <div class="img-container">
    <img src=${item.image} alt="P-${index}" />
  </div>
  <div class="product-description">
    <p class="product-price">${item.price} $</p>
    <p class="product-title">${item.title.split(" ").slice(0, 3).join(" ")}</p>
  </div>`;
    productsDom.appendChild(productDiv);
  });
}
function renderProductsCategory(_products, _filters) {
  const filteredProducts = _products.filter((p) => {
    return p.category.toLowerCase().includes(_filters.searchItem.toLowerCase());
  });
  productsDom.innerHTML = " ";
  console.log(filteredProducts);
  // render to dom
  filteredProducts.forEach((item, index) => {
    //create
    //content
    //append
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <div class="img-container">
      <img src=${item.image} alt="P-${index}" />
    </div>
    <div class="product-description">
      <p class="product-price">${item.price} $</p>
      <p class="product-title">${item.title}</p>
    </div>`;
    productsDom.appendChild(productDiv);
  });
}
searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  filters.searchItem = e.target.value;
  renderProducts(allProductsData, filters);
});
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log(e.target.dataset.filter);
    filters.searchItem = e.target.dataset.filter;
    renderProductsCategory(allProductsData, filters);
  });
});
