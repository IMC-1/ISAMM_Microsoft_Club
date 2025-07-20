// Vite-compatible image import using import.meta.glob
const imcTalk1Images = Object.values(
    import.meta.glob('../assets/images/Events/imc talk 1.0/*.{jpg,jpeg,png,svg}', { eager: true })
).map(module => module.default);

export default imcTalk1Images;
