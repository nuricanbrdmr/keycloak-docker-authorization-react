import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { Spin } from "antd";
import useLogout from "../hooks/useLogout";

const KaliciGiris = () => {
  const [yukleniyor, setYukleniyor] = useState(false);
  const yenile = useRefreshToken();
  const { auth, persist } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  console.log('auth?.accessToken ', auth?.accessToken )
  console.log('persist ', persist )
 useEffect(()=>{
    setYukleniyor(true);
    const tokenYenilemeDogrula = async () => {
        try {
          await yenile();
        } catch (err) {
          navigate("/login");
          console.error(err);
        }
      };
      if(persist && !auth.accessToken){
        tokenYenilemeDogrula()
      }else if(!persist && !auth.accessToken){
        logout()
        navigate("/login");
      }else{
        console.log("Token var")
      }
      /* !persist && !auth?.accessToken ? (logout): tokenYenilemeDogrula() 
      !auth?.accessToken ?  tokenYenilemeDogrula() : console.log("Token var"); */
      setYukleniyor(false);
 }, [auth])

  return <>{!persist ? <Outlet /> : yukleniyor ? <Spin /> : <Outlet />}</>;
};

export default KaliciGiris;
