import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useEffect } from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../components/ui/form";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import LoadingButton from "../../../components/ui/LoadingButton";

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "name is required"),
    address: z.string().min(1, "address is required"),
    mobile: z.string().min(11, "mobile is required"),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (userProfileData: UserFormData) => void;
    title?: string;
    buttonText?: string;
    isLoading: boolean
};

const UserProfileForm = ({
    onSave,
    title = "User Profile",
    buttonText = "Submit",
    isLoading
}: Props) => {
    const userData = useSelector((state: RootState) => state.authData);
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: userData.userData,
    });

    useEffect(() => {
        form.reset(userData.userData,);
    }, [userData, form]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSave)}
                className="space-y-4 bg-gray-50 rounded-lg md:p-10"
            >
                <div>
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <FormDescription>
                        View and change your profile information here
                    </FormDescription>
                </div>
                <div className="w-96 flex flex-col gap-4">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled className="bg-white" />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mobile</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {isLoading ?
                    <LoadingButton />
                    :
                    <Button type="submit" className="bg-orange-500">
                        {buttonText}
                    </Button>
                }
            </form>
        </Form>
    );
};

export default UserProfileForm;