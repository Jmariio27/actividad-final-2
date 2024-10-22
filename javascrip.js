const url = 'https://fakestoreapi.com/products';

fetch(url)
  .then(response => response.json())
  .then(products => {
    const container = document.querySelector('#productContainer');
    container.innerHTML = ''; 


    const limitedProducts = products.slice(0, 16);

    limitedProducts.forEach(product => createCard(product));

    const select = document.querySelector('#productFilter');
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'Ver todos';
    select.appendChild(allOption);

    limitedProducts.forEach(product => {
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = product.title;
      select.appendChild(option);
    });


    select.addEventListener('change', (e) => {
      const selectedId = e.target.value;
      container.innerHTML = '';

      if (selectedId === 'all') {
        limitedProducts.forEach(product => createCard(product));
      } else {
        const selectedProduct = limitedProducts.find(p => p.id == selectedId);
        createCard(selectedProduct);
      }
    });

    function createCard(product) {
      const card = `
        <div class="col">
          <div class="card h-100">
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">Categoría: ${product.category}</p>
              <p class="card-text short-description">${product.description.slice(0, 50)}...</p>
              <p class="card-text full-description" style="display:none;">${product.description}</p>
              <p class="card-price"><strong>Precio: $${product.price}</strong></p>
              <button class="btn-toggle">Ver más</button>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += card;
    }


    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('btn-toggle')) {
        const cardBody = e.target.closest('.card-body');
        const shortDescription = cardBody.querySelector('.short-description');
        const fullDescription = cardBody.querySelector('.full-description');
        
        if (fullDescription.style.display === 'none') {
          shortDescription.style.display = 'none';
          fullDescription.style.display = 'block';
          e.target.textContent = 'Ver menos';
        } else {
          shortDescription.style.display = 'block';
          fullDescription.style.display = 'none';
          e.target.textContent = 'Ver más';
        }
      }
    });

    document.getElementById('searchForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const query = document.getElementById('searchInput').value.toLowerCase();
      const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
      container.innerHTML = '';
      filteredProducts.forEach(product => createCard(product));
    });
  })
  
  .catch(error => console.error('Error fetching data:', error));

