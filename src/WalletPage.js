import React from 'react';

import NavBar from './NavBar';

class WalletPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <NavBar mode='guest' userDatas='' />

            </div>
        );
    }
}

export default WalletPage;