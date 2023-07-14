import React from "react";
import './Login/style.css'
import imgNextPlus from '../assets/nextplus-logo.png';
import imgTopMed from '../assets/topmed_logo.png';


export default function DefaultBody({ children: { children1, children2 } })
{
    return(
        <section className="vh-100">
                <div className="container" style={{display: 'flex', justifyContent: 'center', padding: '8em'}}>
                    <div className="row d-flex justify-content-center h-100" style={{width: '50vw'}}>
                        <div className="col col-xl-10">
                            <div className="card" style={{borderRadius: '1rem'}}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-7 d-none d-md-block" style={{background: '#FFFBFB', borderRadius: '15px'}}>
                                        <div className="card-body p-4 p-lg-5 text-black">            
                                            <form>                             
                                                { children1 }
                                            </form>            
                                        </div>
                                        <div style={{padding: '12px', display: 'flex', justifyContent: 'space-between'}}>
                                            <div style={{justifyContent: 'end'}}>
                                                <img src={imgTopMed} alt="TopMed Logo" /> 
                                            </div>
                                            <div>
                                                <img src={imgNextPlus} alt="NextPlus Logo" />
                                            </div>
                                        </div>  
                                    </div>
                                    <div className="col-md-6 col-lg-5 d-flex" style={{background: 'rgba(53, 140, 132, 0.98)', borderRadius: '0px 15px 15px 0px'}}>
                                        <div className="card-body text-black" style={{padding: '2em'}}>  
                                            <form>
                                                {children2}
                                            </form>
                                        </div>
                                    </div>
                                </div>                                                                      
                            </div>                      
                        </div>                     
                    </div>
                </div>
        </section>
);
}