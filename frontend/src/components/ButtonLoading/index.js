import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';

import './styles.css';

export default function ButtonLoading(props) {
    return (
        <div className="button-loading">
            <BounceLoader
                size={32}
                color={"#FFF"}
                loading={props.loading}
            />
        </div>
    );
}