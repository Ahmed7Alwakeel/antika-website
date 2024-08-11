import Cookies from 'js-cookie'
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
import { authReq, generalCreate } from "../../../API/api";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData, setUserToken } from '../../../modules/user/store/redux/authData';


const formSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(3, "Password must be at least 8 characters long"),
});

export type UserFormData = z.infer<typeof formSchema>;

const Login = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('restaurant');
    const verified = searchParams.get('verified');
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [verify, setVerify] = useState<null | string>(null)
    const dispatch = useDispatch()

    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSave = (values: TUser) => {
        if (!loading) {
            setLoading(true)
            setVerify(null)
            authReq({ route: "/auth/login", values }).then((res) => {
                setLoading(false)
                if (res?.data?.data.user.role == "user") {
                    Cookies.set('token', res?.data?.data.token);
                    Cookies.set('user_data', JSON.stringify(res?.data?.data?.user));
                    dispatch(setUserToken(res?.data?.data.token))
                    dispatch(setUserData(res?.data?.data.user))
                    navigate(id ? `/restaurant/${id}` : '/');
                } else {
                    toast.error("invalid credentials")
                }
            }).catch((error) => {
                toast.error(error.response.data.message || "invalid credentials")
                if (error.response.data.message == "Please verify your email") setVerify(values.email as string)
                setLoading(false)
            })
        }
    }

    const sendVerifyEmail = () => {
        setLoading(true)
        generalCreate({
            route: "/auth/send/verify_email",
            values: { email: verify }
        }).then(() => {
            toast.success("Email sent successfully")
            setLoading(false)
            setVerify(null)
        }).catch(error => {
            toast.error(error.response.data.message || "invalid credentials")
            setLoading(false)
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSave)}
                className="space-y-4 bg-gray-50 rounded-lg p-10"
            >
                <div className="text-2xl">Login</div>
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

                {verify && <p className='text-center cursor-pointer text-sky-600' onClick={sendVerifyEmail}>Send verification email</p>}
                {verified=="true" && <p className='text-center  text-green-600'>Email verified successfully</p>}
                {verified=="false" && <p className='text-center  text-red-600'>Failed at verification process</p>}
            </form>
        </Form>
    );
}

export default Login;