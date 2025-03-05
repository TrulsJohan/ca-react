import { useForm } from 'react-hook-form';

export function ContactForm({ onSubmit }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            fullName: '',
            subject: '',
            email: '',
            body: '',
        },
    });

    const handleFormSubmit = (data) => {
        onSubmit(data);
        reset();
    };

    return (
        <div className="contact-form max-w-md mx-auto mt-6">
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-4">
                {/* Full Name */}
                <div>
                    <label htmlFor="fullName" className="block mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        {...register('fullName', {
                            required: 'Full name is required',
                            minLength: {
                                value: 3,
                                message:
                                    'Full name must be at least 3 characters',
                            },
                        })}
                        className="border rounded p-2 w-full"
                        placeholder="Your Full Name"
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>

                {/* Subject */}
                <div>
                    <label htmlFor="subject" className="block mb-1">
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        {...register('subject', {
                            required: 'Subject is required',
                            minLength: {
                                value: 3,
                                message:
                                    'Subject must be at least 3 characters',
                            },
                        })}
                        className="border rounded p-2 w-full"
                        placeholder="Subject of your message"
                    />
                    {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.subject.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Please enter a valid email address',
                            },
                        })}
                        className="border rounded p-2 w-full"
                        placeholder="your.email@example.com"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Body */}
                <div>
                    <label htmlFor="body" className="block mb-1">
                        Body
                    </label>
                    <textarea
                        id="body"
                        {...register('body', {
                            required: 'Body is required',
                            minLength: {
                                value: 3,
                                message: 'Body must be at least 3 characters',
                            },
                        })}
                        className="border rounded p-2 w-full h-32 resize-y"
                        placeholder="Your message here..."
                    />
                    {errors.body && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.body.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded p-2 w-full hover:bg-blue-700">
                    Send Message
                </button>
            </form>
        </div>
    );
}
