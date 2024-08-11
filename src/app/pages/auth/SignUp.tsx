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
    email: z.string().email(),
    name: z.string().min(1, "name is required"),
    address: z.string().min(1, "address is required"),
    mobile: z.string().min(11, "mobile is required"),
    password: z.string()
        .min(3, "Password must be at least 8 characters long"),
    passwordConfirm: z.string()
        .min(3, "Password confirmation must be at least 8 characters long")
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"], // Path to the error message
});

export type UserFormData = z.infer<typeof formSchema>;

const SignUp = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState("")

    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            address: "",
            mobile: "",
            password: "",
            passwordConfirm: ""
        },
    });

    const onSave = (values: TUser) => {
        setLoading(true)
        authReq({ route: "/auth/signup", values }).then(() => {
            setLoading(false);
            setMsg("Verification email sent successfully, go to login")
        }).catch(error => {
            setLoading(false);
            toast.error(error?.response.data.message || "Something went wrong, please try again.")
        })
    }

    return (
        <Form {...form}>
            {msg ?
                <div className="flex flex-col gap-4 justify-center items-center pt-10">
                    <span>{msg}</span>
                    <Button className="w-20" onClick={()=>{navigate("/login")}}>Login</Button>
                </div>
                :
                <form
                    onSubmit={form.handleSubmit(onSave)}
                    className="space-y-4 bg-gray-50 rounded-lg md:p-10"
                >
                    <div className="text-2xl">Sign Up</div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
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
                        </div>
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
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
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
                        </div> 
                          <div className="flex-1">
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
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" className="bg-white" />
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
                                        <FormLabel>Confirm password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" className="bg-white" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
            }
        </Form>
    );
}

export default SignUp;