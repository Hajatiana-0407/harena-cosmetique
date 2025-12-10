# TODO List for Cosmetic Harena Pending Features Implementation

## 1. Update Messenger API routes to persist messages using Messenger entity
- [x] Modify GET /api/messages to fetch messages from database using MessengerRepository
- [x] Modify POST /api/messages to save messages to database using Messenger entity
- [x] Ensure messages are filtered by client and ordered by creation date

## 2. Add profile editing form in compte.jsx with PUT /api/client/update API route
- [x] Create PUT /api/client/update route in ApiController.php to handle profile updates
- [x] Add file upload handling for photo in the API route
- [x] Update Client entity if needed (add image field)
- [x] Add edit form in compte.jsx for name, email, address, phone, photo
- [x] Connect form to API and handle success/error responses

## 3. Add search API route and make Headers search functional
- [x] Create GET /api/search route in ApiController.php to search products by name/description
- [x] Make Headers.jsx search input functional with API call
- [x] Display search results or redirect to catalogue with filtered results

## 4. Update DetailProduit for dynamic tabs from API and clickable mini images
- [ ] Modify DetailProduit to load tabs content from product API data
- [ ] Make mini images clickable to change main image
- [ ] Ensure tabs are dynamic based on product data

## 5. Implement DetailBlogs with HTML tag filtering and API integration
- [ ] Implement DetailBlogs component with article display
- [ ] Add HTML tag filtering for safe content rendering
- [ ] Integrate with articles API to load blog details

## 6. Add error handling to redirect to /error on API failures
- [ ] Add try-catch blocks in components for API calls
- [ ] Redirect to /error page on API failures
- [ ] Update App.jsx to handle error routes properly

## 7. Add serialization groups to Produit.php entity
- [x] Add 'produit:read' serialization groups to all fields in Produit.php
- [x] Test /api/produits endpoint to ensure no 500 errors

## 8. Update TODO.md with progress
- [ ] Mark completed tasks as done
- [ ] Add any new tasks discovered during implementation
