import { useUpdateMyUser } from "../../modules/user/api/API";
import UserProfileForm from "../../modules/user/components/UserProfileForm";

const UserProfile = () => {
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();


  return (
    <UserProfileForm
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
}

export default UserProfile;