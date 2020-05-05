import React from 'react'
import {Link} from 'react-router-dom';

function OptCard ({option}) {

    return (
        <>
        <div className = "opt-card">
            <div className = "">
                <div className ="">
                    <div className = "">
                        <Link className = "link-button" to={'/option/' + encodeURIComponent(option.strCategory) }>
                            <button className="btn-category" type="button">
                                {option.strCategory}
                            </button>
                        </Link > 
                    </div>                    
                </div>
            </div>
        </div>
        </>
    );
};

export default OptCard;