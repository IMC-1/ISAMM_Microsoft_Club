const sdgsoft1Images = Object.values(
    import.meta.glob('../assets/images/Events/SDGSOFT 1.0/*.{jpg,jpeg,png,svg}', { eager: true })
).map(module => module.default);

export default sdgsoft1Images;
