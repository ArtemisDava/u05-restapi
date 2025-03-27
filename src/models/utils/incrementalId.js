import mongoose from "mongoose";

export const assignIncrementalId = (schema) => {
  schema.pre("save", async function (next) {
    if (this.isNew) {
      const Model = mongoose.model(this.constructor.modelName);
      const lastDoc = await Model.findOne().sort({ id: -1 });
      this.id = lastDoc ? lastDoc.id + 1 : 1;
    }
    next();
  });
};
