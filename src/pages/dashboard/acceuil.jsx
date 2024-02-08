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
    HeartIcon,
    PhoneIcon,
  } from "@heroicons/react/24/solid";
  import { Link, useNavigate } from "react-router-dom";
  import { useEffect, useState } from 'react';
  import { jwtDecode } from "jwt-decode";
  import "./accueil.css"
  

  export function Acceuil() {
  
    const navigate = useNavigate();
    const [dataAnnonces, setDataAnnonces] = useState([]);
  
    const getAnnonces = async () => {

      const apiAnnonce = "https://api-finalclouds5-production.up.railway.app/annonces/offers";
      try {
        const reponsePays = await fetch(apiAnnonce, {
          method: 'GET',
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
  
    const getCategories = async () => {
      const apiAnnonce = "https://api-finalclouds5-production.up.railway.app/categories";
      try {
        const reponsePays = await fetch(apiAnnonce, {
          method: 'GET',
        });
        if (!reponsePays.ok) {
          throw new Error('Erreur lors de la demande.');
        }
        const data = await reponsePays.json();
        setCategories(data.result);
  
      } catch (error) {
        console.error("une erreur c'est produite: " + error.message);
      }
  
    }
  
    const getMarques = async () => {
      const apiAnnonce = "https://api-finalclouds5-production.up.railway.app/marques";
      try {
        const reponsePays = await fetch(apiAnnonce, {
          method: 'GET',
        });
        if (!reponsePays.ok) {
          throw new Error('Erreur lors de la demande.');
        }
        const data = await reponsePays.json();
        setMarques(data.result);
  
      } catch (error) {
        console.error("une erreur c'est produite: " + error.message);
      }
  
    }
  
    const getModeles = async () => {
      const apiAnnonce = "https://api-finalclouds5-production.up.railway.app/modeles";
      try {
        const reponsePays = await fetch(apiAnnonce, {
          method: 'GET',
        });
        if (!reponsePays.ok) {
          throw new Error('Erreur lors de la demande.');
        }
        const data = await reponsePays.json();
        setModeles(data.result);
  
      } catch (error) {
        console.error("une erreur c'est produite: " + error.message);
      }
  
    }
  
  
    const getEnergies = async () => {
      const apiAnnonce = "https://api-finalclouds5-production.up.railway.app/energies";
      try {
        const reponsePays = await fetch(apiAnnonce, {
          method: 'GET',
        });
        if (!reponsePays.ok) {
          throw new Error('Erreur lors de la demande.');
        }
        const data = await reponsePays.json();
        setEnergies(data.result);
  
      } catch (error) {
        console.error("une erreur c'est produite: " + error.message);
      }
  
    }
  
    const getBoitevitesses = async () => {
      const apiAnnonce = "https://api-finalclouds5-production.up.railway.app/boitevitesses";
      try {
        const reponsePays = await fetch(apiAnnonce, {
          method: 'GET',
        });
        if (!reponsePays.ok) {
          throw new Error('Erreur lors de la demande.');
        }
        const data = await reponsePays.json();
        setBoitevitesses(data.result);
  
      } catch (error) {
        console.error("une erreur c'est produite: " + error.message);
      }
  
    }
  
    const getEtatvoitures = async () => {
      const apiAnnonce = "https://api-finalclouds5-production.up.railway.app/etatvoitures";
      try {
        const reponsePays = await fetch(apiAnnonce, {
          method: 'GET',
        });
        if (!reponsePays.ok) {
          throw new Error('Erreur lors de la demande.');
        }
        const data = await reponsePays.json();
        setEtatvoitures(data.result);
      } catch (error) {
        console.error("une erreur c'est produite: " + error.message);
      }
  
    }
  
  
    useEffect(() => {
      console.log("UseEffect effectué");
      getAnnonces();
      getCategories();
      getMarques();
      getModeles();
      getEnergies();
      getBoitevitesses();
      getEtatvoitures();
    }, []);

    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => {
      setShowModal(false);
    }

    const handleSansFiltre = async () =>{
      getAnnonces();
      setIsFiltre(false);
      handleClose();

    }

    const [isFiltre, setIsFiltre] = useState(false);
    const [categories, setCategories] = useState([]);
    const [marques, setMarques] = useState([]);
    const [modeles, setModeles] = useState([]);
    const [energies, setEnergies] = useState([]);
    const [boitevitesses, setBoitevitesses] = useState([]);
    const [etatvoitures, setEtatvoitures] = useState([]);
  
    const [formData, setFormData] = useState({
      voiture: {
        id_categorie: 0,
        id_marque: 0,
        id_modele: 0,
        id_energie: 0,
        id_boitevitesse: 0,
        id_etatvoiture: 0,
        matricule: ""
      },
      mot_cle: "",
      dateDeb: null,
      dateFin: null,
      prixDeb: 0,
      prixFin: 0,
      kilometrageDeb: 0,
      kilometrageFin: 0
    });

    const handleInputChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
  
      if (name in formData.voiture) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          voiture: {
            ...prevFormData.voiture,
            [name]: value,
          },
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    }

    const handleSubmit = async (e) =>{
      console.log(formData);
      e.preventDefault();
        try {
          const response = await fetch(
            "https://api-finalclouds5-production.up.railway.app/annonces/search",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },        
              body: JSON.stringify(formData),
            }
          );
          if (response.ok) {
            const result = await response.json();
            if (result && result.message) {
              setDataAnnonces(result.result); 
              console.log(result.message);
            }
            setFormData({
              voiture: {
                id_categorie: 0,
                id_marque: 0,
                id_modele: 0,
                id_energie: 0,
                id_boitevitesse: 0,
                id_etatvoiture: 0,
                matricule: ""
              },
              mot_cle: "",
              dateDeb: null,
              dateFin: null,
              prixDeb: 0,
              prixFin: 0,
              kilometrageDeb: 0,
              kilometrageFin: 0
            });
            setIsFiltre(true);
          } else {
            console.log("Erreur lors de la requête vers l'API");
          }
        } catch (error) {
          
          console.error(error.message);
          
        }
      
      handleClose();
    }
      
    
    const submitAddFavoris = async (e, id) => {
        e.preventDefault();
    
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            console.log(token);
    
            if (!token) {
                navigate('/auth/sign-in');
                return false; // Indiquer que la navigation a été déclenchée
            }
    
            try {
                const decodedtoken = jwtDecode(token);
                const now = Date.now() / 1000;
                if (now > decodedtoken.exp) {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                localStorage.removeItem('token');
                navigate('/auth/sign-in');
                return false;
            }
    
            return true; // Indiquer que la navigation n'a pas été déclenchée
        };
    
        const shouldInsertToFavoris = await checkToken();
    
        if (shouldInsertToFavoris) {
            const insertToFavoris = async () => {
                const apiAddToFavoris = "https://api-finalclouds5-production.up.railway.app/favoris";
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ id_annonce: id })
                };
    
                try {
                    const response = await fetch(apiAddToFavoris, requestOptions);
                    const data = await response.json();
    
                    if (data.code === 0) {
                        alert("Annonce ajouter dans vos Favoris");
                    } else {
                        alert( data.message);
                    }
                } catch (error) {
                    console.error('Error adding announcement to favorites : '+ error.message);
                    alert('Error adding announcement to favorites : '+ error.message);
                }
            };
    
            insertToFavoris();
        }
    };
  

    return (
      <>
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
          <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
        </div>
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
          <CardBody className="p-4">
            <div className="px-4 pb-4">
              <Typography variant="h3" color="blue-gray" className="mb-2">
                Liste des annonces en cours
              </Typography>

              <Button onClick={handleShow}>
                Filtrer
              </Button>
              <span>
              {isFiltre === true && (
                <h3>Filtre actif</h3>
              )}
              </span>

              <br/>
              <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              { dataAnnonces && dataAnnonces.map(
                  ({id, datePub, prix, utilisateur, voiture, description, photos}) => (
                    <Card key={id} color="transparent" shadow={false}>
                      <CardHeader
                        floated={false}
                        color="gray"
                        className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                      >
                        {photos && photos.length > 0 && (
                        <img
                          src={photos[0].lien}
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
                          {voiture.marque.nom + " " + voiture.modele.nom}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          Le {datePub} par {utilisateur.nom + " " + utilisateur.prenom}
                        </Typography>
                      </CardBody>
                      <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                        <Link to={`/dashboard/texto?user=${utilisateur.id}&nom=${utilisateur.nom}&prenom=${utilisateur.prenom}`}>
                        <Tooltip content="Contactez">
                          <Button className="bg-transparent" size="sm">
                          <PhoneIcon className="h-7 w-7 text-blue-gray-500" />
                          </Button>
                        </Tooltip>
                        </Link>
                        <Tooltip content="ajouter aux favoris">
                          <Button className="bg-transparent" size="sm" onClick={(e) => submitAddFavoris(e, id)}>
                            <HeartIcon className="h-7 w-7 text-red-500" />
                          </Button>
                        </Tooltip>
                          <Popover
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                      >
                        <PopoverHandler>
                          
                            <IconButton variant="text">
                            <Tooltip content="Voir détails">
                              <Button className="bg-transparent" size="sm">
                                <InformationCircleIcon className="h-7 w-7 text-blue-gray-500" />
                              </Button>
                              </Tooltip>
                            </IconButton>
                          
                        </PopoverHandler>
                        <PopoverContent className="z-[999] grid w-[28rem] grid-cols-1 overflow-hidden p-0 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-filter backdrop-blur-md">
                        <Card className="mt-6 w-full" style={{margin:'auto'}}>
                          
                            
                              <div className="z-[999] grid w-[28rem] grid-cols-2 overflow-hidden p-0">
                                <div className="ml-2">
                                <Typography className="mt-2">Marque: {voiture.marque.nom} </Typography>
                                  <Typography className="mt-2">Modèle: {voiture.modele.nom} </Typography>
                                  <Typography className="mt-2">Catégorie: {voiture.categorie.nom} </Typography>
                                  <Typography className="mt-2">Année de mise en circulation: {voiture.modele.anneeSortie} </Typography>
                                  <Typography className="mt-2">Energie: {voiture.energie.nom} </Typography>
                                </div>
                                <div className="ml-2">
                                <Typography className="mt-2">Boite de vitesse: {voiture.boite.nom} </Typography>
                                  <Typography className="mt-2">Etat: {voiture.etatVoiture.nom} </Typography>
                                  <Typography className="mt-2">Kilometrage: {voiture.kilometrage} </Typography>
                                  <Typography className="mt-2">matricule: {voiture.matricule} </Typography>
                                  <Typography className="mt-2">description: {description} </Typography>
                                </div>
                              </div>
                              
                              <Typography variant="h3" color="green" className="mt-2" style={{margin: 'auto'}}>{prix} Ar</Typography>
  
                                <Carousel className="rounded-xl w-1/2 h-64" style={{margin: 'auto'}}>
                                { photos && photos.map(
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

              <div>
              {showModal && (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={handleClose}>
                      &times;
                    </span>

                    <form onSubmit={handleSubmit}>

                      <div>
                        <label htmlFor="motcle">Mot clé</label>
                        <input type="text" id="motcle" name="mot_cle" value={formData.mot_cle} onInput={handleInputChange} />
                      </div>
                      <div style={{ clear: 'both' }}></div>
                      <div>
                        <label htmlFor="matricule">Matricule</label>
                        <input type="text" id="matricule" name="matricule" value={formData.voiture.matricule} onInput={handleInputChange} />
                      </div>
                      <div style={{ clear: 'both' }}></div>
                      <div>
                        <h3 style={{ float: 'left' }}>Date</h3>

                        <span >
                          <input type="date" id="dateFin" name="dateFin" value={formData.dateFin} onInput={handleInputChange} />
                          <input type="date" id="dateDeb" name="dateDeb" value={formData.dateDeb} onInput={handleInputChange} />
                        </span>
                      </div>
                      <div style={{ clear: 'both' }}></div>
                      <div>
                        <h3 style={{ float: 'left' }}>Prix</h3>

                        <span >
                        <input type="number" id="prixFin" name="prixFin" value={formData.prixFin} onInput={handleInputChange} placeholder="prix max" required/>
                          <input type="number" id="prixDeb" name="prixDeb" value={formData.prixDeb} onInput={handleInputChange} placeholder="prix min" />
                          
                        </span>

                      </div>
                      <div style={{ clear: 'both' }}></div>
                      <div>
                        <h3 style={{ float: 'left' }}>Km</h3>

                        <span >
                          <input type="number" id="kilometrageFin" name="kilometrageFin" value={formData.kilometrageFin} onInput={handleInputChange} placeholder="km max" />
                          <input type="number" id="kilometrageDeb" name="kilometrageDeb" value={formData.kilometrageDeb} onInput={handleInputChange} placeholder="km min" />

                        </span>
                      </div>
                      <div style={{ clear: 'both' }}></div>
                      <div>
                        <label htmlFor="categorie">Categorie</label>
                        <select name="id_categorie" id="categorie" value={formData.voiture.id_categorie} onInput={handleInputChange} required>
                          <option value="0">Non defini(e)</option>
                          {categories && categories.map(
                            ({ id, nom }) => (
                              <option key={id} value={id}>{nom}</option>
                            ))}

                        </select>
                      </div>
                      <div style={{ clear: 'both' }}></div>
                      <div>
                        <label htmlFor="marque">Marque</label>
                        <select name="id_marque" id="marque" value={formData.voiture.id_marque} onInput={handleInputChange} required>
                          <option value="0">Non defini(e)</option>
                          {marques && marques.map(
                            ({ id, nom }) => (
                              <option key={id} value={id}>{nom}</option>
                            ))}
                        </select>
                      </div>
                      <div style={{ clear: 'both' }}></div>

                      <div>
                        <label htmlFor="modele">Modele</label>
                        <select name="id_modele" id="modele" value={formData.voiture.id_modele} onInput={handleInputChange} required>
                          <option value="0">Non defini(e)</option>
                          {modeles && modeles.map(
                            ({ id, nom }) => (
                              <option key={id} value={id}>{nom}</option>
                            ))}
                        </select>
                      </div>
                      <div style={{ clear: 'both' }}></div>

                      <div>
                        <label htmlFor="energie">Energie</label>
                        <select name="id_energie" id="energie" value={formData.voiture.id_energie} onInput={handleInputChange} required>
                          <option value="0">Non defini(e)</option>

                          {energies && energies.map(
                            ({ id, nom }) => (
                              <option key={id} value={id}>{nom}</option>
                            ))}
                        </select>
                      </div>
                      <div style={{ clear: 'both' }}></div>

                      <div>
                        <label htmlFor="boitevitesse">Boite de vitesse</label>
                        <select name="id_boitevitesse" id="boitevitesse" value={formData.voiture.id_boitevitesse} onInput={handleInputChange} required>
                          <option value="0">Non defini(e)</option>

                          {boitevitesses && boitevitesses.map(
                            ({ id, nom }) => (
                              <option key={id} value={id}>{nom}</option>
                            ))}
                        </select>
                      </div>
                      <div style={{ clear: 'both' }}></div>
                      <div>
                        <label htmlFor="etatvoiture">Etat de voiture</label>
                        <select name="id_etatvoiture" id="etatvoiture" value={formData.voiture.id_etatvoiture} onInput={handleInputChange}  required>
                          <option value="0">Non defini(e)</option>

                          {etatvoitures && etatvoitures.map(
                            ({ id, nom }) => (
                              <option key={id} value={id}>{nom}</option>
                            ))}
                        </select>
                      </div>
                      <br />
                      <Button onClick={handleSansFiltre}>Sans filtre</Button>
                      <Button style={{ float: 'right' }} type="submit">Filtrer</Button>

                    </form>

                  </div>
                </div>
              )}
            </div>

            </div>
          </CardBody>
        </Card>
      </>
    );
  }
  
  
  export default Acceuil;
  
  