export default function Image({ src, ...rest }) {
    let updatedSrc = src;

    if (src) {
        if (src.includes("uploads")) {
            updatedSrc = "http://localhost:4000/uploads/" + src;
        } else {
            updatedSrc = "http://localhost:4000/uploads/uploads/" + src;
        }
    }

    return <img {...rest} src={updatedSrc} alt={""} />;
}
