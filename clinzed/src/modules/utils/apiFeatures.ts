import {
  Between,
  Equal,
  ILike,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';
class apiFeatures {
  private queryString = null;
  private limit;
  private page = 1;
  private offset = 0;
  private sortOrder = 'DESC';
  private sortBy = 'id';
  private whereObject: any = null;
  private order: any[] = [];
  private fields: any[] = [];
  private include: any[] = [];
  constructor(private repo: any, queryString: any) {
    this.queryString = queryString;
  }
  filters(queryParams) {
    const data = queryParams;
    const data2 = {};

    Object.entries(data).forEach(([key, val]: any) => {
      if (key == 'filters') {
        Object.entries(val).forEach(function ([key2, val]) {
          Object.entries(val).forEach(function ([key, val]) {
            if (key == '$contains') {
              isNaN(val) ? (data2[key2] = ILike(`%${val}%`)) : val;
            } else if (key == '$equals') {
              data2[key2] = Equal(val);
            } else if (key == '$gt') {
              data2[key2] = MoreThan(val);
            } else if (key == '$gte') {
              data2[key2] = MoreThanOrEqual(val);
            } else if (key == '$lt') {
              data2[key2] = LessThan(val);
            } else if (key == '$lte') {
              data2[key2] = LessThanOrEqual(val);
            } else if (key == '$between') {
              const compareValues = val.split(',');
              isNaN(val)
                ? (data2[key2] = Between(compareValues[0], compareValues[1]))
                : val;
            }
          });
        });
      }
      // isNaN(val) ? (data[key] = ILike(`%${val}%`)) : val;
    });
    return data2;
  }
  selectFields() {
    this.fields = this.queryString.fields
      ? this.queryString.fields.split(',')
      : [];

    return this;
  }
  includeFields(include) {
    this.include = include;

    return this;
  }
  paginate() {
    const queryObject = { ...this.queryString };
    this.limit = Number(queryObject.limit * 1) || 0;
    this.page = Number(queryObject.page * 1) || 1;
    this.offset = this.limit * (this.page - 1) || 0;
    const queryObj = { ...this.queryString };
    this.sortOrder = queryObj.sortOrder || 'DESC';
    this.sortBy = queryObj.sortBy || 'id';
    this.order[this.sortBy] = this.sortOrder;
    return this;
  }
  where(whereObject: any) {
    this.whereObject = whereObject ? whereObject : undefined;
    return this;
  }
  sort() {
    const queryObj = { ...this.queryString };
    this.sortOrder = queryObj.sortOrder || 'DESC';
    this.sortBy = queryObj.sortBy || 'id';
    this.order[this.sortBy] = this.sortOrder;
    return this;
  }
  setOrder(order) {
    this.order = order;
    return this;
  }

  async query(): Promise<any> {
    const queryObj = { ...this.queryString };
    // let rawResponse;
    const rawResponse = await this.repo.find({
      where: this.whereObject ? this.whereObject : undefined,
      relations: this.include.length > 0 ? this.include : [],
      skip: this.offset,
      take: this.limit,
      // order: this.order,
      order: this.order,
      // select: this.fields.length > 0 ? this.fields : undefined,
      // relations: this.include ? this.include : [],
    });
    if (queryObj.limit && queryObj.page) {
      const result = { data: [], pagination: { total: 0, page: 0, limit: 0 } };
      const count = await this.repo.findAndCount({
        where: this.whereObject ? this.whereObject : undefined,
      });
      result.data = rawResponse;
      result.pagination.page = Number(queryObj.page);
      result.pagination.total = count['1'];

      result.pagination.limit = Number(queryObj.limit);

      return result;
    } else {
      return rawResponse;
    }
  }
}
export default apiFeatures;
