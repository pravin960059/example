import react from 'react';
import { useNavigate } from "react-router-dom";
function Home(){
    const token=localStorage.getItem('user')
    const navigate = useNavigate();
    const logout=(e)=>{
        e.preventDefault();
        localStorage.removeItem('user');
        navigate("/")
    }
    return(<div>
        {token!=null?
        (<div>
            <h1>You are logged in...!!!</h1>
            <button onClick={logout}>Logout</button>
        </div>):(<h1>please login</h1>)}
        </div>
        );
}
export default Home;