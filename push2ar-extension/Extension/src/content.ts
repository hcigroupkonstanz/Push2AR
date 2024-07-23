import { Colibri, Sync } from './colibri/index';
import browser from 'webextension-polyfill';
import type { UrlChangeMessage } from './models';

// Create a fixed-position container for swiping elements
const swipeContainer = document.createElement('div');
swipeContainer.style.position = 'fixed';
swipeContainer.style.top = '0';
swipeContainer.style.left = '0';
swipeContainer.style.width = '100vw';
swipeContainer.style.height = '100vh';
swipeContainer.style.overflow = 'hidden';
swipeContainer.style.pointerEvents = 'none';
document.body.appendChild(swipeContainer);

const initColibri = async () => {
    // fetch the ip from the storage
    const storage = await browser.storage.sync.get('push2ar_ip');
    Colibri.init('push2ar', storage.push2ar_ip);
}
initColibri();

// function loadWebFont() {
//   const link = document.createElement('link');
//   link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
//   link.rel = 'stylesheet';
//   document.head.appendChild(link);
// }

// loadWebFont(); // Call this function early in your script, or at least before you try to use the icons.

// some pages, e.g., google, manually set the background color of elements, which can interfere with the color scheme
var style = document.createElement('style');
style.innerHTML = '.push2ar * { background-color: unset !important; }';
document.getElementsByTagName('head')[0].appendChild(style);


/* ---------------------------------- */
/* ------ Sending URL to Unity ------ */
/* ---------------------------------- */

// Listen for messages from the background script
browser.runtime.onMessage.addListener((message: UrlChangeMessage, sender, sendResponse) => {
  // Check if the message is a URL change notification
  if (message.type === 'urlChange') {
    console.log(`New URL: ${message.url}`);
    // Handle the new URL (e.g., update the page, fetch new data, etc.)
    Sync.sendString('urlChange', message.url); // Send the URL to Unity
  }
});


/* ---------------------------------- */
/* --- Sending scrolling to Unity --- */
/* ---------------------------------- */



// Listen for scroll events
document.addEventListener('scroll', () => {
  sendScrollDifferenceToUnity();
}, false);

// Last scroll value
let lastScrollY: number = window.scrollY;

function sendScrollDifferenceToUnity() {
  const currentScrollY = window.scrollY;
  const scrollDifference = currentScrollY - lastScrollY; // Calculate the difference
  Sync.sendFloat('scrollDifferenceUpdate', scrollDifference); // Send the difference to Unity
  lastScrollY = currentScrollY; // Update the last scroll value
}

/* ------------------------ */
/* --- Helper functions --- */
/* ------------------------ */

// Function for generating a random pastel color
// function generateRandomPastelColor() {
//   // Generate pastel-like RGB values
//   const baseRed = 256; // Maximum for a lighter pastel shade
//   const baseGreen = 256; // Maximum for a lighter pastel shade
//   const baseBlue = 256; // Maximum for a lighter pastel shade

//   // Generate lighter (pastel) colors by mixing with white
//   const red = Math.floor((Math.random() + 1) * baseRed / 2);
//   const green = Math.floor((Math.random() + 1) * baseGreen / 2);
//   const blue = Math.floor((Math.random() + 1) * baseBlue / 2);

//   return `rgb(${red}, ${green}, ${blue})`;
// }

// Function for generating a random pastel color in RGB
function generateRandomPastelColor() {
  // Generate a base hue (0-360)
  const baseHue = Math.floor(Math.random() * 361);

  // Set high saturation and lightness values for pastel tones
  const saturation = 60 / 100; // Saturation as a fraction
  const lightness = 85 / 100; // Lightness as a fraction

  let c = (1 - Math.abs(2 * lightness - 1)) * saturation;
  let x = c * (1 - Math.abs((baseHue / 60) % 2 - 1));
  let m = lightness - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= baseHue && baseHue < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= baseHue && baseHue < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= baseHue && baseHue < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= baseHue && baseHue < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= baseHue && baseHue < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= baseHue && baseHue < 360) {
    r = c; g = 0; b = x;
  }

  // Convert to RGB in the range 0-255
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  // Construct the RGB color string
  return `rgb(${r}, ${g}, ${b})`;
}


