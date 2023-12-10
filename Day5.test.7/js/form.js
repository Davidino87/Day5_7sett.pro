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

const submitForm = async (event) => {
  event.preventDefault();
  const form = event.target;

  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();

    form.classList.add("was-validated");
    return;
  }

  const body = {
    name: form["productName"].value,
    description: form["productDescription"].value,
    brand: form["brand"].value,
    price: form["productPrice"].value,
    imageUrl: form["productImage"].value,
  };

  const params = new URL(document.location).searchParams;
  const productId = params.get("productId");
  const method = productId ? "PUT" : "POST";
  const url = productId
    ? `https://striveschool-api.herokuapp.com/api/product/${productId}`
    : "https://striveschool-api.herokuapp.com/api/product";

  try {
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      appendAlert(`Si è verificato un errore durante l'invio dei dati`, "danger");
    } else {
      window.open(productId ? `product.html?productId=${productId}` : "index.html");
    }
  } catch (error) {
    appendAlert(`Si è verificato un errore durante l'invio dei dati`, "danger");
  }
};

const fillFromFields = async (productId) => {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const product = await response.json();

    if (!response.ok) {
      appendAlert(`Errore caricamento dati prodotto`, "danger");
    } else {
      document.getElementById("productName").value = product.name;
      document.getElementById("productDescription").value = product.description;
      document.getElementById("brand").value = product.brand;
      document.getElementById("productPrice").value = product.price;
      document.getElementById("productImage").value = product.imageUrl;
    }
  } catch (error) {
    appendAlert(`Errore caricamento dati prodotto`, "danger");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const params = new URL(document.location).searchParams;
  const productId = params.get("productId");
  if (productId) {
    fillFromFields(productId);
  }
});
