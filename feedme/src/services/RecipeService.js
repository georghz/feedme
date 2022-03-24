import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase-config";

export async function getAllRecipesFilteredByCategory(categoriesList) {
  const q = collection(db, "recipes");
  const data = await getDocs(q);

  const allRecipesList = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  
  return getFilteredList(allRecipesList, categoriesList);
}

export async function getAllRecipesByUserFilteredByCategory(user, categoriesList) {
  const q = query(
    collection(db, "recipes"),
    where("author.id", "==", user.uid)
  );
  const data = await getDocs(q);

  const allRecipesList = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return getFilteredList(allRecipesList, categoriesList);
}

export async function getAllRecipesLikedByUserFilteredByCategory(user, categoriesList){
    const q = query(
        collection(db, "recipes"),
        where("likedBy", "array-contains", user?.uid)
    );

    const data = await getDocs(q);

    const allRecipesList = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return getFilteredList(allRecipesList, categoriesList);
}

function getFilteredList(allRecipesList, categoriesList) {
    return allRecipesList.filter((recipe) => {
    const recipeCategories = recipe.categories;
    let counter = 0;
    recipeCategories.forEach((category) => {
      if (categoriesList.includes(category)) {
        counter++;
      }
    });
    return counter === categoriesList.length;
  });
}
