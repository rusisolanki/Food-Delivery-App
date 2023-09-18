import React from "react";
import { useEffect, useState } from "react";
import MealItem from "../Meals/MealItem/MealItem";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";

export default function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-d4e48-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        new Error("Something went wrong");
      }

      const responseData = await response.json();

      const loadMeals = [];

      console.log(responseData);

      for (const key in responseData) {
        loadMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadMeals);
      setIsLoading(false);
    };
    //Now here we could use try and catch block to handle the error but fetchMeals is an async function which returns a promise and if there is an error inside of the promise than due to the error the promise will get rejected so intead we can convert the fetchMeals() call below into await but then we have to change the useEffect function to async so we are going to handle it another way
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className={styles.mealItems}>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p className={styles.error}>{httpError}</p>
      </section>
    );
  }

  const mealList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
}
