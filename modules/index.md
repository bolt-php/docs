---
layout: page
title: Modules
---

# Modules

Bolt PHP modules extend the core framework with additional functionality. Install only what you need and keep your application lean.

<ClientOnly>
  <ModuleGrid :modules="[
    {
      name: 'Auth',
      slug: 'auth',
      summary: 'Drop-in authentication scaffolding with sessions, password hashing, and route guards. Get a working login, registration, and protected routes in minutes.',
      install: 'composer require bolt-php/auth',
      tags: ['Authentication', 'Security']
    }
  ]" />
</ClientOnly>
