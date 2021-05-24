import MealsSummary from './MealsSummary';
import { Fragment } from 'react';
import AvailableMeal from './AvailableMeal';

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeal />
    </Fragment>
  );
};

export default Meals;
