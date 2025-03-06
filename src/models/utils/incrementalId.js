function assignIncrementalId(schema) {
  schema.pre("save", async function (next) {
    if (this.id) {
      return next();
    }

    // Find the document with the highest ID
    const highestDoc = await this.constructor
      .findOne({}, { id: 1 })
      .sort({ id: -1 })
      .limit(1);

    // If there are no documents, start with ID 1
    // Otherwise, increment the highest ID
    this.id = highestDoc ? highestDoc.id + 1 : 1;

    next();
  });
}

// module.exports = { assignIncrementalId };
export { assignIncrementalId };
