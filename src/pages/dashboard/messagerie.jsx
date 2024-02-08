import {
    Card,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
  import {useEffect, useState} from "react";
  import { useNavigate, Link } from "react-router-dom";
  import { jwtDecode } from "jwt-decode";
  
  export function Messagerie() {
  
    const navigate = useNavigate();

    const [dataUsers, setDataUsers] = useState([]);

    const getUsers = async () => {

        const apiUsers = "https://api-finalclouds5-production.up.railway.app/utilisateurs/users";
        try {
          const reponseUsers = await fetch(apiUsers, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
          });
          if (!reponseUsers.ok) {
            throw new Error('Erreur lors de la demande.');
          }
          const data = await reponseUsers.json();
          setDataUsers(data.result);
          console.log("dataUsers après la mise à jour d'état :", data);
        } catch (error) {
          console.error("une erreur s'est produite: " + error.message);
        }
    
      };
  
    useEffect(() => {
      // Fonction pour vérifier la présence du token dans le localStorage
      const checkToken = () => {
        const token = localStorage.getItem('token');
  
        if (!token) {
          navigate('/auth/sign-in');
        }
  
        try {
          const decodedtoken = jwtDecode(token);
          const now = Date.now() / 1000;
          if(now > decodedtoken.exp) localStorage.removeItem('token');
        } catch (error) {
          localStorage.removeItem('token');
          navigate('/auth/sign-in');
        }
  
      };
  
      // Appel de la fonction de vérification lors du chargement de la page
      checkToken();
      getUsers();
      }, []);
  
    return (
      <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
  
        { dataUsers && dataUsers.map(
            ({id, nom, prenom}) => (
        <Link to={`/dashboard/texto?user=${id}&nom=${nom}&prenom=${prenom}`} key={id}> 
        <Card color="gray" variant="gradient" className="w-full max-w-[20rem] p-8">
          <CardBody
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center"
          >
            <Typography
              variant="h1"
              color="white"
              className="mt-6 flex justify-center gap-1 text-4xl font-normal"
            >
              {nom} {prenom}
            </Typography>
          </CardBody>
        </Card>
      </Link>
            ))}
      
      </div>
      
    );
  }
  
  export default Messagerie;
  