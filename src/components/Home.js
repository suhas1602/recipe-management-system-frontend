import React, {useEffect, useState} from "react";
import axios from "axios";
import { Table, Typography, notification, Button } from "antd";
import { Link, useHistory } from "react-router-dom";

const {Text, Title} = Typography;

const Home = () => {
    const history = useHistory();
    const [userRecipes, setUserRecipes] = useState();

    const fetchRecipes = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: process.env.REACT_APP_API_ENDPOINT + "/v1/recipes",
                headers: {"Authorization": sessionStorage.getItem("auth")}
            });
            // console.log(response);
            setUserRecipes(response.data);
        } catch(err) {
            // console.log(err.response);
            if(err.response.status == 404) {
                notification["info"]({
                    message: 'No recipes found',
                    description:
                      'No recipes were found for this user. You can create one by clicking the Create New Recipe button.',
                });
            }                
        }
    }

    useEffect(() => {       
        fetchRecipes();
    }, []);

    const handleDelete = async (recipeId) => {
        try {
            const response = await axios({
                method: "DELETE",
                url: process.env.REACT_APP_API_ENDPOINT + `/v1/recipe/${recipeId}`,
                headers: {"Authorization": sessionStorage.getItem("auth")}
            });
            notification["success"]({
                message: "Deletion sucess",
                description: `Recipe with id ${recipeId} successfully deleted`
            });
        } catch(err) {
            notification["error"]({
                message: "Deletion error",
                description: err.response.data,
            });
            return;
        }

        fetchRecipes();
    }

    const columns = [{
        title: "Title",
        dataIndex: "title",
        key: "title"
    }, {
        title: "Cuisine",
        dataIndex: "cusine",
        key: "cusine"
    }, {
        title: "Created At",
        dataIndex: "created_ts",
        key: "created_ts",
        render: (ts) => <Text>{new Date(ts).toString()}</Text>
    }, {
        title: "Updated At",
        dataIndex: "updated_ts",
        key: "updated_ts",
        render: (ts) => <Text>{new Date(ts).toString()}</Text>
    }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`/recipe/${record.id}`} style={{ marginRight: 16 }}>View</Link>
            <Button type="link" onClick={() => handleDelete(record.id)}>Delete</Button>
          </span>
        ),
      }];

    return (<div style={{minHeight: "calc(100vh - 134px)", padding: "50px 50px 0 50px"}}>
        <Button type="primary" style={{marginBottom: 10}} onClick={() => history.push("/add")}>Create New Recipe</Button>
        <Table dataSource={userRecipes} columns={columns} rowKey="id"/>
    </div>)
}

export default Home;