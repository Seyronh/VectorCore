import { EmbeddingModel, FlagEmbedding } from "fastembed";

enum VectorTypes {
	Any,
	Query,
	Passage,
}

class VectorGenerator {
	private modelEnum: EmbeddingModel;
	private EMBEDDINGMODEL?: FlagEmbedding;
	/**
	 * Constructor for VectorGenerator
	 * @param embeddingmodel The embedding model to be used
	 */
	constructor(embeddingmodel: EmbeddingModel) {
		this.modelEnum = embeddingmodel;
	}
	/**
	 * Initializes the vector generator with the given embedding model.
	 * This method must be called before any other methods can be used.
	 * @returns {Promise<void>}
	 */
	async initialize() {
		this.EMBEDDINGMODEL = await FlagEmbedding.init({
			model: this.modelEnum,
		});
	}
	/**
	 * Generates an embedding vector for the given text based on the specified vector type.
	 *
	 * @param {string} text - The text to be embedded.
	 * @param {VectorTypes} [type] - The type of vector to generate. Can be Query, Passage, or Any.
	 * @returns {Promise<number[] | undefined>} A promise that resolves to the generated vector or undefined if the embedding model is not initialized.
	 */
	async generateVector(text: string, type?: VectorTypes) {
		switch (type) {
			case VectorTypes.Query:
				return this.EMBEDDINGMODEL?.queryEmbed(text);
			case VectorTypes.Passage:
				return this.EMBEDDINGMODEL?.passageEmbed([text], 1);
			default:
				return this.EMBEDDINGMODEL?.embed([text], 1);
		}
	}
	/**
	 * Generates an array of embedding vectors for the given array of text.
	 *
	 * @param {string[]} text - The array of text to be embedded.
	 * @param {number} [batchSize] - The batch size to use for the embedding. Defaults to 1.
	 * @returns {Promise<number[][] | undefined>} A promise that resolves to the generated array of vectors or undefined if the embedding model is not initialized.
	 */
	async generateVectors(text: string[], batchSize?: number) {
		return this.EMBEDDINGMODEL?.embed(text, batchSize);
	}
}
export default VectorGenerator;
