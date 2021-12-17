import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';
/*
const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 220.0,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 160.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 120.5,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 180.0,
  },
];
*/

const AvailableMeals = () => {
  // Set a array whit objects of meals from the firebase database
  const [meals, setMeals] = useState([]);

  // Show loading until we have some data.
  const [isloading, setIsloading] = useState(true);

  // Error hanlding if we fail to fetch some data.
  const [error, setError] = useState(null);

  // Use useEffet to fetch the data in a method. Then save the response
  // into a json file, loop throw the responseData and add all info into the object
  // we created as loadMeals the set it as a array state in useState, we have a fetch()
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://food-meal-data-default-rtdb.firebaseio.com/meals.json'
      );
      const responseData = await response.json();

      // Chech if we have data.
      if (!response.ok) {
        throw new Error('We have some problem to show the menu...');
      }

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsloading(false);
    };

    // we catch a error.. and throw the new Error message
    fetchMeals().catch((error) => {
      setIsloading(false);
      setError(error.message);
    });
  }, []);

  if (isloading) {
    return (
      <section className={classes.mealsloading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
