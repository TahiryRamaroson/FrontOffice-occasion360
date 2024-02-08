import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Typography,
    Textarea, 
    Button,
    IconButton,
  } from "@material-tailwind/react";
  import {
    InformationCircleIcon,
  } from "@heroicons/react/24/solid";
  import { useNavigate, useLocation } from "react-router-dom";
  import { useEffect, useState } from 'react';
  import { jwtDecode } from "jwt-decode";
  
  export function Texto() {
  
    const navigate = useNavigate();
    const [dataMessages, setDataMessages] = useState([]);
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const userId = params.get("user");
    const nom = params.get("nom");
    const prenom = params.get("prenom");

    const [formAjout, setFormAjout] = useState({
        id_receiver: ''+ userId,
        message: '',
    });
    
  
    useEffect(() => {
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

        const getMyMessage = async () => {
    
            const apiAnnonce = "https://api-finalclouds5-production.up.railway.app/messageries/mp/" + userId; 
            try {
                const reponsePays = await fetch(apiAnnonce, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    },
                });
                if (!reponsePays.ok) {
                    throw new Error('Erreur lors de la demande.');
                }
                const data = await reponsePays.json();
                setDataMessages(data.result);
                console.log("dataMessage après la mise à jour d'état :", data);
            } catch (error) {
                console.error("une erreur c'est produite: " + error.message);
            }
    
        };
  
        checkToken();
        getMyMessage();

      }, []);

      const getMyMessage = async () => {
    
        const apiAnnonce = "https://api-finalclouds5-production.up.railway.app/messageries/mp/" + userId; 
        try {
            const reponsePays = await fetch(apiAnnonce, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
            if (!reponsePays.ok) {
                throw new Error('Erreur lors de la demande.');
            }
            const data = await reponsePays.json();
            setDataMessages(data.result);
            console.log("dataMessage après la mise à jour d'état :", data);
        } catch (error) {
            console.error("une erreur c'est produite: " + error.message);
        }

    };

      const changeAjout = (e) => {
        const { name, value } = e.target;
        setFormAjout({
          ...formAjout,
          [name]: value,
        });
        console.log(formAjout);
    };

    const submitAjout = async (e) => {
        e.preventDefault();
    
        // Votre logique pour envoyer les données vers l'API
        const apiajout = "https://api-finalclouds5-production.up.railway.app/messageries";
  
        if (formAjout.message == '') {
          alert("Vous ne pouvez pas envoyé un message vide");
          throw new Error('Champ vide.');
        }
    
        try {
          const response = await fetch(apiajout , {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(formAjout),
          });
    
          if (!response.ok) {
            throw new Error('Erreur lors de la demande.');
          }
    
          const responseData = await response.json();
          console.log('Réponse de API ajout message :', responseData);
          //dataMarques.push(responseData.result);
          //navigate('/dashboard/acceuil');
          getMyMessage();
          // Si nécessaire, effectuez des actions supplémentaires après la soumission réussie
        } catch (error) {
          console.error('Erreur lors de la soumission du formulaire :', error.message);
        }
    };
    
  
    return (
      <>


        <Card color="transparent" shadow={false} className="h-full">
            <CardHeader
              floated={false}
              color="gray"
              className="mx-0 mt-0 mb-4 h-20 xl:h-20"
            >
                <Typography
                    variant="h5"
                    color="white"
                    className="mt-5 mb-2 text-center "
                >
                {prenom} {nom}
                </Typography>

            </CardHeader>
            <CardBody className="py-0 px-1" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                
            { dataMessages && dataMessages.map(
                  ({id, id_sender, id_receiver, message, time}) => (
                <div key={id}>
                    {id_sender == userId ? (
                <Card color="gray" shadow={false}  style={{width: "50%"}}>
                    <CardHeader
                        floated={false}
                        color="transparent"
                        className="mx-0 mt-0 mb-4"
                    >
                        <Typography
                            variant="small"
                            color="white"
                            className="mt-5 mb-2 ml-5"
                        >
                            {time}
                        </Typography>

                    </CardHeader>
                    <CardBody className="py-0 px-1">
                        <Typography
                            variant="p"
                            color="white"
                            className=" mb-2 ml-5"
                        >
                            {message}
                        </Typography>
                    </CardBody>
            
                </Card>
                
                ) : (

                <Card color="blue" shadow={false}  style={{width: "50%", marginLeft:"auto"}}>
                    <CardHeader
                        floated={false}
                        color="transparent"
                        className="mx-0 mt-0 mb-4"
                    >
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mt-5 mb-2 ml-5"
                        >
                            {time}
                        </Typography>

                    </CardHeader>
                    <CardBody className="py-0 px-1">
                        <Typography
                            variant="p"
                            color="blue-gray"
                            className=" mb-2 ml-5"
                        >
                            {message}
                        </Typography>
                    </CardBody>
            
                </Card>
                )}
                <br/>
                </div>
            ))}
                  
            </CardBody>
            <form  onSubmit={submitAjout} >
            <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
            
                <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
                    <div className="flex">
                        <IconButton variant="text" className="rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="h-5 w-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                              />
                            </svg>
                        </IconButton>
                        <IconButton variant="text" className="rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                            />
                          </svg>
                        </IconButton>
                    </div>
                    
                    <Textarea
                      rows={1}
                      resize={true}
                      placeholder="Your Message"
                      className="min-h-full !border-0 focus:border-transparent"
                      containerProps={{
                        className: "grid h-full",
                      }}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      name="message"
                      value={formAjout.message}
                      onChange={changeAjout}
                    />
                    <div>
                      <IconButton variant="text" className="rounded-full" type="submit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                          />
                        </svg>
                      </IconButton>
                    </div>
                    
                </div>
    
                  
            </CardFooter>
            </form> 
        </Card>
        <br/>
    
      </>
    );
  }
  
  export default Texto;
  
  