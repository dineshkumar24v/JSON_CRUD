async function postdata(event) {
  event.preventDefault();

  let obj = {
    id: document.getElementById('input1').value,
    name: document.getElementById('input2').value,
    price: document.getElementById('input3').value,
    quantity: document.getElementById('input4').value
  };

  if (!obj.id || !obj.name || !obj.price || !obj.quantity) {
    alert("Please fill out all fields.");
    return;
  }

  // Add product to the server
  await fetch("http://localhost:3000/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  });

  fetchProducts(); // Refresh product list after adding
}

async function updateProduct(event) {
  event.preventDefault();

  let updatedObj = {
    id: document.getElementById('updateId').value,
    name: document.getElementById('updateName').value,
    price: document.getElementById('updatePrice').value,
    quantity: document.getElementById('updateStock').value
  };

  if (!updatedObj.id || !updatedObj.name || !updatedObj.price || !updatedObj.quantity) {
    alert("Please fill out all fields.");
    return;
  }

  // Send PUT request to update the product by ID
  let data = await fetch(`http://localhost:3000/data/${updatedObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedObj)
  });

  if (data.ok) {
    alert("Product updated successfully");
    fetchProducts(); // Refresh product list after update
  } else {
    alert("Failed to update product");
  }
}

async function deleteProduct(event) {
  event.preventDefault();

  let productId = document.getElementById('deleteId').value;

  if (!productId) {
    alert("Please enter the product ID to delete.");
    return;
  }

  // Send DELETE request to delete the product by ID
  let data = await fetch(`http://localhost:3000/data/${productId}`, {
    method: "DELETE"
  });

  if (data.ok) {
    alert("Product deleted successfully");
    fetchProducts(); // Refresh product list after deletion
  } else {
    alert("Failed to delete product");
  }
}

async function fetchProducts() {
  let data = await fetch("http://localhost:3000/data");
  let res = await data.json();

  let displayContainer = document.getElementById('productDisplay');
  displayContainer.innerHTML = ""; // Clear previous products

  // Loop through the products and add them to the page
  res.forEach(product => {
    let productDiv = document.createElement('div');
    productDiv.className = 'product-card';
    productDiv.innerHTML = `
      <p><strong>ID:</strong> ${product.id}</p>
      <p><strong>Name:</strong> ${product.name}</p>
      <p><strong>Price:</strong> ₹ ${product.price}</p>
      <p><strong>Stock:</strong> ${product.quantity}</p>
    `;

    displayContainer.appendChild(productDiv);
  });
}

// Fetch products on page load
window.onload = fetchProducts;