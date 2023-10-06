import Link from 'next/link';

const HandingError = () => {
    return (
        <div className="flex justify-center items-center space-y-4 flex-col my-40 px-12">
            <img src="https://www.crunchyroll.com/build/assets/img/home/yuzu.png" alt="" />

            <h1 className="text-3xl">Error 404</h1>

            <button className="border-[4px] hover:border-primary/90 hover:text-primary/90 border-primary px-6 py-2 text-lg font-semibold text-primary ">
                <Link href="/">COME BACK HOME</Link>
            </button>
        </div>
    );
};

export default HandingError;
