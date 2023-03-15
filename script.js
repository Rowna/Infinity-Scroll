const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

const count = 30;
// Unsplash API
const apiKey = "3Dp-xPCY6EniYUxOGDbUFEX8t9bjhtdKQKI8uN3KtOE";
const apiURL = `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${count}&orientation=landscape`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready is " + ready);
  }
}

// DRY-Konzept
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// display Photos
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log(totalImages);
  photosArray.forEach((photo) => {
    // create <a> to link the photos the the DOM
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // EL, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
    // console.log(photosArray);
  } catch (error) {
    // Catch Error Here
    console.log(error.message);
  }
}

// innerHeight: total height of browser window
// window.scrollY: distance from top of page user has scrolled, number will keep gowing up
// document.body.offsetHeight = height of everything in the body, including what is not within view
// 1000px: I need to subtract from offsetHeight, to trigger event(imagesLoaded()) before bottom is reached.

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000 && ready
  ) {
    getPhotos();
    console.log(`load more!`);

    // console.log(`window.innerHeight: ${window.innerHeight}`);
    // console.log(`window.scrollY: ${window.scrollY}`);
    // console.log(`window.innerHeight + window.scrollY: ${window.innerHeight + window.scrollY}`);
    // console.log(`document.body.offsetHeight - 1000: ${document.body.offsetHeight}`);
    // console.log(`-------------------------------`);
  }
});

// On Load
getPhotos();
displayPhotos();
