

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('order-status');
  const cancelled = searchParams.get('cancelled');
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    if (id) navigate(`/order-status/${id}`)
    if (cancelled) toast.error("Order cancelled")
  }, [id, cancelled])

  useEffect(() => {
    setTimeout(()=>{
      setLoading(false)
    },2000)
  }, [])

  if (loading) return <div className="spinner">
  <div className="loader"></div>
</div>

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-black">
          Tuck into a takeaway today
        </h1>
        <span className="text-xl text-sky-600 cursor-pointer" onClick={() => navigate("/branches")}>Discover our branches</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={"/images/landing.png"} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the MernEats App for faster ordering and personalised
            recommendations
          </span>
          <img src={"/images/appDownload.png"} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;