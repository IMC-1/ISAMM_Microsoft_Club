const levelUpImages = Object.values(
    import.meta.glob('../assets/images/Events/Level Up/*.{jpg,jpeg,png,svg}', { eager: true })
).map(module => module.default);

export default levelUpImages;
