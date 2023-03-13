"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class apiFeatures {
    constructor(repo, queryString) {
        this.repo = repo;
        this.queryString = null;
        this.page = 1;
        this.offset = 0;
        this.sortOrder = 'DESC';
        this.sortBy = 'id';
        this.whereObject = null;
        this.order = [];
        this.fields = [];
        this.include = [];
        this.queryString = queryString;
    }
    filters(queryParams) {
        const data = queryParams;
        const data2 = {};
        Object.entries(data).forEach(([key, val]) => {
            if (key == 'filters') {
                Object.entries(val).forEach(function ([key2, val]) {
                    Object.entries(val).forEach(function ([key, val]) {
                        if (key == '$contains') {
                            isNaN(val) ? (data2[key2] = (0, typeorm_1.ILike)(`%${val}%`)) : val;
                        }
                        else if (key == '$equals') {
                            data2[key2] = (0, typeorm_1.Equal)(val);
                        }
                        else if (key == '$gt') {
                            data2[key2] = (0, typeorm_1.MoreThan)(val);
                        }
                        else if (key == '$gte') {
                            data2[key2] = (0, typeorm_1.MoreThanOrEqual)(val);
                        }
                        else if (key == '$lt') {
                            data2[key2] = (0, typeorm_1.LessThan)(val);
                        }
                        else if (key == '$lte') {
                            data2[key2] = (0, typeorm_1.LessThanOrEqual)(val);
                        }
                        else if (key == '$between') {
                            const compareValues = val.split(',');
                            isNaN(val)
                                ? (data2[key2] = (0, typeorm_1.Between)(compareValues[0], compareValues[1]))
                                : val;
                        }
                    });
                });
            }
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
        const queryObject = Object.assign({}, this.queryString);
        this.limit = Number(queryObject.limit * 1) || 0;
        this.page = Number(queryObject.page * 1) || 1;
        this.offset = this.limit * (this.page - 1) || 0;
        const queryObj = Object.assign({}, this.queryString);
        this.sortOrder = queryObj.sortOrder || 'DESC';
        this.sortBy = queryObj.sortBy || 'id';
        this.order[this.sortBy] = this.sortOrder;
        return this;
    }
    where(whereObject) {
        this.whereObject = whereObject ? whereObject : undefined;
        return this;
    }
    sort() {
        const queryObj = Object.assign({}, this.queryString);
        this.sortOrder = queryObj.sortOrder || 'DESC';
        this.sortBy = queryObj.sortBy || 'id';
        this.order[this.sortBy] = this.sortOrder;
        return this;
    }
    setOrder(order) {
        this.order = order;
        return this;
    }
    async query() {
        const queryObj = Object.assign({}, this.queryString);
        const rawResponse = await this.repo.find({
            where: this.whereObject ? this.whereObject : undefined,
            relations: this.include.length > 0 ? this.include : [],
            skip: this.offset,
            take: this.limit,
            order: this.order,
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
        }
        else {
            return rawResponse;
        }
    }
}
exports.default = apiFeatures;
//# sourceMappingURL=apiFeatures.js.map