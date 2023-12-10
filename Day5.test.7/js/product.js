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

const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      appendAlert(`Errore durante la cancellazione del prodotto`, "danger");
    } else {
      window.open("index.html");
    }
  } catch (error) {
    appendAlert(`Errore durante la cancellazione del prodotto: ${error}`, "danger");
  }
};

const renderProduct = (product) => {
  const productContainer = document.getElementById("product");

  productContainer.innerHTML = "";

  productContainer.innerHTML = `
    <div class="card">
      <img src="${product.imageUrl}" onerror="this.src='https://th.bing.com/th/id/OIP.IDPdXezb9vZuUaOwoFU2ZQAAAA?rs=1&pid=ImgDetMain'" class="card-img-top" alt="${product.name}">
      <div class="card-body">
        <h5 class="card-title mb-0">${product.name}</h5>
        <small class="text-body-secondary">${product.brand}</small>
        <p class="card-title mt-2">${product.description}</p>
        <h3 class="card-text text-bold">${product.price}€</h3>
      </div>
    <div>
  `;

  const productActions = document.getElementById("product-actions");
  productActions.innerHTML = "";

  productActions.innerHTML = `
    <a href="index.html" class="btn btn-dark">Torna alla home</a>
    <a href="form.html?productId=${product._id}" class="btn btn-warning mx-2">Modifica</a>
    <button type="button" class="btn btn-danger m-0" onclick="deleteProduct('${product._id}')">Elimina</button>
  `;
};

const fetchProduct = async (productId) => {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const product = await response.json();

    renderProduct(product);
  } catch (error) {
    console.error("Errore durante il recupero del prodotto.", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  let params = new URL(document.location).searchParams;
  let productId = params.get("productId");
  fetchProduct(productId);
});
