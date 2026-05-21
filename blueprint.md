## Purpose and Capabilities

This is a React application that allows users to purchase skin care products. The application provides a questionnaire to help users find the right product for their skin type. Users can also browse a catalog of products, add items to their cart, and checkout.

## Implemented Features

*   **Questionnaire:** A questionnaire to help users find the right product for their skin type.
*   **Catalog:** A catalog of skin care products.
*   **Shopping Cart:** A shopping cart to hold items for purchase.
*   **Checkout:** A checkout process to purchase items in the shopping cart.

## Design

*   **Styling:** The application is styled using Material-UI.
*   **Routing:** The application uses react-router-dom for routing.
*   **State Management:** The application uses React's built-in state management.

## Current Plan

I have fixed a bug that was causing an error page to be displayed. The bug was caused by a race condition that was occurring when the user was being redirected to the workflow page. I have fixed the bug by passing the selected item's data directly to the workflow component. This ensures that the data is available immediately, preventing any race conditions.
