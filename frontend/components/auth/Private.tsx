import {useEffect, ReactNode, FunctionComponent} from 'react';
import Router from 'next/router';
import {isAuth} from '../../actions/auth';

interface Props {
    children: ReactNode
}

const Private: FunctionComponent<Props> = ({children}): JSX.Element => {
    useEffect(() => {
        if (!isAuth()) {
            Router.push('/account/login')
        }
    }, []);

    return <>{children}</>;
};

export default Private;