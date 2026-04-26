import AuthLeftSide from "../components/auth/AuthLeftSide";
import AuthRightSide from "../components/auth/AuthRightSide";

export default function Login() {
  return <div className='grid lg:grid-cols-2 bg-[#0a0a0a] min-h-screen'>
    <AuthLeftSide />
    <AuthRightSide />
  </div>
}
