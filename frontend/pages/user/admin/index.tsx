import type {NextPage} from 'next';
import Layout from '../../../components/Layout';
import Admin from "../../../components/auth/Admin";

const AdminIndex: NextPage = () => {
    return (
        <Admin>
            <Layout>
                <h2>Tablica admina</h2>
            </Layout>
        </Admin>
    );
};

export default AdminIndex;