// class PastelColorGenerator {
//   private recentHues: number[];
//   private usedColors: Set<string>;
//   private readonly saturation: number;
//   private readonly lightness: number;
//   private readonly hueChangeMin: number; // Minimum change in hue
//   private readonly memory: number; // How many past hues to remember

//   constructor() {
//       this.recentHues = []; // Store last few hues
//       this.usedColors = new Set<string>(); // Store used colors
//       this.saturation = 0.6; // Pastel saturation level
//       this.lightness = 0.8; // Pastel lightness level
//       this.hueChangeMin = 60; // Minimum change in hue to ensure distinct colors
//       this.memory = 3; // Number of past hues to remember and avoid
//   }

//   getNextColor(): string {
//       let newHue, newColor, colorString;
//       do {
//           // Generate a new hue that is distinct from the recent ones
//           do {
//               newHue = Math.floor(Math.random() * 360);
//           } while (this.recentHues.some(h => Math.abs(newHue - h) < this.hueChangeMin));

//           newColor = chroma.hsl(newHue, this.saturation, this.lightness);
//           colorString = newColor.hex();

//           // Allow reuse of colors only if we've gone through a significant portion of the color space
//           if (this.usedColors.size >= 360 / this.hueChangeMin) {
//               break; // Break the loop to allow reusing this color
//           }
//       } while (this.usedColors.has(colorString));

//       // Update recent hues, removing the oldest if necessary
//       this.recentHues.push(newHue);
//       if (this.recentHues.length > this.memory) {
//           this.recentHues.shift(); // Remove the oldest hue
//       }

//       this.usedColors.add(colorString); // Mark this color as used
//       return colorString;
//   }
// }



// const generator = new PastelColorGenerator();



function findAllLiSiblingsStartingElement(startElement: Element): Element | null {
  let currentElement = startElement;

  if (!currentElement)
    return null;
  
  while (currentElement && currentElement.parentNode) {
    const tag = currentElement.tagName;
    if (tag === 'LI' || tag === 'ARTICLE') {
      return currentElement;
    }

    // if the current element is too small, we'll ignore it
    const screenWidth = window.innerWidth;
    if (currentElement.getBoundingClientRect().width < screenWidth * 0.5) {
      currentElement = currentElement.parentNode as HTMLElement;
      continue;
    }

    const parentElement = currentElement.parentNode as HTMLElement;
    const siblings = Array.from(parentElement.children) as HTMLElement[];

    const classes = Array.from(currentElement.classList).filter(c => c !== 'push2ar');

    const matches = siblings
      .filter(s => arraysRoughlyEqual(classes, Array.from(s.classList).filter(c => c !== 'push2ar'), 0.8) && s.tagName === tag)
      .length;

    // since many websites nowadays have "ad" elements or "similar items" elements within the list,
    // we'll accept a match percentage to allow for some variation
    const matchPercent = matches / siblings.length;

    // console.log(currentElement, matches, matchPercent);

    if ((matches >= 10) || (matches > 5 && matchPercent > 0.8)) {
      return currentElement;
    } else {
      currentElement = parentElement;
    }
  }

  return null;
}

// Helper function to check if two arrays are equal
function arraysRoughlyEqual(arr1: any[], arr2: any[], threshold: number): boolean {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}


// Function to get the position of an element including scroll values
function getAbsolutePosition(element: HTMLElement): { top: number; left: number } {
  const rect = element.getBoundingClientRect();
  return { top: rect.top, left: rect.left };
}

