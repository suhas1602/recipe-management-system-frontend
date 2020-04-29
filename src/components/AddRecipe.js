import React from "react";
import { Form, Input, Button, InputNumber, notification } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from "axios";
import { useHistory } from "react-router-dom";

const {TextArea} = Input;

const layout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
  };
  const tailLayout = {
    wrapperCol: { offset: 12, span: 12 },
  };

const AddRecipe = () => {
    const history = useHistory();
    const onFinish = async values => {
        // console.log(values);  
        const recipe = values;      
        recipe["steps"] = recipe["steps"].map((step, index) => ({position: index + 1,items: step }));
        console.log(recipe);
        try{
            const response = await axios({
                method: "POST",
                url: process.env.REACT_APP_API_ENDPOINT + "/v1/recipe",
                data: recipe,
                headers: {"Authorization": sessionStorage.getItem("auth")}
            });
            notification["success"]({
                message: "Create recipe success",
                description: `${recipe.title} has been entered into the system`
            });
            history.replace("/recipe");
        } catch(err) {
            // console.log(err.response);
            notification["error"]({
                message: "Create recipe error",
                description: err.response.data
            });
        }
    };
    
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };


    return (<div style={{minHeight: "calc(100vh - 134px)", padding: "50px 50px 0 50px"}}>
    <div style={{width: "50vw"}}>
        <Form
            {...layout}
            name="login"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input the title!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Cuisine"
              name="cusine"
              rules={[{ required: true, message: 'Please input the cuisine!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Cooking time (in multiple of 5 mins)"
              name="cook_time_in_min"
              rules={[{ required: true, message: 'Please input the cooking time!' }]}
            >
              <InputNumber min={0} step={5}/>
            </Form.Item>

            <Form.Item
              label="Preparation time (in multiple of 5 mins)"
              name="prep_time_in_min"
              rules={[{ required: true, message: 'Please input the preparation time!' }]}
            >
              <InputNumber min={0} step={5}/>
            </Form.Item>

            <Form.Item
              label="Servings"
              name="servings"
              rules={[{ required: true, message: 'Please input the servings!' }]}
            >
              <InputNumber min={0} max={5} step={1}/>
            </Form.Item>

            <Form.List name="ingredients">
                {(fields, {add, remove}) => {
                    return (
                        <div>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? layout: tailLayout)}
                                    label={index === 0 ? 'Ingredients': ''}
                                    required={true}
                                    key={field.key}>
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {required: true, whitespace: 'true', message: "Please add an ingredient or delete this field"},
                                            ]}
                                            noStyle
                                        >
                                            <Input style={{ width: '60%' }} />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                style={{ margin: '0 8px' }}
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item {...tailLayout}>
                              <Button
                                type="dashed"
                                onClick={() => {
                                  add();
                                }}
                                style={{ width: '60%' }}
                              >
                                <PlusOutlined /> Add ingredient
                              </Button>
                            </Form.Item>
                        </div>
                    )
                }}
            </Form.List>

            <Form.List name="steps">
                {(fields, {add, remove}) => {
                    return (
                        <div>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? layout: tailLayout)}
                                    label={index === 0 ? 'Steps': ''}
                                    required={true}
                                    key={field.key}>
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {required: true, whitespace: 'true', message: "Please add a recipe step or delete this field"},
                                            ]}
                                            noStyle
                                        >
                                            <TextArea rows={3} style={{ width: '60%' }}/>
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                style={{ margin: '0 8px' }}
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item {...tailLayout}>
                              <Button
                                type="dashed"
                                onClick={() => {
                                  add();
                                }}
                                style={{ width: '60%' }}
                              >
                                <PlusOutlined /> Add recipe step
                              </Button>
                            </Form.Item>
                        </div>
                    )
                }}
            </Form.List>

            <Form.Item
              label="Calories"
              name={["nutrition_information", "calories"]}
              rules={[{ required: true, message: 'Please input the calories!' }]}
            >
              <InputNumber min={0} step={1} />
            </Form.Item>

            <Form.Item
              label="Cholesterol (in mg)"
              name={["nutrition_information", "cholestrol_in_mg"]}
              rules={[{ required: true, message: 'Please input the cholesterol amount!' }]}
            >
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item
              label="Sodium (in mg)"
              name={["nutrition_information", "sodium_in_mg"]}
              rules={[{ required: true, message: 'Please input the sodium amount!' }]}
            >
              <InputNumber min={0} step={1}/>
            </Form.Item>

            <Form.Item
              label="Carbohydrates (in grams)"
              name={["nutrition_information", "carbohydrates_in_grams"]}
              rules={[{ required: true, message: 'Please input the carbohydrates amount!' }]}
            >
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item
              label="Proteins (in grams)"
              name={["nutrition_information", "protein_in_grams"]}
              rules={[{ required: true, message: 'Please input the proteins amount!' }]}
            >
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
        </Form>          
    </div>    
</div>);
}

export default AddRecipe;