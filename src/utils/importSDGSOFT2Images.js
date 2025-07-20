const sdgsoft2Images = Object.values(
    import.meta.glob('../assets/images/Events/SDGSOFT 2.0/*.{jpg,jpeg,png,svg}', { eager: true })
).map(module => module.default);

export default sdgsoft2Images;
