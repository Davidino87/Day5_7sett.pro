const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZmQ1YmZlMDMxZTAwMTliYTE0ZWUiLCJpYXQiOjE3MDIwMzQ3NzksImV4cCI6MTcwMzI0NDM3OX0.mJFyPMWf-qw6UyOjbF9IE6a8qdD44CzGCUq9U2EEcuU";

const appendAlert = (message, type) => {
  const alertContainer = document.getElementById("alert-container");
  const wrapper = document.createElement("div", {
    style: "position: absolute",
  });
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertContainer.append(wrapper);
};

const renderProductList = (products) => {
  const productList = document.getElementById("item-list");

  productList.innerHTML = "";

  products.forEach((product) => {
    productList.innerHTML += `
      <div class="col-sm-12 col-md-6 col-lg-4">
        <a href="product.html?productId=${product._id}">
          <div class="card">
            <img src="${product.imageUrl}" onerror="this.src='https://th.bing.com/th/id/OIP.IDPdXezb9vZuUaOwoFU2ZQAAAA?rs=1&pid=ImgDetMain'" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title m-0">${product.name}</h5>
              <small class="text-body-secondary">${product.brand}</small>
              <h3 class="card-text text-bold mt-3">${product.price}€</h3>
            </div>
          </div>
        </a>
      <div>
    `;
  });
};

const fetchProducts = async () => {
  try {
    const response = await fetch("https://striveschool-api.herokuapp.com/api/product", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const products = await response.json();

    renderProductList(products);
  } catch (error) {
    appendAlert(`Errore durante il recupero dei prodotti. ${error}`, "danger");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});
