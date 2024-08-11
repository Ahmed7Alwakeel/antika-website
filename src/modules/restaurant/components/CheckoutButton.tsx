
import { useNavigate, useParams } from "react-router-dom";
import UserProfileForm, { UserFormData } from "../../user/components/UserProfileForm";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../../../components/ui/dialog";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import LoadingButton from "../../../components/ui/LoadingButton";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {

  const { id } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state: RootState) => state.authData);

  if (!userData.userToken) {
    return (
      <Button onClick={() => { navigate(`/login?restaurant=${id}`) }} className="bg-orange-500 flex-1">
        Log in to check out
      </Button>
    );
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        {isLoading ?
          <LoadingButton />
          :
          <Button disabled={disabled} className="bg-orange-500 flex-1">
            Go to checkout
          </Button>
        }
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={userData?.userData}
          onSave={onCheckout}
          title="Confirm Deliery Details"
          buttonText="Continue to payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;