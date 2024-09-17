interface IPaginationResponse<T> {
    data: [T];
    meta: {
        from: number;
        to: number;
        total: number;
    };
}

export default IPaginationResponse