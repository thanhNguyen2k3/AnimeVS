export const awaitLoading = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
};
