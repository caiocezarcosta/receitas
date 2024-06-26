import AsyncStorage from "@react-native-async-storage/async-storage";

//Buscar os favoritos
//salvar um novo favorito
//Remover um favorito da lista

export async function getFavorites(key){
    const favorites = await AsyncStorage.getItem(key)
    return JSON.parse(favorites) || [];
}

export async function saveFavorite(key, newitem){
    let myFavorites = await getFavorites(key);

    let hasItem = myFavorites.some(item => item.id === newitem.id);

    if(hasItem){
        console.log("Esse item já está salvo")
        return;
    }

    myFavorites.push(newitem);

    await AsyncStorage.setItem(key,JSON.stringify(myFavorites))
    console.log("Salvo com sucesso")
}

export async function removeItem(id){
    let receipes = await getFavorites("@appreceitas")
    let myFavorites = receipes.filter(item =>{
        return (item.id !== id)
    })
    await AsyncStorage.setItem("@appreceitas", JSON.stringify(myFavorites));
    console.log("Item Deletado com sucesso");
    return myFavorites;
}
    


export async function isFavorite(receipe){
    let myRecipes = await getFavorites("@appreceitas");
    const favorite = myRecipes.find(item => item.id === receipe.id);

    if(favorite){
        return true;
    }
    return false;
}