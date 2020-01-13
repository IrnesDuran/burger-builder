import React, {Component } from 'react';
import {connect} from  'react-redux';

import Aux from '../../hoc/Auxil/Auxil';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHander';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

//MOved to reducer because of the redux
// const INGREDIENT_PRICES = {
//     salad:0.5,
//     bacon:0.7,
//     cheese:0.4,
//     meat:1.3
// };


class BurgerBuilder extends Component {
state ={
    // removed because we use redux now ingredients: null, 
    //from Firebase database 
        //totalPrice: 4,
        //purchaseable: false,
        purchasing:false,
        loading: false,
        error: false
    };

    componentDidMount () {
        // axios.get('https://burgerbuilder2019.firebaseio.com/ingredients.json').then (response => {
        //     this.setState({ingredients: response.data})
        // }).catch(error => {
        //     this.setState({error:true})
        // });
    };

    updatePurchaseState(ingredients) {
        
        const sum = Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey]
        })
        .reduce((sum, el)=>{return sum + el}, 0);
        return sum > 0; //returns bool
    };

    //REMOVED BECAUSE OF THE REDUX
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;

    //     const updatedIngredients = {
    //         ...this.state.ingredients
    // };

    // updatedIngredients[type] =  updatedCount;
    // const priceAddition = INGREDIENT_PRICES[type];
    // const oldPrice = this.state.totalPrice;
    // const newPrice = oldPrice + priceAddition;

    // this.setState({totalPrice:newPrice,ingredients:updatedIngredients });
    // this.updatePurchaseState(updatedIngredients);
    // };






        //REMOVED BECAUSE OF THE REDUX
    // removeIngredientHandler = (type) =>{
    //     const oldCount = this.state.ingredients[type];

    //     if (oldCount<= 0) {
    //         return
    //     }; //if we have no ingredients

    //     const updatedCount = oldCount - 1;

    //     const updatedIngredients = {
    //         ...this.state.ingredients
    // };

    // updatedIngredients[type] =  updatedCount;
    // const priceDeduction = INGREDIENT_PRICES[type];
    // const oldPrice = this.state.totalPrice;
    // const newPrice = oldPrice - priceDeduction;

    // this.setState({totalPrice:newPrice,ingredients:updatedIngredients });
    // this.updatePurchaseState(updatedIngredients);

    // };



    purchaseHandler = () => {
        this.setState({purchasing:true})
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler =() => {
        //alert('You continue...');
        // this.setState({loading: true})
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: "Irnes Duran",
        //         address: {
        //             street: 'Dobrinjske bolnice 8',
        //             zipCode: '71000',
        //             country: 'Bosna i Hercegovina'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // axios.post('/orders.json', order)
        // .then (response => {
        //     this.setState({loading:false, purchasing:false});
        // })
        // .catch(error =>{
        //     this.setState({loading:false, purchasing:false});
        // });


        //REDUX NOW
        // const queryParams =[];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]))
        // };  

        // queryParams.push('price='+this.state.totalPrice);
        
        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString

        // });

        this.props.history.push('/checkout');
    }


    render (){
            const disabledInfo = {
                ...this.props.ings
            }; //salad:true, meat:false...

            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0//this returns a Bool
            };



            let orderSummary = null;

            let burger = this.state.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />;

            if(this.props.ings)
            {
                burger = (
                    <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        // used for local state, now it goes with redux ingredientAdded = {this.addIngredientHandler}
                        ingredientAdded = {this.props.onIngredientAdded}
                        //removed because of the redux ingredientRemoved = {this.removeIngredientHandler}
                        ingredientRemoved = {this.props.onIngredientRemoved}
                        disabled = {disabledInfo}
                        price = {this.props.price}
                        purchaseable = {this.updatePurchaseState(this.props.ings)}
                        ordered = {this.purchaseHandler}/>
                    </Aux>);
                    
                    orderSummary =<OrderSummary
                    ingredients= {this.props.ings}
                    price={this.props.price}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}/>
            };

            if(this.state.loading) {

                orderSummary = <Spinner />

            }


        return (

            <Aux>
                <Modal show={this.state.purchasing} modalClosed ={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </Aux>
        );
    }

};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };

};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch ({type:actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
        onIngredientRemoved: (ingName) => dispatch ({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})

    };
};

export default connect (mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));