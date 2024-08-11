import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TUser } from "../../../modules/user/types/types";
import { Input } from "../../../components/ui/input";
import LoadingButton from "../../../components/ui/LoadingButton";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import { authReq } from "../../../API/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";


const formSchema = z.object({
    password: z.string()
        .min(3, "Password must be at least 8 characters long"),
    passwordConfirm: z.string()
        .min(3, "Password confirmation must be at least 8 characters long")
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"], // Path to the error message
});

export type UserFormData = z.infer<typeof formSchema>;

const ResetPassword = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { token } = useParams()

    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            passwordConfirm: "",
        },
    });

    const onSave = (values: TUser) => {
        setLoading(true)
        authReq({ route: `/auth/reset-password/${token}`, values }).then(() => {
            setLoading(false)
            toast.success("Password reset successfully")
            navigate("/login")
        }).catch((err) => {
            toast.error(err?.response.data.message || "Something went wrong, please try again.")
            setLoading(false)
        })

    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSave)}
                className="space-y-4 bg-gray-50 rounded-lg md:p-10"
            >
                <div className="text-2xl">Reset Password</div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type='password' className="bg-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="passwordConfirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" className="bg-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div onClick={() => navigate("/forget-password")}>
                    <span className='text-sky-800 cursor-pointer text-sm'>Forget password</span>
                </div>

                {loading ? (
                    <LoadingButton />
                ) : (
                    <Button type="submit" className="bg-orange-500">
                        Submit
                    </Button>
                )}
            </form>
        </Form>
    );
}

export default ResetPassword;