// Function to create and overlay an element with a copy
function overlayElementWithCopy(element: HTMLElement): { copy: HTMLElement, original: HTMLElement, background: HTMLElement } {
  const position = getAbsolutePosition(element); // Get the original element's absolute position
  const elementCopy = element.cloneNode(true) as HTMLElement; // Create a deep clone of the element
  // element.style.visibility = 'hidden'; // Hide the original element

  // Set copied element's styles for positioning
  elementCopy.style.position = 'absolute';
  elementCopy.style.top = `${position.top}px`;
  elementCopy.style.left = `${position.left}px`;
  elementCopy.style.width = `${element.offsetWidth}px`;
  elementCopy.style.height = `${element.offsetHeight}px`;
  elementCopy.style.backgroundColor = 'white';
  elementCopy.style.zIndex = '11000'; // Ensure it is on top of the white background
  elementCopy.style.pointerEvents = 'auto'; // Ensure the copy can be interacted with
  elementCopy.classList.remove('m-2');


  // Create a new element for the white background
  const whiteBackground = document.createElement('div');
  whiteBackground.style.position = 'absolute';
  whiteBackground.style.top = `${position.top}px`;
  whiteBackground.style.left = `${position.left}px`;
  whiteBackground.style.width = `${element.offsetWidth}px`;
  whiteBackground.style.height = `${element.offsetHeight}px`;
  whiteBackground.style.backgroundColor = 'red';
  whiteBackground.style.zIndex = '10000'; // Ensure it is below the copied element but above everything else

  swipeContainer.appendChild(whiteBackground); // Append the white background inside the swipe container
  swipeContainer.appendChild(elementCopy); // Append the copy on top of the white background inside the swipe container


  return { copy: elementCopy, original: element, background: whiteBackground }; // Return all elements for further manipulation
}


// Function to send window dimensions to Unity
function sendWindowDimensions() {
  const dimensions = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  Sync.sendJson('windowDimensions', dimensions);
}



/* ---------------------------------- */
/* --- Handling the spwipe events --- */
/* ---------------------------------- */

let xStart: number = 0;
let yStart: number = 0;
let xEnd: number = 0;
let yEnd: number = 0;

let originalElement: HTMLElement | null = null;
let movingElement: HTMLElement | null = null;
let backgroundElement: HTMLElement | null = null;
let pastelColor: string = generateRandomPastelColor(); // Generate a pastel color for the item

// const shortLeftSwipeThreshold: number = Math.floor(window.innerWidth / 3);
const shortLeftSwipeThreshold: number = 0;
const swipeThreshold: number = Math.floor(window.innerWidth * 0.15); // e.g., swipe must cover at least 25% of the screen's width


interface SwipedItem {
  id: string;
  title: string;
  position: number;
  height: number;
  color: string;
  href: string;
  minimapPosition?: number;
}

let swipedItems: SwipedItem[] = [];
let isScrolling = false;
let animationRunning = false;


