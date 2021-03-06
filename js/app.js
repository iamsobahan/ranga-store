// collecting data using  fetch
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};


// show all product in UI 
const showProducts = (products) => {

  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.style.width = "340px";
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title.slice(0,20)}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      
      <h3>${product.rating.rate}<small class="text-muted fs-5">/5</small></h3>
      <p>${product.rating.count} ratings </p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger" onclick="renderDetails(${product.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};


// click event  using arrow function of details button and showing in ui
const renderDetails = (id) => {
  const DetailShow = document.getElementById('DetailShow')
  const url = `https://fakestoreapi.com/products/${id}`
  fetch(url)
    .then(res => res.json())
    .then(data => {
      DetailShow.innerText = '';
      DetailShow.style.border = "1px solid #0E2F44"
      let div = document.createElement('div');
      div.classList.add('d-flex')
      div.innerHTML = `
      <img class="detailImg" src=${data.image}></img>
      <div class="mLeft">
      <h3>${data.title.slice(0,50)}.</h3>
      <h4>${data.description.slice(0,200)}.</h4>
      </div>
      `
      DetailShow.appendChild(div)
    })

}

let count = 0;
// add to cart click event function and adding product quentity tax and total
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal()
};

// get Id and return its innerText with parse Int
const getInputValue = (id) => {
  const element = document.getElementById(id);
  const converted = parseInt(element.innerText);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

loadProducts();