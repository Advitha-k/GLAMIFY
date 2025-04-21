document.addEventListener("DOMContentLoaded", function () {
  // Get all tab links
  const tabLinks = document.querySelectorAll("nav ul li a");
  
  // Add event listener to each tab link
  tabLinks.forEach(link => {
      link.addEventListener("click", function (event) {
          event.preventDefault(); // Prevent page jump

          // Get the section ID from href attribute (e.g., "#moisturizer")
          const targetId = this.getAttribute("href").substring(1);

          // Hide all product sections
          document.querySelectorAll(".products-container").forEach(section => {
              section.style.display = "none";
          });

          // Show the selected section
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
              targetSection.style.display = "flex"; // Change display as per your layout
          }
      });
  });

  // Show the first section by default
  document.getElementById("sunscreen").style.display = "flex"; 
});
