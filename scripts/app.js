function renderExtensions(data) {
   console.log("renderExtensions called with:", data);
    
    const cardContainer = document.getElementById("card-container");
    const cardTemplate = document.getElementById("card-template");
    
    // Clear the current cards
      const existingCards = cardContainer.querySelectorAll('.card');
      existingCards.forEach(card => card.remove());
    

    data.forEach((extension, index) => {
        const cloneCard = cardTemplate.content.cloneNode(true);
        const img = cloneCard.querySelector("img");
        const title = cloneCard.querySelector(".card-title");
        const desc = cloneCard.querySelector(".card-description");
        const checkBox = cloneCard.querySelector('input[type="checkbox"]');
        const removeBtn = cloneCard.querySelector(".btn-remove");
        const card = cloneCard.querySelector(".card");

        img.src = extension.logo;
        img.alt = `${extension.name} logo`;
        title.textContent = extension.name;
        desc.textContent = extension.description;
        checkBox.checked = extension.isActive;

        // Toggle checkbox
        checkBox.addEventListener("change", () => {
            extension.isActive = checkBox.checked;
        });

        // Remove 
        removeBtn.addEventListener("click", () => {
            // Remove the extension at the specific index
            data.splice(index, 1);
            // Remove the specific card from the DOM
            card.remove();
        });

        cardContainer.appendChild(cloneCard);
    });
}     
  

document.addEventListener("DOMContentLoaded", async () => {
   
    const modeIcon = document.querySelector(".mode-icon");
    const body = document.body;
  
    //  Toggle dark/light mode
    modeIcon.addEventListener("click", () => {
      body.classList.toggle("light-mode");
  
      const isLightMode = body.classList.contains("light-mode");
  
      modeIcon.src = isLightMode
        ? "/assets/images/icon-moon.svg"
        : "/assets/images/icon-sun.svg";
  
      modeIcon.alt = isLightMode
        ? "Light Mode Icon"
        : "Dark Mode Icon"; 
    });
  
    //  Load extensions

    let extensions = [];

    try {
     extensions = await fetch("data.json").then((response) => {
        if (!response.ok) throw new Error("Failed to load the json");
        return response.json();
      });
      console.log(extensions);
     
    } catch (error) {
      console.error("Error loading extensions:", error);
    }
    renderExtensions(extensions);
    // for filters fn 
    const filtersBtns = document.querySelectorAll(".filters button");
    filtersBtns.forEach((btn) => {
        btn.addEventListener("click", ()=> {
            const filter = btn.textContent.toLowerCase();
            let filteredExtensions;
            if(filter == "all")
                filteredExtensions = extensions;
            else if (filter == "active")
                filteredExtensions = extensions.filter((extension) => extension.isActive);
            else if (filter == "inactive")
                filteredExtensions = extensions.filter((extension) => !extension.isActive);
            console.log(filteredExtensions);
            renderExtensions(filteredExtensions);
           
        })
    })
   
  
    
  });
  