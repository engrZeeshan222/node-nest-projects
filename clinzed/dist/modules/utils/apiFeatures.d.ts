declare class apiFeatures {
    private repo;
    private queryString;
    private limit;
    private page;
    private offset;
    private sortOrder;
    private sortBy;
    private whereObject;
    private order;
    private fields;
    private include;
    constructor(repo: any, queryString: any);
    filters(queryParams: any): {};
    selectFields(): this;
    includeFields(include: any): this;
    paginate(): this;
    where(whereObject: any): this;
    sort(): this;
    setOrder(order: any): this;
    query(): Promise<any>;
}
export default apiFeatures;
