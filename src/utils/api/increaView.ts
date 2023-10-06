import instance from "@/lib/axios"

export const increaView = async (id: string, value: any) => {

    const { data } = await instance.patch(`/movie/${id}`, {
        ...value
    })

    return data
}