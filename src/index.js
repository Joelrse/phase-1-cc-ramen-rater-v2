


// Callbacks

  const handleClick = (event) => {
    event.preventDefault()
    document.querySelector("#ramen-menu").addEventListener('click', (event) => {
      if (event.target.tagName === 'IMG') {
          const ramenImage = event.target.dataset.ramenImage
          document.querySelector(".detail-image").append(ramenImage)
      }
  });
    
  };

  document.body.addEventListener("click", handleClick);



  const addSubmitListener = (event) => {
    event.preventDefault(); 

    
    const form = event.target;
    const formData = new FormData(form);
    
    
    const data = {
        name: formData.get('name'),
        restaurant: formData.get('restaurant'),
        image: formData.get('image'),
        rating: formData.get('rating'),
        comment: formData.get('comment')
    };

   
    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(() => {
        
        displayRamens();
        form.reset(); 
    })
    .catch(error => console.error('Error:', error));
};



  const displayRamens = () => {
    fetch("http://localhost:3000/ramens")
      .then(response => response.json())
      .then(ramens => {
        const ramenMenu = document.querySelector("#ramen-menu");
        ramenMenu.innerHTML = ""; 
        
        ramens.forEach(ramen => {
          const createImgTag = document.createElement("img");
          createImgTag.src = ramen.image;
          createImgTag.dataset.ramenName = ramen.name; 
          createImgTag.dataset.ramenRestaurant = ramen.restaurant;
          createImgTag.dataset.ramenImage = ramen.image; 
          createImgTag.dataset.ramenRating = ramen.rating; 
          createImgTag.dataset.ramenComment = ramen.comment; 

          
          createImgTag.addEventListener('click', () => {
            displayRamenDetail(ramen); 
          });

          ramenMenu.append(createImgTag);
        });
      })
      
      .catch(error => console.error(error));
      
};


const displayRamenDetail = (ramen) => {
    const detailImage = document.querySelector("#ramen-detail .detail-image");
    const nameElement = document.querySelector("#ramen-detail .name");
    const restaurantElement = document.querySelector("#ramen-detail .restaurant");
    const ratingDisplay = document.querySelector("#rating-display");
    const commentDisplay = document.querySelector("#comment-display");

    
    detailImage.src = ramen.image;
    detailImage.alt = ramen.name;
    nameElement.textContent = ramen.name;
    restaurantElement.textContent = ramen.restaurant;
    ratingDisplay.textContent = ramen.rating; 
    commentDisplay.textContent = ramen.comment; 
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("new-ramen");
    form.addEventListener('submit', addSubmitListener);
    
    
});

  

const main = () => {
  // Invoke displayRamens here
  displayRamens()
  // Invoke addSubmitListener here
  
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
