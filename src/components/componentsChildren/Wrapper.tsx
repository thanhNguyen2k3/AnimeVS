import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Wrapper = ({ children }: Props) => {
    return <div className="py-4 px-16 max-[800px]:px-3 max-[800px]:py-0">{children}</div>;
};

export default Wrapper;
