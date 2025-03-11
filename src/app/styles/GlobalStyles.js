// src/styles/GlobalStyles.js
"use client";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`


:root {
  --ifm-background-color: #18191a;
    --ifm-background-surface-color: #242526;
    --ifm-hover-overlay: hsla(0,0%,100%,0.05);

 &, &.light-mode{


-color-brand-50: #eef2ff;
  --color-white: #fff;
    --color-gray-100:  #f9fafb;
   --color-gray-200: #E9E9E9;
   --color-gray-300: #D9D9D9;
   --color-gray-400:  #9ca3af;
   --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;


  --color-text-primary:#666666; 
  --color-primary:#015979; 
  --color-secondary:#1b9e99;

   --color-red-100:  #fee2e2;
  --color-red-200:  #fecaca;
   --color-red-300:  #fca5a5;

   --color-red-400:  #f87171;
   --color-red-500:  #ef4444;
   --color-emerlad-300:#6ee7b7;
   --color-emerlad-400:#34d399;
   --color-emerlad-500:#10b981;
   --color-purple-800:#6b21a8;
   --color-purple-400:#c084fc;
   --color-purple-300:#d8b4fe;

   --color-chart-300: #a5b4fc;
   --color-chart-200: #c7d2fe;
   --color-chart-100: #e0e7ff;
   --color-sky-600:#0284c7;
--color-sky-700:#0369a1;
   --color-sky-800:#075985;
   --color-blue-900:#1e3a8a;
 }
 }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f5f7fa;
    color: var(--color-text-primary);
  }

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
    padding: 0;
  }
`;

export default GlobalStyles;
