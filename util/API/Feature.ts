/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class APIFeatures {
  constructor(public query, public queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  filter() {
    
    if (this.queryStr.search) return this;
    const queryObj = { ...this.queryStr };
    const excludeFiles = ['page', 'sort', 'limit', 'fields'];
    excludeFiles.forEach(el => delete queryObj[el]);

    const querySt = JSON.stringify(queryObj);
    const updatequery = querySt.replace(
      /\b(gte|gt|lte|lt)\b/g,
      match => `$${match}`,
    );
    console.log(updatequery)
    this.query = this.query.find(JSON.parse(updatequery));

    return this;
  }
  search() {
    if (this.queryStr.search) {
      this.query = this.query.find({
        $or: [
     { performedBy: { $regex: this.queryStr.search, $options: 'i' } },
        { entityType: { $regex: this.queryStr.search, $options: 'i' } },
        { recordId: { $regex: this.queryStr.search, $options: 'i' } },
        { 'changes.field': { $regex: this.queryStr.search, $options: 'i' } },
        { 'changes.oldValue': { $regex: this.queryStr.search, $options: 'i' } },
        { 'changes.newValue': { $regex: this.queryStr.search, $options: 'i' } }
        ],
      });
    }
    return this;
  }
  sort(data?) {
    // if (data) {
    //   const shuffledArray = data.sort((a, b) => 0.5 - Math.random());
    //   console.log(shuffledArray);
    //   const sorted = this.query.sort({ type: shuffledArray[0] });
    // }
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query.sort('-createdAt');
    }

    return this;
  }
  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  paginate() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
