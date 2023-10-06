import Divider from '@mui/material/Divider';

const NewEpisode = () => {
    return (
        <div>
            <h1 className="text-2xl font-semibold mt-4">Today</h1>
            <div className="pb-4 pt-2">
                <Divider variant="fullWidth" className="bg-gray-500" sx={{ height: 2 }} />
            </div>
            <div className="flex gap-10 space-y-3 max-[620px]:flex-wrap">
                <div className=" gap-2 flex h-[82px]">
                    <div className="min-w-[145px] max-w-[150px]">
                        <img
                            className="w-full h-[82px] object-cover"
                            src="https://cdn.animevietsub.fan/data/poster/2019/09/27/animevsub-sQCBqYz9ve.jpg"
                            alt=""
                        />
                    </div>
                    <div className="space-y-1 max-w-[290px]">
                        <h3 className="cursor-pointer hover:underline text-base text-clip overflow-hidden max-h-[50px]">
                            (Dubs) Reborn as a Vending Machine, I Now Wander the Dungeon
                        </h3>
                        <p className="text-gray-400">Tập 8</p>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Vietsub</span>
                            <span className="text-secondary">time</span>
                            <span></span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 h-[82px]">
                    <div className="min-w-[145px] max-w-[150px]">
                        <img
                            className="w-full h-[82px] object-cover"
                            src="https://cdn.animevietsub.fan/data/poster/2019/09/27/animevsub-sQCBqYz9ve.jpg"
                            alt=""
                        />
                    </div>
                    <div className="space-y-1">
                        <h3 className="cursor-pointer hover:underline text-base text-clip overflow-hidden max-h-[50px] max-w-[290px]">
                            (Dubs) Reborn as a Vending Machine, I Now Wander the Dungeon
                        </h3>
                        <p className="text-gray-400">Tập 8</p>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Vietsub</span>
                            <span className="text-secondary">time</span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewEpisode;
