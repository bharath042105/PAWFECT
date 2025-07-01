document.addEventListener('DOMContentLoaded', () => {
  const toyProducts = [
    { img: '/static/petshop/t1.jpg', name: 'Interactive Dog Ball', price: 300 },
    { img: '/static/petshop/t2.jpg', name: 'Plush Squeaky Toy', price: 280 },
    { img: '/static/petshop/t3.jpg', name: 'Squeaky Dog Bone', price: 150 },
    { img: '/static/petshop/t4.jpg', name: 'Rubber Chew Toy', price: 200 },
    { img: '/static/petshop/t8.jpg', name: 'Treat puzzle', price: 250 },
    { img: '/static/petshop/t6.jpg', name: 'Rope Tug Toy', price: 220 },
    { img: '/static/petshop/t7.jpeg', name: 'Interactive Dog Tunnel', price: 350 },
    { img: '/static/petshop/t5.jpg', name: 'Treat Ball', price: 180 },
  ];

  const petFoodProducts = [
    { img: '/static/petshop/f1.jpg', name: 'Premium Dog Food', price: 500 },
    { img: '/static/petshop/f2.jpg', name: 'Organic Puppy Food', price: 400 },
    { img: '/static/petshop/f3.jpg', name: 'Grain-Free Dog Food', price: 480 },
    { img: '/static/petshop/f4.jpg', name: 'Healthy Dog Food', price: 550 },
    { img: '/static/petshop/f5.jpg', name: 'Adult Dog Food', price: 580 },
    { img: '/static/petshop/f6.jpg', name: 'Sensitive Stomach Dog Food', price: 700 },
    { img: '/static/petshop/f7.jpg', name: 'Raw Dog Food', price: 420 },
    { img: '/static/petshop/f8.jpg', name: 'Weight Management Dog Food', price: 600 },
  ];

  const petDressProducts = [
    { img: '/static/petshop/d1.jpg', name: 'Cute Striped Dress', price: 1500 },
    { img: '/static/petshop/d2.jpg', name: 'Floral Summer Dress', price: 1800 },
    { img: '/static/petshop/d3.jpg', name: 'Winter Jacket', price: 2100 },
    { img: '/static/petshop/d4.jpg', name: 'Casual Hoodie', price: 1700 },
    { img: '/static/petshop/d5.jpg', name: 'Partywear Dress', price: 1200 },
    { img: '/static/petshop/d6.jpg', name: 'Denim Jacket', price: 2800 },
    { img: '/static/petshop/d7.jpg', name: 'Dog shirt', price: 900 },
    { img: '/static/petshop/d8.jpg', name: 'Rain Coat', price: 1400 },
  ];

  function getRandomProducts(products, count) {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  function renderProducts(products) {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = '';
    products.forEach(product => {
      const productCard = `
        <div class="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-lg">
          <div class="flex flex-col items-center space-y-4">
            <img src="${product.img}" alt="${product.name}" class="rounded-lg">
            <div class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">${product.name}</div>
            <div class="text-zinc-500 dark:text-zinc-300">&#8377;${product.price}</div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded addToCartBtn" data-name="${product.name}" data-price="${product.price}" data-img="${product.img}">
              Add to Cart
            </button>
          </div>
        </div>
      `;
      productGrid.insertAdjacentHTML('beforeend', productCard);
    });

    const addToCartButtons = document.querySelectorAll('.addToCartBtn');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        const itemName = this.getAttribute('data-name');
        const itemPrice = parseInt(this.getAttribute('data-price'));
        const itemImg = this.getAttribute('data-img');
        addToCart(itemName, itemPrice, itemImg);
      });
    });
  }

  // Fetch products based on current page
  const currentPage = window.location.pathname;
  let products = [];
  if (currentPage === '/toys') {
    products = getRandomProducts(toyProducts, 6);
  } else if (currentPage === '/petfood') {
    products = getRandomProducts(petFoodProducts, 6);
  } else if (currentPage === '/petshop' || currentPage === '/') {
    products = getRandomProducts(petDressProducts, 6);
  }
  renderProducts(products);
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  function addToCart(itemName, price, img) {
    cartItems.push({ name: itemName, price: price, img: img });
    alert(`Added ${itemName} to cart!`);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderCartItems();
    updateTotalAmount();
  }

  function renderCartItems() {
    const cartList = document.getElementById('cartItems');
    if (!cartList) return;

    cartList.innerHTML = '';
    let total = 0;

    cartItems.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add('flex', 'justify-between', 'items-center', 'space-x-4');
      listItem.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="w-16 h-16 object-cover">
        <span>${item.name} - ₹${item.price}</span>
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded removeFromCartBtn" data-index="${index}">Remove</button>
      `;
      cartList.appendChild(listItem);
      total += item.price;
    });

    const totalItem = document.createElement('li');
    totalItem.textContent = `Total: ₹${total}`;
    cartList.appendChild(totalItem);

    const removeFromCartButtons = document.querySelectorAll('.removeFromCartBtn');
    removeFromCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        const itemIndex = parseInt(this.getAttribute('data-index'));
        removeFromCart(itemIndex);
      });
    });

    // Display total amount
    document.getElementById('totalAmount').innerText = `Total Amount: ₹${total}`;
  }

  function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderCartItems();
    updateTotalAmount(); // Update total amount when removing items
  }
  
  function updateTotalAmount() {
    let total = cartItems.reduce((acc, curr) => acc + curr.price, 0);
    document.getElementById('totalAmount').innerText = `Total Amount: ₹${total}`;
  }

  // Handle payment button click
  document.getElementById('paymentbut')?.addEventListener('click', () => {
    if (cartItems.length > 0) {
      alert('Thank you for your purchase!');
      const totalAmount = cartItems.reduce((acc, curr) => acc + curr.price, 0);

      // Redirect to payment page with total amount as query parameter
      window.location.href = `/pay?total=${totalAmount}`;
    } else {
      alert('Your cart is empty!');
      event.preventDefault(); // Prevent default action (redirecting to the bill page)
    }
  });

  renderCartItems();
});
