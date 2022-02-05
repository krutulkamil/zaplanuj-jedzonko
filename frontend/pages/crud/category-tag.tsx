import {NextPage} from "next";
import Category from "../../components/crud/Category";
import Layout from "../../components/Layout";
import Tag from "../../components/crud/Tag";

const CategoryTagPage: NextPage = (): JSX.Element => {
    return (
        <Layout>
            <h2>Zarządzaj kategoriami / tagami</h2>
            <div className="category-tag-wrapper">
                <Category />
                <Tag />
            </div>
        </Layout>
    )
};

export default CategoryTagPage;