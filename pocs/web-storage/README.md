# Web Storage Mechanisms Comparison

This repository demonstrates and explains the differences between three main web storage mechanisms: Cookies, Local Storage, and Session Storage.

## Overview

### 1. Cookies
- **Storage Location**: Sent with every HTTP request to the server
- **Capacity**: Typically 4KB per domain
- **Persistence**: Can be set to expire at a specific time or when the browser is closed
- **Security**: Can be marked as `HttpOnly` for security
- **Cross-Origin**: Can be shared across subdomains
- **Usage**: Authentication, session management, tracking

### 2. Local Storage
- **Storage Location**: Browser storage
- **Capacity**: Typically 5-10MB per origin
- **Persistence**: Persists until explicitly deleted
- **Security**: Accessible only through JavaScript
- **Cross-Origin**: Limited to same origin
- **Usage**: Client-side data persistence, user preferences, caching

### 3. Session Storage
- **Storage Location**: Browser storage
- **Capacity**: Typically 5-10MB per origin
- **Persistence**: Cleared when the page session ends (tab or window is closed)
- **Security**: Accessible only through JavaScript
- **Cross-Origin**: Limited to same origin
- **Usage**: Temporary data storage, form data, shopping cart

### 4. IndexedDB
- **Storage Location**: Browser storage
- **Capacity**: Typically 50-100MB or more, depending on browser
- **Persistence**: Persists until explicitly deleted
- **Security**: Accessible only through JavaScript
- **Cross-Origin**: Limited to same origin
- **Usage**: Complex data storage, offline applications, caching

## Key Differences

| Feature | Cookies | Local Storage | Session Storage |
|---------|---------|--------------|-----------------|
| Storage Location | Sent with HTTP requests | Browser storage | Browser storage |
| Capacity | ~4KB | ~5-10MB | ~5-10MB |
| Persistence | Configurable | Until deleted | Until session ends |
| Security | Can be `HttpOnly` | JavaScript only | JavaScript only |
| Cross-Origin | Can be shared | Same origin | Same origin |
| Use Case | Authentication, tracking | Data persistence | Temporary data |

## Example Files

This repository includes four example files demonstrating each storage mechanism:
1. `cookies-demo.html` - Shows how to work with cookies
2. `local-storage-demo.html` - Demonstrates local storage usage
3. `session-storage-demo.html` - Shows session storage implementation
4. `indexeddb-demo.html` - Demonstrates IndexedDB usage for complex data storage

## Security Considerations

1. **Cookies**:
   - Use `HttpOnly` flag to prevent JavaScript access
   - Use `Secure` flag for HTTPS-only transmission
   - Set appropriate `SameSite` attribute

2. **Local Storage**:
   - Never store sensitive data
   - Can be accessed by any script on your domain
   - Can be cleared by users

3. **Session Storage**:
   - Similar security considerations as Local Storage
   - Data is lost when session ends
   - Can be used for temporary sensitive data

## Browser Support
All three mechanisms are supported by all modern browsers. However, cookies have been around longer and have more consistent support across older browsers.

## Best Practices

1. Use cookies for:
   - Authentication tokens
   - Session management
   - Cross-origin tracking

2. Use Local Storage for:
   - Client-side data persistence
   - User preferences
   - Caching

3. Use Session Storage for:
   - Temporary data
   - Form data
   - Shopping cart contents
   - Single-session data

## References
- MDN Web Docs: [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- MDN Web Docs: [HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- OWASP: [Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
