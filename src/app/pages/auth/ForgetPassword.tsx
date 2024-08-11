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
import { useNavigate } from "react-router-dom";


const formSchema = z.object({
    email: z.string().email()
});

export type UserFormData = z.infer<typeof formSchema>;

const ForgetPassword = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSave = (values: TUser) => {
        setLoading(true)
        authReq({ route: "/auth/forget-password", values }).then(() => {
            setLoading(false)
            toast.success("Check your email please")
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
                <div className="text-2xl">Forget Password</div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="bg-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-1">
                    </div>
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

export default ForgetPassword;