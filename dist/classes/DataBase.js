"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vectra_1 = require("vectra");
class DataBase {
    /**
     * Constructs a new DataBase instance with the provided folder path.
     *
     * @param {string} folder - The path to the folder where the database will be stored.
     */
    constructor(folder) {
        this.index = new vectra_1.LocalIndex(folder);
    }
    /**
     * Checks if the index exists and creates it if it doesn't.
     * Useful for lazy initialization of the index. Must be called before using any other methods.
     */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.index.isIndexCreated())) {
                yield this.index.createIndex();
            }
        });
    }
    /**
     * Adds a new item to the index.
     *
     * @param {number[]} vector - The vector that will be associated with the item.
     * @param {Item} item - The item to be added to the index.
     */
    addItem(vector, item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.index.insertItem({
                id: item === null || item === void 0 ? void 0 : item.id,
                vector,
                metadata: Object.assign({}, item.metadata),
            });
        });
    }
    /**
     * Gets items from the index using the vector similarity algorithm.
     *
     * @param {number[]} vector - The vector that will be used to query the index.
     * @param {number} resultSize - The number of results to return.
     * @param {MetadataFilter} filters - The metadata filters to apply to the query.
     * @returns {Item[]} An array of items that match the query.
     */
    getItems(vector, resultSize, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.index.queryItems(vector, resultSize, filters);
        });
    }
    /**
     * Updates an existing item in the index.
     *
     * @param {Item} item - The item to be updated.
     * @throws {Error} If the item does not exist in the index.
     */
    updateItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.index.getItem(item.id)) == undefined)
                throw new Error("Item not found");
            yield this.index.upsertItem({
                id: item.id,
                metadata: Object.assign({}, item.metadata),
            });
        });
    }
    /**
     * Deletes an item from the index.
     *
     * @param {string} id - The id of the item to delete.
     */
    deleteItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.index.deleteItem(id);
        });
    }
    /**
     * Retrieves all items from the index.
     *
     * @param {MetadataFilter} [filter] - The metadata filters to apply to the query.
     * @returns {Item[]} An array of items that match the query.
     */
    getAllItems(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            if (filter)
                return yield this.index.listItemsByMetadata(filter);
            return yield this.index.listItems();
        });
    }
    deleteDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.index.deleteIndex();
        });
    }
}
exports.default = DataBase;
//# sourceMappingURL=DataBase.js.map