import "react-phone-input-2/lib/style.css";
import ProfileMenu from "./_components/ProfileMenu";
import ProfileMobileMenu from "./_components/ProfileMobileMenu";

const Profile = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <section className="relative bg-[#F8F8F8]">
      <div className="container mx-auto flex flex-col gap-3 px-3 py-10 md:flex-row md:px-5 lg:gap-6">
        <aside className="hidden h-fit w-full shrink-0 flex-col overflow-hidden rounded-lg border shadow-sm md:flex md:w-44 lg:w-64">
          <ProfileMenu />
        </aside>

        <ProfileMobileMenu />

        <div className="flex-1">{children}</div>
      </div>
    </section>
  );
};

export default Profile;
