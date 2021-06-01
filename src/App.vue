<template>
    <div id="app">
        <header>
            Demo App Header
            <nav>
                <router-link to="/">
                    Page 1
                </router-link> |
                <router-link to="/page2">
                    Page 2
                </router-link>
            </nav>
        </header>

        <router-view />

        <footer>
            Demo App Footer
        </footer>
    </div>
</template>

<script>
export default {
    name: 'App',
};
</script>