// Only add the following listeners if the current URL loaded does not contain 'control'
if (!window.location.href.includes('control')) {

  document.addEventListener('touchstart', function (e: TouchEvent): void {
    if (e.touches.length > 1) {
      // Handle multi-touch start scenario or ignore
      return;
    }
    if (animationRunning) return; // Prevent new swipes while an animation is running
    // Find the element at the start position
    const element: Element | null = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    if (!element) return;
    // Find the closest parent element that has all <li> siblings
    const closestLiParent: HTMLElement | null = findAllLiSiblingsStartingElement(element) as HTMLElement;
    // Look for an anchor element within the identified element
    const link: HTMLAnchorElement | null = closestLiParent ? closestLiParent.querySelector('a') : null;

    // Proceed only if there's a link
    if (link) {
      xStart = e.touches[0].clientX;
      yStart = e.touches[0].clientY;
      pastelColor = generateRandomPastelColor(); // Get the next distinct pastel color
      // Store these for potential swipe action
      originalElement = closestLiParent;
    } else {
      // Reset everything if no link found
      originalElement = null;
      movingElement = null;
      backgroundElement = null;
    }
  }, { passive: true });

  document.addEventListener('touchmove', function (e: TouchEvent) {
    if (e.touches.length > 1) {
      // Handle multi-touch start scenario or ignore
      return; // For simplicity, this example just returns
    }
    if (!originalElement) return; // No link found, so no need to proceed

    xEnd = e.touches[0].clientX;
    yEnd = e.touches[0].clientY;
    let xDifference: number = xStart - xEnd;
    const yDifference: number = yStart - yEnd;

    const element: Element | null = document.elementFromPoint(xStart, yStart);
    if (!element) return;
    const closestLiParent: HTMLElement | null = findAllLiSiblingsStartingElement(element) as HTMLElement;

    // A significant horizontal movement indicates a swipe
    if (!movingElement && Math.abs(xDifference) > Math.abs(yDifference) && !isScrolling && !animationRunning) {

      // if element is in swiped items and the user is doing a right swipe
      if (swipedItems.find(item => item.href === (closestLiParent?.querySelector('a') as HTMLAnchorElement).href) && xDifference < 0) {
        return;
      }

      // if element is not in swiped items an the user is doing a left swipe, DELTE THAT TO RE-ACTIVATE PREVIEW IN AR BROWSER
      if (!swipedItems.find(item => item.href === (closestLiParent?.querySelector('a') as HTMLAnchorElement).href) && xDifference > 0) {
        return;
      }

      if (closestLiParent) {
        closestLiParent.classList.add('push2ar');
        const overlayResult = overlayElementWithCopy(closestLiParent); // Store the result of overlay
        movingElement = overlayResult.copy; // Store the clone for movement
        originalElement = overlayResult.original; // Store the original for later
        backgroundElement = overlayResult.background; // Store the background for later
      }
    } else {
      isScrolling = true;
    }

    if (movingElement && !animationRunning) {

      // On a left swipe and if the item is not in swipeditems
      if (xDifference > 0 && !swipedItems.find(item => item.href === (originalElement?.querySelector('a') as HTMLAnchorElement).href) && xDifference > shortLeftSwipeThreshold) {
        // If the item position would be larger than the shortLeftSwipeThreshold
        xDifference = shortLeftSwipeThreshold;
      }
      // Else set the position to the difference
      movingElement.style.transform = `translateX(${-xDifference}px)`;


      // Move the item
      // movingElement.style.transform = `translateX(${-xDifference}px)`;

      if (backgroundElement && originalElement) {
        let iconHtml = '';
        let justifyContent = 'center'; // Default alignment
        const iconSize = Math.floor(originalElement.offsetHeight * 0.2); // Icon height is 50% of item's height
        let padding = '0px'; // Default padding
        let iconOpacity = Math.abs(xDifference) > swipeThreshold ? '1' : '0'; // Fade in icon based on threshold
        movingElement.style.backgroundColor = 'white';


        // Determine the type of swipe based on distance
        if (xDifference < 0 && xDifference) { // Push to AR
          backgroundElement.style.backgroundColor = "transparent";
          originalElement.style.backgroundColor = pastelColor;


          // Push2AR icon
          iconHtml = '';

        } else if (xDifference > shortLeftSwipeThreshold) { // Delete item
          backgroundElement.style.backgroundColor = '#f1807e';
          closestLiParent.classList.remove('push2ar');

          // Delete icon
          iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 1em; height: 1em;"><path fill="white" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.7 23.7 0 0 0 -21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0 -16-16z"/></svg>`;

          justifyContent = 'flex-end'; // Center-right for left swipe
          padding = '0 20px 0 0'; // Add padding to the right side

          //only if the background is not transparent
          if (originalElement.style.backgroundColor !== 'transparent' && originalElement.style.backgroundColor !== '') {
            movingElement.style.backgroundColor = originalElement.style.backgroundColor;
          } else {
            movingElement.style.backgroundColor = 'white';
          }

        } else if (xDifference > 0) { // View item in AR browser
          if (originalElement.style.backgroundColor !== 'transparent' && originalElement.style.backgroundColor !== '' && swipedItems.find(item => item.href === (originalElement?.querySelector('a') as HTMLAnchorElement).href)) {
            movingElement.style.backgroundColor = originalElement.style.backgroundColor;
          } else {
            movingElement.style.backgroundColor = 'white';
            originalElement.style.backgroundColor = '';
          }
          backgroundElement.style.backgroundColor = '#1E90FF';

          // View in AR browser icon
          iconHtml = `<span style="opacity:${iconOpacity};"><i class="fas fa-eye" style="color: white;"></i></span>`;
          justifyContent = 'flex-end'; // Place icon to the right for left swipe
          padding = '0 20px 0 0'; // Right padding to keep the icon away from edges
        } else {
          movingElement.style.backgroundColor = 'white';
          originalElement.style.backgroundColor = '';
        }

        // Update the background element
        backgroundElement.innerHTML = iconHtml;
        backgroundElement.style.display = 'flex';
        backgroundElement.style.justifyContent = justifyContent;
        backgroundElement.style.alignItems = 'center';
        backgroundElement.style.fontSize = `${iconSize}px`; // Set icon size relative to item height
        backgroundElement.style.height = `${originalElement.offsetHeight}px`; // Match background height to item height
        backgroundElement.style.padding = padding; // Apply padding based on swipe direction


      }
      e.preventDefault(); // Prevent scrolling when moving horizontally
    }

  }, { passive: false }); // Note: {passive: false} is necessary for the 'preventDefault' to work


  document.addEventListener('touchend', (e: TouchEvent): void => {
    // Return if more then one touch point is detected
    if (e.touches.length > 0) {
      return;
    }
    isScrolling = false;
    if (originalElement && movingElement) {
      let swipeDistance: number = xStart - xEnd;
      const elementTopPosition: number = getAbsolutePosition(originalElement).top;
      const link: HTMLAnchorElement = originalElement.querySelector('a') as HTMLAnchorElement;

      // On a left swipe and if the item is not in swipeditems
      if (swipeDistance > 0 && !swipedItems.find(item => item.href === (originalElement?.querySelector('a') as HTMLAnchorElement).href) && swipeDistance > shortLeftSwipeThreshold) {
        // If the item position would be larger than the shortLeftSwipeThreshold
        swipeDistance = shortLeftSwipeThreshold;
      }

      // Right swipe
      if (swipeDistance < 0) {

        if (Math.abs(swipeDistance) > swipeThreshold) {
          // Directly apply CSS styles for the transition to the moving element
          animationRunning = true;
          movingElement.style.transition = 'transform 0.25s ease';
          movingElement.style.transform = 'translateX(' + window.innerWidth + 'px)';
        }
        else {
          animationRunning = true;
          movingElement.style.transition = 'transform 0.25s ease';
          movingElement.style.transform = 'translateX(0px)';
        }

        // Use transition end event to remove the element after animation
        movingElement.addEventListener('transitionend', function handler() {
          // Clean up after swipe
          if (movingElement) {
            movingElement.removeEventListener('transitionend', handler);
          }
          if (swipeContainer && movingElement && backgroundElement) {
            swipeContainer.removeChild(movingElement);
            swipeContainer.removeChild(backgroundElement);
            createOrUpdateMinimap();
          }
          if (originalElement) {
            originalElement.style.visibility = 'visible';

            if (Math.abs(swipeDistance) < swipeThreshold) {
              originalElement.style.backgroundColor = '';
            }

          }

          movingElement = null;
          originalElement = null;
          backgroundElement = null;
          animationRunning = false;
        }, { once: true });
      } else if (swipeDistance > 0) { // Left swipe
        // Directly apply CSS styles for the transition to the moving element
        animationRunning = true;
        movingElement.style.transition = 'transform 0.25s ease';
        movingElement.style.transform = 'translateX(0px)';

        // Use transition end event to remove the element after animation
        movingElement.addEventListener('transitionend', function handler() {
          // Clean up after swipe
          if (movingElement) {
            movingElement.removeEventListener('transitionend', handler);
          }
          if (swipeContainer && movingElement && backgroundElement) {
            swipeContainer.removeChild(movingElement);
            swipeContainer.removeChild(backgroundElement);
          }
          if (originalElement) {
            originalElement.style.visibility = 'visible';
          }

          movingElement = null;
          originalElement = null;
          backgroundElement = null;
          animationRunning = false;
        }, { once: true });
      } else {
        // Clean up after swipe

        if (swipeContainer && movingElement && backgroundElement) {
          swipeContainer.removeChild(movingElement);
          swipeContainer.removeChild(backgroundElement);
        }
        if (originalElement) {
          originalElement.style.visibility = 'visible';
          originalElement.style.backgroundColor = '';
        }

        movingElement.style.backgroundColor = 'white';


        movingElement = null;
        originalElement = null;
        backgroundElement = null;
        animationRunning = false;
        return;
      }

      if (Math.abs(swipeDistance) > swipeThreshold) {

        // Determine the type of swipe based on distance
        if (swipeDistance < 0) { // Push to AR

          // Take care of the minimap
          const newItem = {
            id: link.id || `swiped-link-${Date.now()}`,
            title: link.textContent || 'No Title',
            screen_position: elementTopPosition,
            position: elementTopPosition + window.scrollY,
            height: originalElement.offsetHeight,
            scroll: window.scrollY,
            color: pastelColor,
            href: link.href,
            minimapPosition: 0
          };
          swipedItems.push(newItem);
          createOrUpdateMinimap();


          // Get height of original element
          const elementHeight = originalElement.offsetHeight;

          Sync.sendJson('push2ArListView', { href: link.href, top: elementTopPosition, height: elementHeight, left: 0, color: pastelColor, minimapPosition: newItem.minimapPosition });
        } else if (swipeDistance > shortLeftSwipeThreshold) {
          swipedItems = swipedItems.filter(item => item.href !== link.href); // Use the href attribute for comparison
          createOrUpdateMinimap(); // Call this function to refresh the mini-map
          Sync.sendString('removeFromArItemView', link.href); // Deletion
          originalElement.style.backgroundColor = 'transparent';
        }
        else {
          Sync.sendString('push2ArItemView', link.href); // Push to AR browser
        }
      }
    }
  }, { passive: true });

}

/* --------------------------------------- */
/* --- Generate and update the minimap --- */
/* --------------------------------------- */


function createOrUpdateMinimap() {
  let minimap = document.getElementById('minimap');
  if (!minimap) {
    minimap = document.createElement('div');
    minimap.id = 'minimap';
    minimap.style.cssText = 'position: fixed; right: 0; top: 0; bottom: 0; width: 32px; height: 100%; background-color: rgba(70,70,70,0.7); z-index: 12000; border-left: 1px solid #ccc; transition: background-color 0.3s;';
    document.body.appendChild(minimap);
  }

  minimap.innerHTML = '';

  swipedItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.style.backgroundColor = item.color;
    let totalHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    const relativePosition = item.position / totalHeight;

    // Calculate the height of the item element
    const itemHeight = (item.height / totalHeight) * 100;

    itemElement.style.cssText += `position: absolute; top: ${relativePosition * 100}%; width: 100%; z-index: 12400; height: ${itemHeight}%; cursor: pointer;`;// transform: translateY(-50%); min-height: 1%;

    itemElement.title = item.title;

    itemElement.addEventListener('click', () => {
      window.scrollTo({
        top: item.position - (window.innerHeight / 2) + (item.height / 2),
        behavior: 'smooth'
      });
      Sync.sendString('minimapScrollTo', item.href);
    });
    if (minimap) {
      minimap.appendChild(itemElement);
      item.minimapPosition = itemElement.getBoundingClientRect().top + itemElement.getBoundingClientRect().height / 2;
      Sync.sendJson('minimapUpdate', { href: item.href, top: itemElement.getBoundingClientRect().top + itemElement.getBoundingClientRect().height / 2 });
    }

  });
}

if (!window.location.href.includes('control')) {
  createOrUpdateMinimap();

  window.addEventListener('resize', createOrUpdateMinimap);
}

function adjustNavLayout(): void {
  // This could be adjusted depending on the specifics of your nav and layout
  const navCssString: string = 'nav { width: calc(100% - 32px); }';
  const head: HTMLHeadElement | null = document.head || document.getElementsByTagName('head')[0];
  const style: HTMLStyleElement = document.createElement('style');

  if (head) {
    head.appendChild(style);
    style.type = 'text/css';

    if ((style as any).styleSheet) {
      // This is for older versions of IE.
      (style as any).styleSheet.cssText = navCssString;
    } else {
      style.appendChild(document.createTextNode(navCssString));
    }
  }
}


// This function creates and injects a new style element with your custom CSS.
function addCustomStyles(): void {
  const css: string = `.reduced-width { margin-right: 32px !important; width: calc(100% - 32px) !important; }`;
  const head: HTMLHeadElement | null = document.head || document.getElementsByTagName('head')[0];
  const style: HTMLStyleElement = document.createElement('style');
  style.type = 'text/css';

  if (head) {
    head.appendChild(style);
  }

  if ((style as any).styleSheet) {
    // This is required for IE8 and below.
    (style as any).styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

// This function adds the 'reduced-width' class to the body element.
function adjustPageLayout(): void {
  const body: HTMLBodyElement | null = document.querySelector('body');
  if (body) {
    body.classList.add('reduced-width');
  }
}

if (!window.location.href.includes('control')) {
  addCustomStyles();
  adjustPageLayout();
  adjustNavLayout();
}

