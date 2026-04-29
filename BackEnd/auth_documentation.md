# 🔐 Boro Bazar Authentication System Documentation

This document explains the architecture, logic, and flow of the Boro Bazar Backend Authentication system.

---

## 🏗️ Architecture Overview

The authentication system follows a **Service-Oriented Architecture (SOA)**, separating concerns into four layers:

1.  **Routes**: Defines endpoints and attaches validation/middleware.
2.  **Controllers**: Handles HTTP request/response logic and cookie management.
3.  **Services**: Contains core business logic (DB interactions, token generation, external API calls).
4.  **Models**: Defines data structure and helper methods (hashing, OTP generation).

---

## 🔄 Authentication Flows

### 1. Sign Up (Local Registration)
- **Flow**: `Controller.register` → `Service.register` → `User.create`.
- **Logic**: 
    - Validates email uniqueness and checks if the email is already linked to Google.
    - Hashes password automatically via Mongoose `pre('save')` middleware using `bcrypt` (12 salts).
    - Generates a 6-digit OTP using `crypto.randomInt` for cryptographic security.
    - Sends a verification email.
    - Instantly generates an Access Token and Refresh Token, effectively auto-logging the user in.
    - Sets a `httpOnly` Refresh Token cookie and returns the Access Token.
- **Verification**: The user must call `/verify-email` with the OTP to verify their email, but they are already authenticated and can access protected routes immediately.

### 2. Login (Email/Password)
- **Flow**: `Controller.login` → `Service.login`.
- **Logic**:
    - Checks if the user exists.
    - Verifies the password using `bcrypt.compare`.
    - On success, generates a new Access and Refresh token pair.
    - Sets `httpOnly` Refresh Token cookie.

### 3. Google OAuth 2.0
- **Flow**: `Controller.googleAuth` → `Service.googleLogin` → `googleAuthService.authenticateWithGoogle`.
- **Logic**:
    - Accepts an `idToken` from the frontend.
    - Verifies the token's signature and audience using the official `google-auth-library`.
    - If the user exists, updates their profile. If not, creates a new verified account.
    - This flow skips local password handling entirely for security.

### 4. Token Refresh (Session Persistence)
- **Flow**: `Controller.refreshTokens` → `Service.refreshTokens`.
- **Logic**:
    - Reads the `refreshToken` from the `httpOnly` cookie.
    - Verifies the token's signature and expiration.
    - Implements **Refresh Token Rotation**: Every time a session is refreshed, a *new* refresh token is generated and the old one is replaced in the DB. This mitigates the risk of token theft.

### 5. Password Reset (OTP Flow)
- **Flow**: 
    1.  `/forgot-password`: Generates secure OTP and sends email.
    2.  `/verify-otp`: Validates the code (Max 5 attempts allowed).
    3.  `/reset-password`: Updates the password and invalidates all existing sessions (clears refresh token).

---

## 🛠️ Key Components & Functions

### `auth/tokens.js`
- **`generateTokens(user)`**: Creates a short-lived Access Token (15m) and a long-lived Refresh Token (7d).
- **`verifyToken(token, type)`**: Validates the JWT and ensures the `type` claim matches (access vs refresh).

### `auth/user.model.js`
- **`generateOTP()`**: Uses `crypto.randomInt` to create a non-predictable 6-digit code.
- **`toJSON()`**: A safety filter that automatically removes `password`, `refreshToken`, and `otp` fields whenever a user object is sent to the client.

### `auth/googleAuthService.js`
- **`verifyGoogleToken(idToken)`**: Uses Google's public keys to verify that the token was actually issued by Google and intended for this application.

### `middleware/authMiddleware.js`
- **`protect`**: The primary gatekeeper. It extracts the Bearer token, verifies it, checks if the user still exists and isn't locked, and attaches the user payload to `req.user`.
- **`admin`**: Restricts access to routes based on the `role` field.

---

## 🔒 Security Summary

| Feature | Implementation | Purpose |
| :--- | :--- | :--- |
| **Password Hashing** | Bcrypt (12 rounds) | Protects passwords in case of DB leak. |
| **Token Storage** | httpOnly, Secure, SameSite Cookies | Prevents XSS-based token theft. |
| **Input Validation** | Joi Schema Middleware | Sanitizes data and prevents malicious payloads. |
| **Data Sanitization** | `express-mongo-sanitize` | Prevents NoSQL Injection attacks. |
| **CSRF Protection** | SameSite Cookie Policy | Mitigates Cross-Site Request Forgery. |
| **OAuth Security** | Official Google Library | Ensures Google login cannot be spoofed. |

---

## 📡 API Reference

- `POST /api/auth/register`: Register new account.
- `POST /api/auth/verify-email`: Verify email with OTP.
- `POST /api/auth/login`: Login & get tokens.
- `POST /api/auth/logout`: End session & clear cookies.
- `POST /api/auth/refresh`: Get new tokens via cookie.
- `POST /api/auth/forgot-password`: Request reset OTP.
- `POST /api/auth/reset-password`: Update password with OTP.
- `GET /api/auth/profile`: Get current user info (Protected).
