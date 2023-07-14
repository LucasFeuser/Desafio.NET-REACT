import React, {useEffect, useState} from "react"
import Home from "../Home";
import api from '../../../services/api';
import './style.css';

export default function Profile(){
    const [profile, setProfile] = useState({
        nome: '',
        primeiroNome: '',
        ultimoNome: '',
        empresa: '',
        local: '',
        email: '',
        telefone: '',
    });

    useEffect(() => {
        // Carregar dados do perfil do servidor quando o componente for montado
        api.get('/api/profissional') // substitua com o endpoint correto
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error('Erro ao recuperar dados do perfil:', error);
            });
    }, []);

    const handleChange = (event) => {
        setProfile({
            ...profile,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit  =  (event) =>  { 
        event.preventDefault();
        // Enviar os dados atualizados do perfil para o servidor
             api.put('/api/profissional', profile)
            .then(response => {
                console.log('Perfil atualizado com sucesso');
            })
            .catch(error => {
                console.error('Erro ao atualizar perfil:', error);
            });
    };

return (
    <Home>
      <div className="container-xl px-4 mt-4">                
                <hr className="mt-0 mb-4"/>
                <div className="row">
                    <div className="col-xl-4">
                        <div className="card mb-4 mb-xl-0">
                            <div className="card-header">Foto Perfil</div>
                            <div className="card-body text-center">
                                <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar5.png" alt=""/>
                                <div className="small font-italic text-muted mb-4">JPG or PNG não maior que isso 5 MB</div>
                                <button className="btn btn-primary" type="button">Uploado nova imagem</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="card mb-4">
                            <div className="card-header">Detalhes do profissional</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="nome">Nome</label>
                                        <input className="form-control" id="nome" name="nome" type="text" placeholder="Enter your username" value={profile.nome} onChange={handleChange}/>
                                    </div>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="primeiroNome">Primeiro Nome</label>
                                            <input className="form-control" id="primeiroNome" name="primeiroNome" type="text" placeholder="Enter your first name" value={profile.primeiroNome} onChange={handleChange}/>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="ultimoNome">Ultimo Nome</label>
                                            <input className="form-control" id="ultimoNome" name="ultimoNome" type="text" placeholder="Enter your last name" value={profile.ultimoNome} onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="empresa">Empresa</label>
                                            <input className="form-control" id="empresa" name="empresa" type="text" placeholder="Enter your organization name" value={profile.empresa} onChange={handleChange}/>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="local">Local</label>
                                            <input className="form-control" id="local" name="local" type="text" placeholder="Enter your location" value={profile.local} onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="email">Email</label>
                                        <input className="form-control" id="email" name="email" type="email" placeholder="Enter your email address" value={profile.email} onChange={handleChange}/>
                                    </div>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="telefone">Telefone</label>
                                            <input className="form-control" id="telefone" name="telefone" type="tel" placeholder="Enter your phone number" value={profile.telefone} onChange={handleChange}/>
                                        </div>                           
                                    </div>
                                    <button className="btn btn-primary m-5" type="submit">Salvar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </Home>
  )
}