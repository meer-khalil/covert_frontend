import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../util/api';
// import { useDispatch, useSelector } from 'react-redux';
// import { resetPassword, clearErrors } from '../../actions/userAction';
// import { useSnackbar } from 'notistack';
// import BackdropLoader from '../Layouts/BackdropLoader';
// import MetaData from '../Layouts/MetaData';
// import FormSidebar from './FormSidebar';

const ResetPassword = () => {

    //   const dispatch = useDispatch();
    const navigate = useNavigate();
    //   const { enqueueSnackbar } = useSnackbar();
    const { token } = useParams();

    //   const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            // enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
            toast("Password length must be atleast 8 characters")
            return;
        }
        if (newPassword !== confirmPassword) {
            //   enqueueSnackbar("Password Doesn't Match", { variant: "error" });
            toast("Password Doesn't Match")
            return;
        }

        const formData = new FormData();
        formData.set("password", newPassword);
        formData.set("confirmPassword", confirmPassword);
        // dispatch(resetPassword(params.token, formData));

        try {
            const { data } = await api.put(`/user/password/reset/${token}`, formData);
            toast('Password Reseted')
            setTimeout(() => {
                navigate("/login")
            }, 2000);
        } catch (error) {
            console.log('Error: ', error);
            toast("Password Didn't reseted")
            // setTimeout(() => {
            //     navigate("/login")
            // }, 2000);
        }
    }

    // useEffect(() => {
    //     if (error) {
    //         enqueueSnackbar(error, { variant: "error" });
    //         dispatch(clearErrors());
    //     }
    //     if (success) {
    //         enqueueSnackbar("Password Updated Successfully", { variant: "success" });
    //         navigate("/login")
    //     }
    // }, [dispatch, error, success, navigate, enqueueSnackbar]);

    return (
        <>
            {/* <MetaData title="Password Reset | Flipkart" /> */}

            {/* {loading && <BackdropLoader />} */}
            <main class="w-full mt-12 sm:pt-20 sm:mt-0">

                {/* <!-- row --> */}
                <div class="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">

                    {/* <FormSidebar
                        title="Reset Password"
                        tag="Get access to your Orders, Wishlist and Recommendations"
                    /> */}

                    {/* <!-- login column --> */}
                    <div class="flex-1 overflow-hidden">
                        <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Reset Password</h2>

                        {/* <!-- edit info container --> */}
                        <div class="text-center py-10 px-4 sm:px-14">

                            {/* <!-- input container --> */}
                            <form onSubmit={handleSubmit}>

                                <div class="flex flex-col w-full gap-4">

                                    <TextField
                                        fullWidth
                                        label="New Password"
                                        type="password"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="Confirm New Password"
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />

                                    {/* <!-- button container --> */}
                                    <div class="flex flex-col gap-2.5 mt-2 mb-32">
                                        {/* <p class="text-xs text-primary-grey text-left">By continuing, you agree to Flipkart's <a href="https://www.flipkart.com/pages/terms" class="text-primary-blue"> Terms of Use</a> and <a href="https://www.flipkart.com/pages/privacypolicy" class="text-primary-blue"> Privacy Policy.</a></p> */}
                                        <button type="submit" class="py-3 w-full bg-primary text-white shadow hover:shadow-lg rounded-sm font-medium">Submit</button>
                                    </div>
                                    {/* <!-- button container --> */}

                                </div>
                            </form>
                            {/* <!-- input container --> */}

                            <p class="font-medium text-sm text-primary-blue">New to Covertnest? <Link to="/signup" className='text-primary'>Create an Account</Link></p>
                        </div>
                        {/* <!-- edit info container --> */}

                    </div>
                    {/* <!-- login column --> */}
                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default ResetPassword;
