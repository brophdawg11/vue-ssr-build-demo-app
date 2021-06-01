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
    name: 'Page2',
    async fetchData({ store }) {
        await new Promise(r => setTimeout(r, 500));
        store.commit('setMessage', 'Howdy from Page 2');
    },
};
</script>

<style scoped lang="scss">
$color: blue;

h1 {
    color: $color;
}
</style>
