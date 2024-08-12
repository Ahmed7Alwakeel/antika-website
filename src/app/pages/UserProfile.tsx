import { useUpdateMyUser } from "../../modules/user/api/API";
import UserProfileForm from "../../modules/user/components/UserProfileForm";

const UserProfile = () => {
  const { updateUser, isLoading } = useUpdateMyUser();


  return (
    <UserProfileForm
      onSave={updateUser}
      isLoading={isLoading}
    />
  );
}

export default UserProfile;