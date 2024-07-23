// Defines the types of messages that can be sent between the content script and the background script.
export type BrowserMessageType = 'getColorScheme' | 'gotColorScheme' | 'sendUrl' | 'urlChange';

// Represents a general structure for messages sent between the scripts.
export interface BrowserMessage {
  type: BrowserMessageType;
  value?: any; // Consider specifying a more precise type if possible.
}

// Specific message structure for sending URLs.
export interface SendUrlMessage extends BrowserMessage {
  type: 'sendUrl';
  url: string; // The message includes a URL string.
}

export interface UrlChangeMessage extends BrowserMessage {
  type: 'urlChange';
  url: string; // The URL that the user has navigated to.
}

export interface BrowserMessage {
  type: BrowserMessageType;
  value?: any; // You can specify the type more precisely if needed
}


// Settings for the application, potentially configurable by the user.
export type AppSettings = {
  colibriIp: string;
};

// Default settings for the application.
export const DEFAULT_SETTINGS: AppSettings = {
  colibriIp: 'localhost'
};

// Represents the supported color schemes.
export type ColorScheme = 'light' | 'dark';
