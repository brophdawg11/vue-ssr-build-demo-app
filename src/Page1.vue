<template>
    <div>
        <h1>{{ $store.state.message }}</h1>
        <p>Count: {{ $store.state.count }}</p>
        <button @click="$store.commit('increment')">
            Increment
        </button>
    </div>
</template>

<script>
export default {
    name: 'Page1',
    async fetchData({ store }) {
        await new Promise(r => setTimeout(r, 500));
        store.commit('setMessage', 'Hello from Page 1');
    },
};
</script>

<style scoped lang="scss">
$color: blue;

h1 {
    color: $color;
}
</style>
