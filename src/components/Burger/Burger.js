import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transforemedIngredients = Object.keys(props.ingredients)
        .map(igKey =>{
            return [...Array(props.ingredients[igKey])].map((_, i)=>{
                return <BurgerIngredient key ={igKey + i} type={igKey} />
            });
        })
        .reduce((arr, el)=>{
            return arr.concat(el)
        },[]);

        if (transforemedIngredients.length ===0) {
            transforemedIngredients = <p>Please start adding ingredients</p>
        };

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type ="bread-top"/>
            {transforemedIngredients}
            <BurgerIngredient type ="bread-bottom"/>
        </div>
    );

};

export default burger;