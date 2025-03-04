import { useForm } from 'react-hook-form';

export function RenderContact() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    });

    const onSubmit = (data) => {
        console.log('Contact Form Submission:', data);
        reset();
    };

    return (
        <>
            <h1>Welcome to contact page!</h1>
            <div className="contact-form max-w-md mx-auto mt-6">
                <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', {
                                required: 'Name is required',
                            })}
                            className="border rounded p-2 w-full"
                            placeholder="Your Name"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

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
                                    message:
                                        'Please enter a valid email address',
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

                    <div>
                        <label htmlFor="message" className="block mb-1">
                            Message
                        </label>
                        <textarea
                            id="message"
                            {...register('message', {
                                required: 'Message is required',
                            })}
                            className="border rounded p-2 w-full h-32 resize-y"
                            placeholder="Your message here..."
                        />
                        {errors.message && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.message.message}
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
        </>
    );
}
