import { ContactForm } from "../components/Forms/Contact";

export function RenderContact() {
    const onSubmit = (data) => {
        console.log('Contact Form Submission:', data);
    };

    return (
        <>
            <ContactForm onSubmit={onSubmit} />
        </>
    );
}
