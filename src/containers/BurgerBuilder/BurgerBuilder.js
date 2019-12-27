import React, {Component } from 'react';
import Aux from '../../hoc/Auxil';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';



const INGREDIENT_PRICES = {
    salad:0.5,
    bacon:0.7,
    cheese:0.4,
    meat:1.3
};


class BurgerBuilder extends Component {
state ={
    ingredients: {
        salad:1,
        bacon:1,
        cheese:2,
        meat:2
        },

        totalPrice: 4,
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
    };

    updatedIngredients[type] =  updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({totalPrice:newPrice,ingredients:updatedIngredients });
    };

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];

        if (oldCount<= 0) {
            return
        }; //if we have no ingredients

        const updatedCount = oldCount - 1;

        const updatedIngredients = {
            ...this.state.ingredients
    };

    updatedIngredients[type] =  updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceDeduction;

    this.setState({totalPrice:newPrice,ingredients:updatedIngredients });

    };




    render (){
            const disabledInfo = {
                ...this.state.ingredients
            }; //salad:true, meat:false...

            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0//this returns a Bool
            };
        return (

            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                />
            </Aux>
        );
    }

};

export default BurgerBuilder;