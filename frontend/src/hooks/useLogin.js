import { useEffect, useState } from "react";
import axios from "axios";

const useLogin = () => {
    const [name,setname] = useState(null);
    const [error,seterror] = useState(false);

    useEffect(() => {
        async function fetchauth() {
          try {
            const res = await axios.get("http://localhost:8800/u/c", { withCredentials: true });
            setname(res.data);
          } catch (err) {
            seterror(err.response.data);
            console.log("User not logged in:", err.response.data);
          }
        };
        fetchauth();
      }, []);

      return {name,error};
}
  
  export default useLogin;