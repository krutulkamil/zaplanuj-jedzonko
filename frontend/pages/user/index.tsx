import type {NextPage} from 'next';
import Layout from '../../components/Layout';
import Private from "../../components/auth/Private";

const UserIndex: NextPage = () => {
    return (
        <Private>
            <Layout>
                <h2>Tablica użytkownika</h2>
            </Layout>
        </Private>
    );
};

export default UserIndex;