import ProfileCard from "../_components/ProfileCard";
import ChangePasswordCard from "./_components/ChangePasswordCard";
import MyProfileCard from "./_components/MyProfileCard";

const MyProfilePage = () => {
  return (
    <ProfileCard
      title="My Profile"
      subTitle="All your account information in one place"
      hasButton
      buttonLabel="Change Password"
      dialogTitle="Change Password"
      dialogDescription="Update your password below."
      dialogContent={<ChangePasswordCard />}
    >
      <MyProfileCard />
    </ProfileCard>
  );
};

export default MyProfilePage;
