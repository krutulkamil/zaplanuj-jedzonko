import {NextPage} from "next";
import Category from "../../components/crud/Category";
import Layout from "../../components/Layout";

const CategoryTagPage: NextPage = (): JSX.Element => {
    return (
        <Layout>
            <Category />
        </Layout>
    )
};

export default CategoryTagPage;