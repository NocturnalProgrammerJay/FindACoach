<template>
    <li>
        <h3>{{ fullName }}</h3>
        <h4>${{ rate }} </h4>
        <div>
            <span v-for="area in areas" :key="area">{{  area }}</span>
        </div>
        <div class="actions">
            <router-link to="/coaches/c1/contact">Contact</router-link>
            <router-link to="/coaches/c1">View Details</router-link>
        </div>
    </li>
</template>

<style></style>