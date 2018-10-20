import React, { Component } from 'react';

import Auxillary from '../../hoc/Auxillary'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7 
}
class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 2,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4
        }
    }


    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCounted;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const netPrice = oldPrice + priceAddition;
        this.setState({totalPrice:netPrice, ingredients:updatedIngredients})
    }

    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updatedCounted = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCounted;
        const priceSubtracted = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const netPrice = oldPrice - priceSubtracted;
        this.setState({totalPrice:netPrice, ingredients:updatedIngredients})
    }


    render() {
        const disabledInfo ={
            ...this.state.ingredients
        };

        for (const key in disabledInfo) {
            disabledInfo[key]=disabledInfo[key] <= 0
        }
        return (
            <Auxillary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled= {disabledInfo}
                        price={this.state.totalPrice}/>
                        
            </Auxillary>

        );
    }
}

export default BurgerBuilder;