import {NextPage} from "next";
import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import RecipeCreate from '../../components/crud/RecipeCreate';

const RecipePage: NextPage = (): JSX.Element => {
    return (
        <Layout>
            <Admin>
                <h2>Dodaj nowy przepis</h2>
                <RecipeCreate/>
            </Admin>
        </Layout>
    )
};

export default RecipePage;