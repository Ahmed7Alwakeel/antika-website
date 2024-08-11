import { useUpdateMyUser } from "../../modules/user/api/API";
import UserProfileForm from "../../modules/user/components/UserProfileForm";

const UserProfile = () => {
  const { updateUser } = useUpdateMyUser();


  return (
    <UserProfileForm
      onSave={updateUser}
    />
  );
}

export default UserProfile;