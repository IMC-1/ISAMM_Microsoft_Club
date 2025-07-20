const codingUniverseImages = Object.values(
    import.meta.glob('../assets/images/Events/Coding Universe Hackathon/*.{jpg,jpeg,png,svg}', { eager: true })
).map(module => module.default);

export default codingUniverseImages;
