import {NextPage} from "next";
import Category from "../../components/crud/Category";
import Layout from "../../components/Layout";
import Tag from "../../components/crud/Tag";
import Admin from "../../components/auth/Admin";

const CategoryTagPage: NextPage = (): JSX.Element => {
    return (
        <Layout>
            <Admin>
                <h2>Zarządzaj kategoriami / tagami</h2>
                <div className="category-tag-wrapper">
                    <Category/>
                    <Tag/>
                </div>
            </Admin>
        </Layout>
    )
};

export default CategoryTagPage;