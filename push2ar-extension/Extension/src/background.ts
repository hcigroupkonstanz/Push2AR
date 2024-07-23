import browser from 'webextension-polyfill';
import type { BrowserMessage, BrowserMessageType, ColorScheme, SendUrlMessage, UrlChangeMessage } from './models';
import { Colibri, Sync } from './colibri/index';

Colibri.init('push2ar', 'localhost');

import settingsConnector from './settings-connector';

console.log('Background script running...');

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the URL has changed
  if (changeInfo.url) {
    console.log(`Tab ${tabId} navigated to ${changeInfo.url}`);
    // Prepare the URL change message you want to send
    const message = {
      type: 'urlChange', // Ensure this matches your content script's expected type
      url: changeInfo.url
    };
    // Send the new URL to the content script immediately
    browser.tabs.sendMessage(tabId, message).catch(err => console.error("Error sending URL change message:", err));
  }
});



browser.runtime.onMessage.addListener((message: BrowserMessage, sender, sendResponse) => {
  console.log('Received message:', message);
  switch (message.type) {
    case 'gotColorScheme':
      updateIcon(message.value as ColorScheme).then(sendResponse);
      return true; // Indicates an asynchronous response
    
    case 'sendUrl':
      handleUrl((message as SendUrlMessage).url).then(sendResponse);
      return true; // Indicates an asynchronous response
    
    // Include other cases as necessary
  }
});

async function updateIcon(colorScheme: ColorScheme) {
  console.log('Updating icon to:', colorScheme);
  // Implement icon update logic here
}

async function handleUrl(url: string) {
  console.log('URL received:', url);
  try {
    // Sync.sendString('urlChannel', url);
    console.log('URL sent via Colibri on channel: urlChannel');
    return {confirmation: "URL processed and sent via Colibri"};
  } catch (error) {
    console.error('Error sending URL via Colibri:', error);
    return {confirmation: "Failed to send URL via Colibri", error: error};
  }


}
