import { FC, ReactNode } from 'react';

interface layoutProps {
    children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
    return (
        <div className="h-full flex items-center justify-center">
            {children}
        </div>
    );
};

export default layout;
