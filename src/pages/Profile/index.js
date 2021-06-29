import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/hero.svg';
import api from '../../services/api';

export default function Profile() {
    const [incidents, setIncidents] = useState([])
    const ong_id = localStorage.getItem('ongId');
    const ong_name = localStorage.getItem('ongName');
    const history = useHistory();

    useEffect(() => {
        api.get('profille', {
            headers: {
                Authorization: ong_id,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ong_id]);
    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization: ong_id,
                }
            });
            setIncidents(incidents.filter(incidents => incidents.id !== id));
        }catch(err){
            alert('Erro ao deletar caso, tente novamente.')
        }
    }
    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vindo, {ong_name}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout}type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incidents => (
                    <li key={incidents.id}>
                    <strong>CASO:</strong>
                    <p>{incidents.title}</p>
                    <br></br>
                    <strong>DESCRIÇÃO:</strong>
                    <p>{incidents.description}</p>
                    <br></br>
                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL'}).format(incidents.value)}</p>

                    <button onClick={() => handleDeleteIncident(incidents.id)}type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>

                    </button>
                </li>

                ))}
            </ul>
        </div>
    );
}