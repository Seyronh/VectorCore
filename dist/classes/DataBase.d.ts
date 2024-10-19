import { type MetadataFilter } from "vectra";
import { type Item } from "../Types";
declare class DataBase {
    private index;
    /**
     * Constructs a new DataBase instance with the provided folder path.
     *
     * @param {string} folder - The path to the folder where the database will be stored.
     */
    constructor(folder: string);
    /**
     * Checks if the index exists and creates it if it doesn't.
     * Useful for lazy initialization of the index. Must be called before using any other methods.
     */
    initialize(): Promise<void>;
    /**
     * Adds a new item to the index.
     *
     * @param {number[]} vector - The vector that will be associated with the item.
     * @param {Item} item - The item to be added to the index.
     */
    addItem(vector: number[], item: Item): Promise<void>;
    /**
     * Gets items from the index using the vector similarity algorithm.
     *
     * @param {number[]} vector - The vector that will be used to query the index.
     * @param {number} resultSize - The number of results to return.
     * @param {MetadataFilter} filters - The metadata filters to apply to the query.
     * @returns {Item[]} An array of items that match the query.
     */
    getItems(vector: number[], resultSize: number, filters: MetadataFilter): Promise<import("vectra").QueryResult<Record<string, import("vectra").MetadataTypes>>[]>;
    /**
     * Updates an existing item in the index.
     *
     * @param {Item} item - The item to be updated.
     * @throws {Error} If the item does not exist in the index.
     */
    updateItem(item: Item): Promise<void>;
    /**
     * Deletes an item from the index.
     *
     * @param {string} id - The id of the item to delete.
     */
    deleteItem(id: string): Promise<void>;
    /**
     * Retrieves all items from the index.
     *
     * @param {MetadataFilter} [filter] - The metadata filters to apply to the query.
     * @returns {Item[]} An array of items that match the query.
     */
    getAllItems(filter?: MetadataFilter): Promise<import("vectra").IndexItem<Record<string, import("vectra").MetadataTypes>>[]>;
    deleteDB(): Promise<void>;
}
export default DataBase;
//# sourceMappingURL=DataBase.d.ts.map