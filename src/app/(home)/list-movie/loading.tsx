import Wrapper from '@/components/componentsChildren/Wrapper';
import Skeleton from 'react-loading-skeleton';

const loading = () => {
    return (
        <Wrapper>
            <div className="grid grid-cols-5 max-[820px]:grid-cols-3 max-[920px]:grid-cols-4 max-[800px]:grid-cols-3 max-sm:grid-cols-2 gap-6 overflow-hidden mt-[88px]">
                {[...Array(5)].map((i) => (
                    <Skeleton borderRadius={0} duration={0.6} key={i} className="w-full h-[300px] max-md:h-[250px]" />
                ))}
            </div>
        </Wrapper>
    );
};

export default loading;
