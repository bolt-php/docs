# Auth

The **Auth** module provides drop-in authentication scaffolding for your Bolt application. It includes secure session handling, password hashing via `password_hash`, and simple route guards you can attach to controllers.

## Features

- **Session-based authentication** out of the box
- **Password hashing** using PHP's modern `password_hash` (bcrypt by default)
- **CSRF protection** baked into every form helper
- **Route guards** to restrict access to authenticated users
- **Remember-me** support via signed cookies

## Quick Start

After installing, register the bundled routes in your `app/routes.php`:

```php
use BoltPHP\Auth\Auth;

Auth::routes();
```

This exposes `/login`, `/register`, and `/logout` immediately.

## Protecting Routes

```php
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware('auth');
```

::: tip
The middleware automatically redirects unauthenticated users to `/login` and preserves the intended destination for redirect-after-login.
:::

## Configuration

All options live in `app/config/auth.php`. The defaults work for most apps, but you can customize:

- The user model (`auth.model`)
- The session lifetime (`auth.lifetime`, in minutes)
- The password rehash threshold (`auth.rehash_threshold`)
