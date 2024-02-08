import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Typography,
    Button,
    IconButton,
    Popover,
    PopoverHandler,
    PopoverContent,
    Tooltip,
    Carousel,
  
  } from "@material-tailwind/react";
  import {
    InformationCircleIcon,
  } from "@heroicons/react/24/solid";
  import { useNavigate } from "react-router-dom";
  import { useEffect, useState } from 'react';
  import { jwtDecode } from "jwt-decode";
  
  export function Favoris() {
  
    const navigate = useNavigate();
    const [dataAnnonces, setDataAnnonces] = useState([]);
  
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

        const getMyFavoris = async () => {
    
            const apiAnnonce = "https://api-finalclouds5-production.up.railway.app/favoris/myfavourites"; 
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
                setDataAnnonces(data.result);
                console.log("dataAnnonce après la mise à jour d'état :", data);
            } catch (error) {
                console.error("une erreur c'est produite: " + error.message);
            }
    
        };
  
        checkToken();
        getMyFavoris(); 

      }, []);
  
    
  
    return (
      <>
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
          <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
        </div>
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
          <CardBody className="p-4">
            <div className="px-4 pb-4">
              <Typography variant="h3" color="blue-gray" className="mb-2">
                Liste de mes favoris
              </Typography>
              <br/>
              <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              { dataAnnonces && dataAnnonces.map(
                  ({id, dateAjout, prix, utilisateur, annonce}) => (
                    <Card key={id} color="transparent" shadow={false}>
                      <CardHeader
                        floated={false}
                        color="gray"
                        className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                      >
                        {annonce.photos && annonce.photos.length > 0 && (
                        <img
                          src={annonce.photos[0].lien}
                          alt="No image"
                          className="h-full w-full object-cover"
                        />
                        )}
                      </CardHeader>
                      <CardBody className="py-0 px-1">
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mt-1 mb-2"
                        >
                          {annonce.voiture.marque.nom + " " + annonce.voiture.modele.nom}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          Le {dateAjout} par {annonce.utilisateur.nom + " " + annonce.utilisateur.prenom}
                        </Typography>
                      </CardBody>
                      <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                          <Popover
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                      >
                        <PopoverHandler>
                          
                            <IconButton variant="text">
                            <Tooltip content="Voir détails">
                              <Button className="bg-transparent">
                                <InformationCircleIcon className="h-10 w-10 text-blue-gray-500" />
                              </Button>
                              </Tooltip>
                            </IconButton>
                          
                        </PopoverHandler>
                        <PopoverContent className="z-[999] grid w-[28rem] grid-cols-1 overflow-hidden p-0">
                        <Card className="mt-6 w-full" style={{margin:'auto'}}>
                          
                            
                              <div className="z-[999] grid w-[28rem] grid-cols-2 overflow-hidden p-0">
                                <div className="ml-2">
                                <Typography className="mt-2">Marque: {annonce.voiture.marque.nom} </Typography>
                                  <Typography className="mt-2">Modèle: {annonce.voiture.modele.nom} </Typography>
                                  <Typography className="mt-2">Catégorie: {annonce.voiture.categorie.nom} </Typography>
                                  <Typography className="mt-2">Année de mise en circulation: {annonce.voiture.modele.anneeSortie} </Typography>
                                  <Typography className="mt-2">Energie: {annonce.voiture.energie.nom} </Typography>
                                </div>
                                <div className="ml-2">
                                <Typography className="mt-2">Boite de vitesse: {annonce.voiture.boite.nom} </Typography>
                                  <Typography className="mt-2">Etat: {annonce.voiture.etatVoiture.nom} </Typography>
                                  <Typography className="mt-2">Kilometrage: {annonce.voiture.kilometrage} </Typography>
                                  <Typography className="mt-2">matricule: {annonce.voiture.matricule} </Typography>
                                  <Typography className="mt-2">description: {annonce.description} </Typography>
                                </div>
                              </div>
                              
                              <Typography variant="h3" color="green" className="mt-2" style={{margin: 'auto'}}>{annonce.prix} Ar</Typography>
  
                                <Carousel className="rounded-xl w-1/2 h-64" style={{margin: 'auto'}}>
                                { annonce.photos && annonce.photos.map(
                                    ({id, lien}) => (
                                <img
                                    key={id}
                                    src={lien}
                                    alt="No image"
                                    className="h-full w-full object-cover"
                                />
                                    ))}
                                </Carousel>
                          </Card>
                        </PopoverContent>
                      </Popover>
                          
                            
                          
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </>
    );
  }
  
  export default Favoris;
  
  