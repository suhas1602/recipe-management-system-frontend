import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { notification, Descriptions, Typography } from "antd";

const {Text, Title} = Typography;

const Recipe = () => {
    const { id } = useParams(); 
    const [recipe, setRecipe] = useState(null);
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios({
                    method: "GET",
                    url: process.env.REACT_APP_API_ENDPOINT + `/v1/recipe/${id}`,
                    headers: {"Authorization": sessionStorage.getItem("auth")}
                });
                console.log(response.data);
                setRecipe(response.data);
            } catch(err) {
                console.log(err.response);
                if(err.response.status === 404) {
                    notification["error"]({
                        message: "No recipe found",
                        description: "No recipe was found for this id."
                    });
                }
                
            }
        }
        fetchRecipe();
    }, []);
    
    
    return (<div style={{minHeight: "calc(100vh - 134px)", padding: "50px 50px 0 50px", backgroundColor: "white"}}>
        {recipe !== null ? (
                <Descriptions title="Recipe" bordered>
                    <Descriptions.Item label="Id">{recipe.id}</Descriptions.Item>
                    <Descriptions.Item label="Title">{recipe.title}</Descriptions.Item>
                    <Descriptions.Item label="Cuisine">{recipe.cusine}</Descriptions.Item>
                    <Descriptions.Item label="Created At">{new Date(recipe.created_ts).toString()}</Descriptions.Item>
                    <Descriptions.Item label="Updated At">{new Date(recipe.updated_ts).toString()}</Descriptions.Item>
                    <Descriptions.Item label="Total Time (mins)">{recipe.total_time_in_min}</Descriptions.Item>
                    <Descriptions.Item span={3} label="Ingrdients">{recipe.ingredients.map((item, index) => (
                        <React.Fragment key={`ingredient-${index}`}>
                            {item}
                            <br />
                        </React.Fragment>
                        )
                    )}
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Steps"><ul>{recipe.steps.sort((a, b) => a.position < b.position).map((item, index) => (
                            <li key={`steps-${item.position}`}>{item.items}</li>
                        )
                    )}</ul>
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Nutrition Information">
                        <Text strong>Calories: </Text>{recipe.nutrition_information[0].calories}
                        <br />
                        <Text strong>Cholesterol (mg): </Text>{recipe.nutrition_information[0].cholestrol_in_mg}
                        <br />
                        <Text strong>Sodium (mg): </Text>{recipe.nutrition_information[0].sodium_in_mg}
                        <br />
                        <Text strong>Carbohydrates (grams): </Text>{recipe.nutrition_information[0].carbohydrates_in_grams}
                        <br />
                        <Text strong>Proteins (grams): </Text>{recipe.nutrition_information[0].protein_in_grams}
                    </Descriptions.Item>
                </Descriptions>) : (
                 <Link to="/recipe">Go to all recipes</Link>)
            }
    </div>);
}

export default Recipe;