import { Post } from '@prisma/client';

type PageProps = {
    post: Post;
};

const Post = ({ post }: PageProps) => {
    return (
        <div>
            <section className="flex items-center bg-gray-100 dark:bg-gray-800">
                <div className="pl-12 pr-8 mx-auto lg:px-4 lg:py-4 max-w-7xl">
                    <div className="grid grid-cols-1 gap-4 lg:gap-14 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <a className="mb-0 bg-white rounded shadow dark:bg-gray-700" href="#">
                            <div className="relative h-72">
                                <img
                                    className="object-cover w-full h-full mt-6 -ml-6 transition-all rounded hover:scale-110"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFB4eYqlsMW7MeYtoiTHN3X8aPTvNrS-9eYw&usqp=CAU"
                                    alt=""
                                />
                            </div>
                            <div className="relative z-20 flex w-full pt-5 -ml-6">
                                <div>
                                    <img
                                        className="object-cover w-20 h-20 mr-4 rounded"
                                        src="https://i.postimg.cc/C1QgspFw/pexels-pixabay-371985.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="flex-1 mb-5">
                                    <span className="block mb-2 text-xs font-semibold text-blue-700 uppercase dark:text-blue-300">
                                        {post.title}
                                    </span>
                                    <h2 className="text-base font-bold leading-8 text-black lg:text-xl dark:text-white">
                                        {' '}
                                        {post.content}
                                    </h2>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-4 px-2 py-2 border-t border-gray-400">
                                <button className="bg-transparent text-base hover:text-blue-500">Like</button>
                                <button className="bg-transparent text-base hover:text-blue-500">Comments</button>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2>
                    </div>
                    <form className="mb-6">
                        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <label htmlFor="comment" className="sr-only">
                                Your comment
                            </label>
                            <textarea
                                id="comment"
                                rows={6}
                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                placeholder="Write a comment..."
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                        >
                            Post comment
                        </button>
                    </form>
                    <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                    <img
                                        className="mr-2 w-6 h-6 rounded-full"
                                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                        alt="Michael Gough"
                                    />
                                    Michael Gough
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <time title="February 8th, 2022">Feb. 8, 2022</time>
                                </p>
                            </div>
                            <button
                                id="dropdownComment1Button"
                                data-dropdown-toggle="dropdownComment1"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"
                            >
                                <i>
                                    <svg
                                        className="w-4 h-4"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 16 3"
                                    >
                                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                    </svg>
                                </i>
                                <span className="sr-only">Comment settings</span>
                            </button>

                            <div
                                id="dropdownComment1"
                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <ul
                                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton"
                                >
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Edit
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Remove
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Report
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">
                            Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                            instruments for the UX designers. The knowledge of the design tools are as important as the
                            creation of the design strategy.
                        </p>
                        <div className="flex items-center mt-4 space-x-4">
                            <button
                                type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                            >
                                <i>
                                    <svg
                                        className="mr-1.5 w-3.5 h-3.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 18"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                        />
                                    </svg>
                                </i>
                                Reply
                            </button>
                        </div>
                    </article>
                    <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                    <img
                                        className="mr-2 w-6 h-6 rounded-full"
                                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                        alt="Jese Leos"
                                    />
                                    Jese Leos
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <time title="February 12th, 2022">Feb. 12, 2022</time>
                                </p>
                            </div>
                            <button
                                id="dropdownComment2Button"
                                data-dropdown-toggle="dropdownComment2"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"
                            >
                                <i>
                                    <svg
                                        className="w-4 h-4"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 16 3"
                                    >
                                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                    </svg>
                                </i>
                                <span className="sr-only">Comment settings</span>
                            </button>

                            <div
                                id="dropdownComment2"
                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <ul
                                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton"
                                >
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Edit
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Remove
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Report
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">Much appreciated! Glad you liked it ☺️</p>
                        <div className="flex items-center mt-4 space-x-4">
                            <button
                                type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                            >
                                <i>
                                    <svg
                                        className="mr-1.5 w-3.5 h-3.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 18"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                        />
                                    </svg>
                                </i>
                                Reply
                            </button>
                        </div>
                    </article>

                    <article className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                    <img
                                        className="mr-2 w-6 h-6 rounded-full"
                                        src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                                        alt="Helene Engels"
                                    />
                                    Helene Engels
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <time title="June 23rd, 2022">Jun. 23, 2022</time>
                                </p>
                            </div>
                            <button
                                id="dropdownComment4Button"
                                data-dropdown-toggle="dropdownComment4"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"
                            >
                                <i>
                                    <svg
                                        className="w-4 h-4"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 16 3"
                                    >
                                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                    </svg>
                                </i>
                            </button>

                            <div
                                id="dropdownComment4"
                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <ul
                                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton"
                                >
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Edit
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Remove
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Report
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">
                            Thanks for sharing this. I do came from the Backend development and explored some of the
                            tools to design my Side Projects.
                        </p>
                        <div className="flex items-center mt-4 space-x-4">
                            <button
                                type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                            >
                                <i>
                                    <svg
                                        className="mr-1.5 w-3.5 h-3.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 18"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                        />
                                    </svg>
                                </i>
                                Reply
                            </button>
                        </div>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default Post;