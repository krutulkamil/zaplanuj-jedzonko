import {NextPage} from "next";
import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import RecipeCreate from '../../components/crud/RecipeCreate';

const RecipePage: NextPage = (): JSX.Element => {
    return (
        <Layout>
            <Admin>
                <h2>Dodaj nowy przepis</h2>
                <div className="blog-create-wrapper">
                    <RecipeCreate/>
                </div>
            </Admin>
        </Layout>
    )
};

export default RecipePage;