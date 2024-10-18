import { LocalIndex, type MetadataFilter } from "vectra";

interface Item {
	id: string;
	metadata: object;
}

class DataBase {
	private index: LocalIndex;

	/**
	 * Constructs a new DataBase instance with the provided folder path.
	 *
	 * @param {string} folder - The path to the folder where the database will be stored.
	 */
	constructor(folder: string) {
		this.index = new LocalIndex(folder);
	}
	/**
	 * Checks if the index exists and creates it if it doesn't.
	 * Useful for lazy initialization of the index. Must be called before using any other methods.
	 */
	async initialize() {
		if (!(await this.index.isIndexCreated())) {
			await this.index.createIndex();
		}
	}
	/**
	 * Adds a new item to the index.
	 *
	 * @param {number[]} vector - The vector that will be associated with the item.
	 * @param {Item} item - The item to be added to the index.
	 */
	async addItem(vector: number[], item: Item) {
		await this.index.insertItem({
			id: item?.id,
			vector,
			metadata: { ...item.metadata },
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
	async getItems(
		vector: number[],
		resultSize: number,
		filters: MetadataFilter
	) {
		return await this.index.queryItems(vector, resultSize, filters);
	}
	/**
	 * Updates an existing item in the index.
	 *
	 * @param {Item} item - The item to be updated.
	 * @throws {Error} If the item does not exist in the index.
	 */
	async updateItem(item: Item) {
		if ((await this.index.getItem(item.id)) == undefined)
			throw new Error("Item not found");
		await this.index.upsertItem({
			id: item.id,
			metadata: { ...item.metadata },
		});
	}
	/**
	 * Deletes an item from the index.
	 *
	 * @param {string} id - The id of the item to delete.
	 */
	async deleteItem(id: string) {
		await this.index.deleteItem(id);
	}
	/**
	 * Retrieves all items from the index.
	 *
	 * @param {MetadataFilter} [filter] - The metadata filters to apply to the query.
	 * @returns {Item[]} An array of items that match the query.
	 */
	async getAllItems(filter?: MetadataFilter) {
		if (filter) return await this.index.listItemsByMetadata(filter);
		return await this.index.listItems();
	}
}

export default DataBase;
