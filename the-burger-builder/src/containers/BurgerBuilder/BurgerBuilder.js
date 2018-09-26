import React, { Component } from 'react';

import Auxillary from '../../hoc/Auxillary'

import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component {
    render() {
        return (
            <Auxillary>
                <Burger />
                <div>Burger Controls</div>
            </Auxillary>

        );
    }
}

export default BurgerBuilder;