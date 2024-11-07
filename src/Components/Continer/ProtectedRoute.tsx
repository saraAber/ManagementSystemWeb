
import { PropsWithChildren, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ManagerContext } from '../../Store/ManagerStore';

//  ProtectedRoute component will either render the component or redirect to login
const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const { Manager } = useContext(ManagerContext);

    if (!Manager) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" />;
    }

    return children; // render the child components if authenticated
};

export default ProtectedRoute;