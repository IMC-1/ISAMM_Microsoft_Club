const imcTalk2Images = Object.values(
    import.meta.glob('../assets/images/Events/imc talk 2.0/*.{jpg,jpeg,png,svg}', { eager: true })
).map(module => module.default);

export default imcTalk2Images;
