import React, { Component } from 'react';

import Auxillary from '../../hoc/Auxillary'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'


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
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 0,
            purchaseable: false
        }
    }

    updatePurchaseState (ingredients){       

        const sum = Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey]
        }).reduce((sum,el)=>{
            return sum + el;
        },0)

        this.setState({purchaseable: sum > 0});
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
        this.updatePurchaseState(updatedIngredients);
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
        this.updatePurchaseState(updatedIngredients);
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
                <Modal />
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled= {disabledInfo}
                        purchaseable = {this.state.purchaseable}
                        price={this.state.totalPrice}
                        />
                        
            </Auxillary>

        );
    }
}

export default BurgerBuilder;