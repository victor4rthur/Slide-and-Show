// Function to debounce the provided function execution
// Debouncing ensures the function is not called too often, improving performance
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Select all elements with the class "slide-in"
const sliderImages = document.querySelectorAll(".slide-in");

// Function to check if the images are in the viewport and add/remove the 'active' class accordingly
function checkSlide(e) {
  sliderImages.forEach((sliderImage) => {
    // Gives the half of the image height compared to the inner height of the screen
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2;
    // Bottom of the image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

// Add a scroll event listener with debouncing to the window
window.addEventListener("scroll", debounce(checkSlide));
