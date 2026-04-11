const Auth = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <div className="bg-primary/10 absolute bottom-0 -left-90 -z-10 size-105 rounded-full md:-left-85 lg:-left-80" />
            <div className="bg-primary/10 absolute top-0 -right-90 -z-10 size-105 rounded-full md:-right-85 lg:-right-80" />
            {children}
        </section>
    );
};

export default Auth;
