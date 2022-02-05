import {useEffect, ReactNode, FunctionComponent} from 'react';
import Router from 'next/router';
import {isAuth} from '../../actions/auth';

interface Props {
    children: ReactNode
}

const Admin: FunctionComponent<Props> = ({children}): JSX.Element => {
    useEffect(() => {
        if (!isAuth()) {
            Router.push('/account/login');
        } else if (isAuth().role === 0) {
            Router.push('/');
        }
    }, []);

    return <>{children}</>;
};

export default Admin;