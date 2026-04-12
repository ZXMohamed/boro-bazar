const Profile = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <section className="container mx-auto flex min-h-screen flex-col gap-6 px-3 md:flex-row md:px-5 py-10">
            <aside className="flex w-full shrink-0 flex-col overflow-hidden rounded-lg border shadow-sm md:w-64">
                {/*profile menu */}
            </aside>
            <aside className="flex-1 rounded-lg border shadow-sm">
                {children} { /*profile pages */}
            </aside>
        </section>
    );
};

export default Profile;