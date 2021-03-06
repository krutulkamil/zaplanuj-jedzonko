import type {NextPage} from 'next';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import Admin from "../../../components/auth/Admin";
import {IoFastFoodOutline} from 'react-icons/io5';
import {BsFillCalendar2WeekFill, BsCardList, BsFillTagsFill} from 'react-icons/bs';

const AdminIndex: NextPage = () => {
    return (
        <Admin>
            <Layout>
                <h2>Panel administratora</h2>
                <div className="add-recipe">
                    <Link href="/crud/recipe">
                        <a>
                            <IoFastFoodOutline/>{" "} Dodaj nowy przepis
                        </a>
                    </Link>
                </div>
                <div className="manage-recipes">
                    <Link href="/crud/category-tag">
                        <a>
                            <BsCardList/>{" "} Zarządzaj przepisami
                        </a>
                    </Link>
                </div>
                <div className="add-plan">
                    <Link href="/crud/category-tag">
                        <a>
                            <BsFillCalendar2WeekFill/>{" "} Zarządzaj planami
                        </a>
                    </Link>
                </div>
                <div className="add-category">
                    <Link href="/crud/category-tag">
                        <a>
                            <BsFillTagsFill/>{" "} Zarządzaj kategoriami / tagami
                        </a>
                    </Link>
                </div>
                <div className="categories-list">
                    <h3>Dostępne kategorie:</h3>
                </div>
                <div className="tags-list">
                    <h3>Dostępne tagi:</h3>
                </div>
                <div className="recipes-list">
                    <h3>Aktualnie posiadasz: x przepisów</h3>
                </div>
                <div className="plans-list">
                    <h3>Aktualnie posiadasz: x planów</h3>
                </div>
                <div className="plans-actual">
                    <h3>Aktualny plan:</h3>
                </div>
            </Layout>
        </Admin>
    );
};

export default AdminIndex;