<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <header>
    <div class="container">
      <div class="navbar">
        <nav>
          <ul>
            <li id="houses">
              <RouterLink to="/">
                <span class="text">Home</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>